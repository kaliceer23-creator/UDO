<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/auth.php';

/**
 * UdoAdminProductsService
 * 
 * Native PHP 8.1 REST API Service for Admin Product, Status, and Storefront Merchandising.
 * Architecture: Clean OOP, PDO Prepared Statements, Dual JSON sync.
 * Strict GEMINI.md compliance:
 * - Pure Native Modern PHP 8.1 (OOP, PDO)
 * - Zero frameworks
 * - Zero emojis in code, comments, or output
 * - Returns 100% pure JSON
 */
class UdoAdminProductsService
{
    private ?PDO $db = null;
    private string $jsonFilePath;
    private string $auditLogPath;

    public function __construct()
    {
        // Locate master JSON files (both public and development paths)
        $possiblePaths = [
            __DIR__ . '/../data/welding_products.json',
            dirname(__DIR__) . '/data/welding_products.json',
            __DIR__ . '/data/welding_products.json',
            __DIR__ . '/../../../../frontend/src/welding_products.json',
            __DIR__ . '/../../../frontend/src/welding_products.json',
            __DIR__ . '/../../src/welding_products.json',
            dirname(__DIR__, 2) . '/assets/welding_products.json'
        ];

        $this->jsonFilePath = '';
        foreach ($possiblePaths as $p) {
            if (file_exists($p)) {
                $this->jsonFilePath = realpath($p) ?: $p;
                break;
            }
        }

        // If not found yet, default to api/data path
        if (empty($this->jsonFilePath)) {
            $this->jsonFilePath = __DIR__ . '/../data/welding_products.json';
        }

        // Audit log storage path
        $this->auditLogPath = __DIR__ . '/inventory_logs.json';
    }

    /**
     * Optional Lazy DB connection using PDO Prepared Statements
     */
    private function getDbConnection(): ?PDO
    {
        if ($this->db === null) {
            try {
                $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', DB_HOST, DB_PORT, DB_NAME, DB_CHARSET);
                $this->db = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (Throwable $e) {
                $this->db = null;
            }
        }
        return $this->db;
    }

    /**
     * Load products list from MariaDB document store
     */
    public function loadProducts(): array
    {
        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $stmt = $db->query("SELECT data FROM products ORDER BY sort_priority ASC, id ASC");
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $products = [];
                foreach ($rows as $row) {
                    $item = json_decode($row['data'], true);
                    if ($item !== null) {
                        $products[] = $item;
                    }
                }
                return $products;
            } catch (Throwable $e) {
                error_log('MariaDB loadProducts error: ' . $e->getMessage());
            }
        }

        // Fallback to JSON file if database is not reachable
        if (!empty($this->jsonFilePath) && file_exists($this->jsonFilePath)) {
            $content = file_get_contents($this->jsonFilePath);
            if ($content !== false) {
                $data = json_decode($content, true);
                if (is_array($data)) {
                    return $data;
                }
            }
        }
        return [];
    }

    /**
     * Insert or update a single product document in MariaDB
     */
    public function saveSingleProduct(array $product): bool
    {
        $id = (string)($product['id'] ?? '');
        if (empty($id)) return false;

        $db = $this->getDbConnection();
        $dbSaved = false;

        if ($db !== null) {
            try {
                $sku = !empty($product['sku']) ? (string)$product['sku'] : null;
                $name = (string)($product['name'] ?? '');
                $brand = !empty($product['brand']) ? (string)$product['brand'] : null;
                $category = 'other';
                if (!empty($product['categories']) && is_array($product['categories'])) {
                    $first = $product['categories'][0];
                    $category = is_array($first) ? ($first['name'] ?? $first['url_slug'] ?? 'other') : (string)$first;
                } elseif (!empty($product['category'])) {
                    $category = (string)$product['category'];
                }

                $status = (string)($product['status'] ?? 'publish');
                $availability = (string)($product['availability'] ?? (empty($product['flags']['is_in_stock']) ? 'out_of_stock' : 'in_stock'));
                $sortPriority = (int)($product['sort_priority'] ?? 999999);
                $jsonData = json_encode($product, JSON_UNESCAPED_UNICODE);

                $stmt = $db->prepare("
                    INSERT INTO products 
                    (id, sku, name, brand, category, status, availability, sort_priority, data)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    sku = VALUES(sku),
                    name = VALUES(name),
                    brand = VALUES(brand),
                    category = VALUES(category),
                    status = VALUES(status),
                    availability = VALUES(availability),
                    sort_priority = VALUES(sort_priority),
                    data = VALUES(data),
                    updated_at = NOW()
                ");
                $dbSaved = $stmt->execute([
                    $id, $sku, $name, $brand, $category, $status, $availability, $sortPriority, $jsonData
                ]);
            } catch (Throwable $e) {
                error_log('MariaDB saveSingleProduct error: ' . $e->getMessage());
            }
        }

        // Keep local backup JSON in sync if needed
        if (!empty($this->jsonFilePath) && file_exists($this->jsonFilePath)) {
            $content = file_get_contents($this->jsonFilePath);
            if ($content) {
                $items = json_decode($content, true);
                if (is_array($items)) {
                    $found = false;
                    foreach ($items as $k => $item) {
                        if (($item['id'] ?? '') === $id) {
                            $items[$k] = $product;
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        array_unshift($items, $product);
                    }
                    $jsonText = json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                    if ($jsonText) {
                        @file_put_contents($this->jsonFilePath, $jsonText, LOCK_EX);
                    }
                }
            }
        }

        return $dbSaved;
    }

    /**
     * Delete a single product from MariaDB
     */
    public function deleteSingleProduct(string $id): bool
    {
        if (empty($id)) return false;

        $db = $this->getDbConnection();
        $dbDeleted = false;

        if ($db !== null) {
            try {
                $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
                $dbDeleted = $stmt->execute([$id]);
            } catch (Throwable $e) {
                error_log('MariaDB deleteSingleProduct error: ' . $e->getMessage());
            }
        }

        // Keep local backup JSON in sync
        if (!empty($this->jsonFilePath) && file_exists($this->jsonFilePath)) {
            $content = file_get_contents($this->jsonFilePath);
            if ($content) {
                $items = json_decode($content, true);
                if (is_array($items)) {
                    $newItems = array_values(array_filter($items, fn($p) => ($p['id'] ?? '') !== $id));
                    $jsonText = json_encode($newItems, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                    if ($jsonText) {
                        @file_put_contents($this->jsonFilePath, $jsonText, LOCK_EX);
                    }
                }
            }
        }

        return $dbDeleted;
    }

    /**
     * Delete multiple products from MariaDB in a single batch
     */
    public function deleteMultipleProducts(array $ids): int
    {
        $ids = array_values(array_filter(array_map('strval', $ids)));
        if (empty($ids)) return 0;

        $db = $this->getDbConnection();
        $deletedCount = 0;

        if ($db !== null) {
            try {
                $placeholders = implode(',', array_fill(0, count($ids), '?'));
                $stmt = $db->prepare("DELETE FROM products WHERE id IN ($placeholders)");
                $stmt->execute($ids);
                $deletedCount = $stmt->rowCount();
            } catch (Throwable $e) {
                error_log('MariaDB deleteMultipleProducts error: ' . $e->getMessage());
            }
        }

        // Keep local backup JSON in sync
        if (!empty($this->jsonFilePath) && file_exists($this->jsonFilePath)) {
            $content = file_get_contents($this->jsonFilePath);
            if ($content) {
                $items = json_decode($content, true);
                if (is_array($items)) {
                    $idSet = array_flip($ids);
                    $newItems = array_values(array_filter($items, fn($p) => !isset($idSet[$p['id'] ?? ''])));
                    $jsonText = json_encode($newItems, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
                    if ($jsonText) {
                        @file_put_contents($this->jsonFilePath, $jsonText, LOCK_EX);
                    }
                }
            }
        }

        return $deletedCount;
    }

    /**
     * Save products list back to MariaDB document store and mirror to JSON
     */
    public function saveProducts(array $products): bool
    {
        $db = $this->getDbConnection();
        $dbSaved = false;

        if ($db !== null) {
            try {
                $stmt = $db->prepare("
                    INSERT INTO products 
                    (id, sku, name, brand, category, status, availability, sort_priority, data)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    sku = VALUES(sku),
                    name = VALUES(name),
                    brand = VALUES(brand),
                    category = VALUES(category),
                    status = VALUES(status),
                    availability = VALUES(availability),
                    sort_priority = VALUES(sort_priority),
                    data = VALUES(data),
                    updated_at = NOW()
                ");

                $db->beginTransaction();
                foreach ($products as $p) {
                    $id = (string)($p['id'] ?? '');
                    if (empty($id)) continue;

                    $sku = !empty($p['sku']) ? (string)$p['sku'] : null;
                    $name = (string)($p['name'] ?? '');
                    $brand = !empty($p['brand']) ? (string)$p['brand'] : null;
                    $category = 'other';
                    if (!empty($p['categories']) && is_array($p['categories'])) {
                        $first = $p['categories'][0];
                        $category = is_array($first) ? ($first['name'] ?? $first['url_slug'] ?? 'other') : (string)$first;
                    } elseif (!empty($p['category'])) {
                        $category = (string)$p['category'];
                    }

                    $status = (string)($p['status'] ?? 'publish');
                    $availability = (string)($p['availability'] ?? (empty($p['flags']['is_in_stock']) ? 'out_of_stock' : 'in_stock'));
                    $sortPriority = (int)($p['sort_priority'] ?? 999999);
                    $jsonData = json_encode($p, JSON_UNESCAPED_UNICODE);

                    $stmt->execute([
                        $id, $sku, $name, $brand, $category, $status, $availability, $sortPriority, $jsonData
                    ]);
                }
                $db->commit();
                $dbSaved = true;
            } catch (Throwable $e) {
                if ($db->inTransaction()) {
                    $db->rollBack();
                }
                error_log('MariaDB saveProducts error: ' . $e->getMessage());
            }
        }

        // Mirror to backup JSON files
        if (!empty($this->jsonFilePath)) {
            $jsonText = json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            if ($jsonText !== false) {
                @file_put_contents($this->jsonFilePath, $jsonText, LOCK_EX);
            }
        }

        return $dbSaved || !empty($this->jsonFilePath);
    }

    /**
     * Record stock movement audit log
     */
    public function recordAuditLog(array $logEntry): void
    {
        $adminContext = getAuthenticatedAdminContext();
        $now = date('Y-m-d H:i:s');

        $logEntry['timestamp'] = $logEntry['timestamp'] ?? date('c');
        $logEntry['admin_id'] = $logEntry['admin_id'] ?? $adminContext['admin_id'];
        $logEntry['admin_name'] = $logEntry['admin_name'] ?? $adminContext['admin_name'];
        $logEntry['admin_role'] = $logEntry['admin_role'] ?? $adminContext['admin_role'];
        $logEntry['ip_address'] = $logEntry['ip_address'] ?? ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');

        // 1. Optional MariaDB persistence via PDO Prepared Statements
        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $stmt = $db->prepare("
                    INSERT INTO stock_audit_logs 
                    (timestamp, admin_id, admin_name, admin_role, action, product_id, product_name, sku, size, old_stock, new_stock, delta, reason, ip_address)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $now,
                    (int)$logEntry['admin_id'],
                    (string)$logEntry['admin_name'],
                    (string)$logEntry['admin_role'],
                    (string)($logEntry['action'] ?? 'stock_adjustment'),
                    (string)($logEntry['product_id'] ?? ''),
                    (string)($logEntry['product_name'] ?? ''),
                    (string)($logEntry['sku'] ?? ''),
                    $logEntry['size'] ?? null,
                    (int)($logEntry['old_stock'] ?? 0),
                    (int)($logEntry['new_stock'] ?? 0),
                    (int)($logEntry['delta'] ?? 0),
                    $logEntry['reason'] ?? null,
                    (string)$logEntry['ip_address']
                ]);
            } catch (Throwable $e) {
                // Suppress if table does not exist or db unavailable
            }
        }

        // 2. Persistent JSON mirror
        $logs = [];
        if (file_exists($this->auditLogPath)) {
            $existing = file_get_contents($this->auditLogPath);
            if ($existing) {
                $decoded = json_decode($existing, true);
                if (is_array($decoded)) {
                    $logs = $decoded;
                }
            }
        }

        array_unshift($logs, $logEntry);
        // Retain last 500 log entries
        if (count($logs) > 500) {
            $logs = array_slice($logs, 0, 500);
        }

        $jsonContent = json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if ($jsonContent !== false) {
            @file_put_contents($this->auditLogPath, $jsonContent, LOCK_EX);

            // Mirror to frontend public directory if it exists
            $frontendMirror = dirname(__DIR__, 2) . '/frontend/public/api/admin/inventory_logs.json';
            if (file_exists(dirname($frontendMirror))) {
                @file_put_contents($frontendMirror, $jsonContent, LOCK_EX);
            }
        }
    }

    /**
     * Handle GET request: Filter, Search, Sort, Paginate
     */
    public function handleGet(): void
    {
        $allProducts = $this->loadProducts();
        $totalProducts = count($allProducts);

        // Single product detail
        $singleId = $_GET['id'] ?? '';
        if (!empty($singleId)) {
            foreach ($allProducts as $p) {
                if (($p['id'] ?? '') === $singleId) {
                    echo json_encode([
                        'success' => true,
                        'product' => $p
                    ], JSON_UNESCAPED_UNICODE);
                    return;
                }
            }
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Product not found'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Query parameters
        $q = trim((string)($_GET['q'] ?? ''));
        $category = trim((string)($_GET['category'] ?? ''));
        $brand = trim((string)($_GET['brand'] ?? ''));
        $status = trim((string)($_GET['status'] ?? 'all'));
        $availability = trim((string)($_GET['availability'] ?? 'all'));
        $sort = trim((string)($_GET['sort'] ?? 'sort_priority'));
        $page = max(1, (int)($_GET['page'] ?? 1));
        $limit = min(100, max(1, (int)($_GET['limit'] ?? 20)));

        // Multi-criteria parsing helper
        $parseMulti = function($val): array {
            if (is_array($val)) return array_values(array_filter(array_map('trim', $val)));
            if (is_string($val) && $val !== '' && $val !== 'all') {
                return array_values(array_filter(array_map('trim', explode(',', $val))));
            }
            return [];
        };

        $categoriesList = $parseMulti($_GET['categories'] ?? $category);
        $statusesList = $parseMulti($_GET['statuses'] ?? $status);
        $availabilitiesList = $parseMulti($_GET['availabilities'] ?? $availability);
        $badgesList = $parseMulti($_GET['badges'] ?? '');

        // Calculate summary counts across all items
        $summary = [
            'total' => $totalProducts,
            'publish' => 0,
            'draft' => 0,
            'suspended' => 0,
            'in_stock' => 0,
            'out_of_stock' => 0,
            'special_order' => 0,
            'best_seller' => 0,
            'new_arrival' => 0,
            'recommended' => 0,
            'promotion' => 0
        ];

        foreach ($allProducts as $p) {
            $pStatus = $p['status'] ?? 'publish';
            if (isset($summary[$pStatus])) $summary[$pStatus]++;

            $pAvail = $p['availability'] ?? (empty($p['flags']['is_in_stock']) ? 'out_of_stock' : 'in_stock');
            if (isset($summary[$pAvail])) $summary[$pAvail]++;

            $shelves = $p['storefront_shelves'] ?? [];
            if (!empty($shelves['best_seller'])) $summary['best_seller']++;
            if (!empty($shelves['new_arrival'])) $summary['new_arrival']++;
            if (!empty($shelves['recommended'])) $summary['recommended']++;
            if (!empty($shelves['promotion'])) $summary['promotion']++;
        }

        // Return full catalog for admin cache / taxonomy if requested
        if (isset($_GET['all']) && ($_GET['all'] === '1' || $_GET['all'] === 'true')) {
            echo json_encode([
                'success' => true,
                'total' => $totalProducts,
                'filtered_total' => $totalProducts,
                'summary' => $summary,
                'products' => $allProducts
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Filtering
        $filtered = array_filter($allProducts, function (array $p) use ($q, $categoriesList, $brand, $statusesList, $availabilitiesList, $badgesList): bool {
            // Search text match
            if ($q !== '') {
                $qLower = mb_strtolower($q, 'UTF-8');
                $name = mb_strtolower((string)($p['name'] ?? ''), 'UTF-8');
                $nameEn = mb_strtolower((string)($p['name_en'] ?? ''), 'UTF-8');
                $sku = mb_strtolower((string)($p['sku'] ?? ''), 'UTF-8');
                $brandName = mb_strtolower((string)($p['brand'] ?? ''), 'UTF-8');
                
                $match = str_contains($name, $qLower) 
                    || str_contains($nameEn, $qLower) 
                    || str_contains($sku, $qLower) 
                    || str_contains($brandName, $qLower);

                if (!$match && !empty($p['tags']) && is_array($p['tags'])) {
                    foreach ($p['tags'] as $t) {
                        if (str_contains(mb_strtolower((string)$t, 'UTF-8'), $qLower)) {
                            $match = true;
                            break;
                        }
                    }
                }
                if (!$match) return false;
            }

            // Category filter (supports multiple categories)
            if (!empty($categoriesList)) {
                $cats = $p['categories'] ?? [];
                $catMatch = false;
                foreach ($cats as $c) {
                    $slug = (string)($c['url_slug'] ?? '');
                    $cName = (string)($c['name'] ?? '');
                    if (in_array($slug, $categoriesList, true) || in_array($cName, $categoriesList, true)) {
                        $catMatch = true;
                        break;
                    }
                }
                if (!$catMatch) return false;
            }

            // Brand filter
            if ($brand !== '' && $brand !== 'all') {
                if (strcasecmp((string)($p['brand'] ?? ''), $brand) !== 0) {
                    return false;
                }
            }

            $flags = $p['flags'] ?? [];
            $shelves = $p['storefront_shelves'] ?? [];

            // Lifecycle status filter (supports multiple statuses)
            if (!empty($statusesList)) {
                $pStatus = $p['status'] ?? 'publish';
                $pAvail = $p['availability'] ?? (empty($flags['is_in_stock']) ? 'out_of_stock' : 'in_stock');
                $statusMatch = false;
                if (in_array($pStatus, $statusesList, true)) {
                    $statusMatch = true;
                } elseif (in_array($pAvail, $statusesList, true)) {
                    $statusMatch = true;
                } else {
                    foreach ($statusesList as $st) {
                        if ($st === 'best_seller' && (!empty($shelves['best_seller']) || !empty($flags['is_best_seller']))) $statusMatch = true;
                        if ($st === 'new_arrival' && (!empty($shelves['new_arrival']) || !empty($flags['is_new_arrival']))) $statusMatch = true;
                        if ($st === 'recommended' && (!empty($shelves['recommended']) || !empty($flags['is_recommended']))) $statusMatch = true;
                        if ($st === 'promotion' && (!empty($shelves['promotion']) || !empty($flags['is_promotion']))) $statusMatch = true;
                    }
                }
                if (!$statusMatch) return false;
            }

            // Availability filter (supports multiple availabilities)
            if (!empty($availabilitiesList)) {
                $pAvail = $p['availability'] ?? (empty($flags['is_in_stock']) ? 'out_of_stock' : 'in_stock');
                if (!in_array($pAvail, $availabilitiesList, true)) return false;
            }

            // Badges filter (supports multiple badges)
            if (!empty($badgesList)) {
                $badgeMatch = false;
                foreach ($badgesList as $b) {
                    if ($b === 'best_seller' && (!empty($shelves['best_seller']) || !empty($flags['is_best_seller']))) $badgeMatch = true;
                    if ($b === 'new_arrival' && (!empty($shelves['new_arrival']) || !empty($flags['is_new_arrival']))) $badgeMatch = true;
                    if ($b === 'recommended' && (!empty($shelves['recommended']) || !empty($flags['is_recommended']))) $badgeMatch = true;
                    if ($b === 'promotion' && (!empty($shelves['promotion']) || !empty($flags['is_promotion']))) $badgeMatch = true;
                }
                if (!$badgeMatch) return false;
            }

            return true;
        });

        // Sorting
        usort($filtered, function (array $a, array $b) use ($sort): int {
            switch ($sort) {
                case 'name_asc':
                    return strcmp((string)($a['name'] ?? ''), (string)($b['name'] ?? ''));
                case 'name_desc':
                    return strcmp((string)($b['name'] ?? ''), (string)($a['name'] ?? ''));
                case 'sold_desc':
                    return ((int)($b['sold_count'] ?? 0)) <=> ((int)($a['sold_count'] ?? 0));
                case 'stock_asc':
                    $stockA = $this->calculateTotalStock($a);
                    $stockB = $this->calculateTotalStock($b);
                    return $stockA <=> $stockB;
                case 'stock_desc':
                    $stockA = $this->calculateTotalStock($a);
                    $stockB = $this->calculateTotalStock($b);
                    return $stockB <=> $stockA;
                case 'price_asc':
                    return ($this->getMinPrice($a)) <=> ($this->getMinPrice($b));
                case 'price_desc':
                    return ($this->getMinPrice($b)) <=> ($this->getMinPrice($a));
                case 'sort_priority':
                default:
                    $prioA = (int)($a['sort_priority'] ?? 9999);
                    $prioB = (int)($b['sort_priority'] ?? 9999);
                    if ($prioA === $prioB) {
                        return strcmp((string)($a['id'] ?? ''), (string)($b['id'] ?? ''));
                    }
                    return $prioA <=> $prioB;
            }
        });

        // Pagination
        $filteredTotal = count($filtered);
        $totalPages = max(1, (int)ceil($filteredTotal / $limit));
        $offset = ($page - 1) * $limit;
        $pagedSlice = array_slice($filtered, $offset, $limit);

        echo json_encode([
            'success' => true,
            'total' => $totalProducts,
            'filtered_total' => $filteredTotal,
            'page' => $page,
            'limit' => $limit,
            'total_pages' => $totalPages,
            'summary' => $summary,
            'products' => array_values($pagedSlice)
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Handle POST request: Reorder shelf, Add/Remove from shelf, Batch curate, or Single Product Update
     */
    public function handlePost(): void
    {
        $rawInput = file_get_contents('php://input');
        if (empty($rawInput)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Empty request body']);
            return;
        }

        $payload = json_decode($rawInput, true);
        if (!is_array($payload)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid request payload']);
            return;
        }

        // Action dispatcher
        $action = (string)($payload['action'] ?? '');

        if ($action === 'reorder_shelf') {
            $this->handleReorderShelf($payload);
            return;
        }

        if ($action === 'remove_from_shelf') {
            $this->handleRemoveFromShelf($payload);
            return;
        }

        if ($action === 'add_to_shelf') {
            $this->handleAddToShelf($payload);
            return;
        }

        if ($action === 'batch_curate') {
            $this->handleBatchCurate($payload);
            return;
        }

        if ($action === 'batch_update_products') {
            $this->handleBatchUpdateProducts($payload);
            return;
        }

        if ($action === 'update_product_status') {
            $this->handleUpdateProductStatus($payload);
            return;
        }

        if ($action === 'create_product') {
            $this->handleCreateProduct($payload);
            return;
        }

        if ($action === 'delete_product') {
            $this->handleDeleteProduct($payload);
            return;
        }

        if ($action === 'batch_delete_products') {
            $this->handleBatchDeleteProducts($payload);
            return;
        }

        // Default: Single product update
        if (empty($payload['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Product ID is required']);
            return;
        }

        $productId = (string)$payload['id'];
        $allProducts = $this->loadProducts();
        $targetIndex = -1;

        foreach ($allProducts as $idx => $p) {
            if (($p['id'] ?? '') === $productId) {
                $targetIndex = $idx;
                break;
            }
        }

        if ($targetIndex === -1) {
            if (!empty($payload['is_new'])) {
                $this->handleCreateProduct($payload);
                return;
            }
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Product not found']);
            return;
        }

        $existing = $allProducts[$targetIndex];

        // Sanitize and update text fields
        if (isset($payload['name'])) $existing['name'] = trim((string)$payload['name']);
        if (isset($payload['name_en'])) $existing['name_en'] = trim((string)$payload['name_en']) ?: null;
        if (isset($payload['brand'])) $existing['brand'] = trim((string)$payload['brand']);
        if (isset($payload['sku'])) $existing['sku'] = trim((string)$payload['sku']);
        if (isset($payload['description'])) $existing['description'] = trim((string)$payload['description']);
        
        // Product Images
        if (isset($payload['images']) && is_array($payload['images'])) {
            $existing['images'] = $payload['images'];
        }
        
        // Product Lifecycle Status
        if (isset($payload['status'])) {
            $allowedStatus = ['publish', 'draft', 'suspended'];
            $newStatus = (string)$payload['status'];
            $existing['status'] = in_array($newStatus, $allowedStatus, true) ? $newStatus : 'publish';
        }

        // Availability Status
        if (isset($payload['availability'])) {
            $allowedAvail = ['in_stock', 'out_of_stock', 'special_order'];
            $newAvail = (string)$payload['availability'];
            $existing['availability'] = in_array($newAvail, $allowedAvail, true) ? $newAvail : 'in_stock';
        }

        // Storefront Shelves Curation
        if (isset($payload['storefront_shelves']) && is_array($payload['storefront_shelves'])) {
            $existingShelves = $existing['storefront_shelves'] ?? [];
            $shelvesInput = $payload['storefront_shelves'];
            
            $existing['storefront_shelves'] = [
                'best_seller' => isset($shelvesInput['best_seller']) && is_numeric($shelvesInput['best_seller']) ? (int)$shelvesInput['best_seller'] : null,
                'new_arrival' => isset($shelvesInput['new_arrival']) && is_numeric($shelvesInput['new_arrival']) ? (int)$shelvesInput['new_arrival'] : null,
                'recommended' => isset($shelvesInput['recommended']) && is_numeric($shelvesInput['recommended']) ? (int)$shelvesInput['recommended'] : null,
                'promotion' => isset($shelvesInput['promotion']) && is_numeric($shelvesInput['promotion']) ? (int)$shelvesInput['promotion'] : null,
            ];
        }

        // Variants and stock
        if (isset($payload['variants']) && is_array($payload['variants'])) {
            $sanitizedVariants = [];
            $hasStock = false;
            foreach ($payload['variants'] as $v) {
                $vStock = max(0, (int)($v['stock'] ?? 0));
                if ($vStock > 0) $hasStock = true;

                $sanitizedVariants[] = [
                    'size' => trim((string)($v['size'] ?? 'มาตรฐาน')),
                    'package' => trim((string)($v['package'] ?? 'ชิ้น')),
                    'unit' => trim((string)($v['unit'] ?? 'ชิ้น')),
                    'weight' => trim((string)($v['weight'] ?? '')),
                    'price' => max(0.0, (float)($v['price'] ?? 0.0)),
                    'original_price' => !empty($v['original_price']) ? (float)$v['original_price'] : null,
                    'stock' => $vStock,
                    'sku' => trim((string)($v['sku'] ?? $existing['sku']))
                ];
            }
            $existing['variants'] = $sanitizedVariants;
            $existing['flags']['is_in_stock'] = $hasStock;

            // If availability wasn't explicitly special_order, align with stock count
            if (($existing['availability'] ?? '') !== 'special_order') {
                $existing['availability'] = $hasStock ? 'in_stock' : 'out_of_stock';
            }

            // Synchronize filter_attributes sizes and packages
            $existing['filter_attributes'] = $existing['filter_attributes'] ?? [];
            $existing['filter_attributes']['sizes'] = array_values(array_unique(array_filter(array_column($sanitizedVariants, 'size'))));
            $existing['filter_attributes']['packages'] = array_values(array_unique(array_filter(array_column($sanitizedVariants, 'package'))));
        }

        // Tags
        if (isset($payload['tags']) && is_array($payload['tags'])) {
            $existing['tags'] = array_values(array_unique(array_filter(array_map('trim', $payload['tags']))));
        }

        // Specs Table
        if (isset($payload['specsTable']) && is_array($payload['specsTable'])) {
            $existing['specsTable'] = $payload['specsTable'];
        } elseif (empty($existing['specsTable'])) {
            $firstCat = !empty($existing['categories'][0]['name']) ? $existing['categories'][0]['name'] : 'ทั่วไป';
            $existing['specsTable'] = [
                ['key' => 'แบรนด์', 'value' => $existing['brand'] ?? 'UDO'],
                ['key' => 'รหัสสินค้า', 'value' => $existing['sku'] ?? $existing['id']],
                ['key' => 'หมวดหมู่', 'value' => $firstCat],
                ['key' => 'สถานะสต็อก', 'value' => ($existing['availability'] ?? 'in_stock') === 'in_stock' ? 'มีสินค้าพร้อมส่ง' : 'ติดต่อสอบถาม']
            ];
        }

        // Rich Content
        if (isset($payload['richContent']) && is_array($payload['richContent'])) {
            $existing['richContent'] = $payload['richContent'];
        } else {
            $firstImgUrl = '';
            if (!empty($existing['images'][0])) {
                $firstImg = $existing['images'][0];
                $firstImgUrl = is_array($firstImg) ? ($firstImg['large'] ?? $firstImg['original'] ?? $firstImg['thumb'] ?? '') : (string)$firstImg;
            }
            if (empty($existing['richContent'])) {
                $existing['richContent'] = [
                    'headline' => $existing['name'],
                    'description' => $existing['description'] ?? '',
                    'image1' => $firstImgUrl ?: null,
                    'image2' => null,
                    'image3' => null,
                    'tablesHtml' => ''
                ];
            } else {
                $existing['richContent']['headline'] = $existing['name'];
                if (empty($existing['richContent']['description'])) {
                    $existing['richContent']['description'] = $existing['description'] ?? '';
                }
                if (empty($existing['richContent']['image1']) && !empty($firstImgUrl)) {
                    $existing['richContent']['image1'] = $firstImgUrl;
                }
            }
        }

        // Flags synchronization with storefront_shelves
        $existing['flags'] = $existing['flags'] ?? [];
        $curShelves = $existing['storefront_shelves'] ?? [];
        $existing['flags']['is_best_seller'] = !empty($curShelves['best_seller']);
        $existing['flags']['is_new_arrival'] = !empty($curShelves['new_arrival']);
        $existing['flags']['is_recommended'] = !empty($curShelves['recommended']);
        $existing['flags']['is_promotion'] = !empty($curShelves['promotion']);

        // Collections synchronization
        $collections = $existing['collections'] ?? ['popular', 'just_for_you'];
        if ($existing['flags']['is_best_seller'] && !in_array('top-sale', $collections, true)) $collections[] = 'top-sale';
        if (!$existing['flags']['is_best_seller']) $collections = array_values(array_diff($collections, ['top-sale']));
        if ($existing['flags']['is_new_arrival'] && !in_array('new-arrival', $collections, true)) $collections[] = 'new-arrival';
        if (!$existing['flags']['is_new_arrival']) $collections = array_values(array_diff($collections, ['new-arrival']));
        if ($existing['flags']['is_recommended'] && !in_array('for-you', $collections, true)) $collections[] = 'for-you';
        if (!$existing['flags']['is_recommended']) $collections = array_values(array_diff($collections, ['for-you']));
        if ($existing['flags']['is_promotion'] && !in_array('promotion', $collections, true)) $collections[] = 'promotion';
        if (!$existing['flags']['is_promotion']) $collections = array_values(array_diff($collections, ['promotion']));
        $existing['collections'] = $collections;

        // Save single product to MariaDB document store
        $saved = $this->saveSingleProduct($existing);

        if (!$saved) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to persist updates in database']);
            return;
        }

        // Record Audit Log
        $this->recordAuditLog([
            'action' => 'update_product',
            'product_id' => $productId,
            'sku' => $existing['sku'] ?? '',
            'name' => $existing['name'] ?? '',
            'status' => $existing['status'] ?? 'publish',
            'availability' => $existing['availability'] ?? 'in_stock',
            'admin_user' => (string)($payload['admin_user'] ?? 'admin')
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Product updated successfully',
            'product' => $existing
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Handle Atomic Reorder of a Storefront Shelf
     */
    public function handleReorderShelf(array $payload): void
    {
        $shelf = (string)($payload['shelf'] ?? '');
        $orderedIds = (array)($payload['ordered_ids'] ?? []);
        $adminUser = (string)($payload['admin_user'] ?? 'admin');

        $allowedShelves = ['best_seller', 'new_arrival', 'recommended', 'promotion'];
        if (!in_array($shelf, $allowedShelves, true) || empty($orderedIds)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid shelf or empty ordered_ids']);
            return;
        }

        $allProducts = $this->loadProducts();
        $rankMap = [];
        foreach ($orderedIds as $idx => $id) {
            $rankMap[(string)$id] = $idx + 1;
        }

        $updatedCount = 0;
        foreach ($allProducts as $idx => $p) {
            $pid = (string)($p['id'] ?? '');
            if (isset($rankMap[$pid])) {
                $p['storefront_shelves'] = $p['storefront_shelves'] ?? [];
                $p['storefront_shelves'][$shelf] = $rankMap[$pid];
                
                // Keep backward compatible flags
                $p['flags'] = $p['flags'] ?? [];
                if ($shelf === 'best_seller') $p['flags']['is_best_seller'] = true;
                elseif ($shelf === 'new_arrival') $p['flags']['is_new_arrival'] = true;
                elseif ($shelf === 'recommended') $p['flags']['is_recommended'] = true;
                elseif ($shelf === 'promotion') $p['flags']['is_promotion'] = true;

                $allProducts[$idx] = $p;
                $updatedCount++;
            }
        }

        $saved = $this->saveProducts($allProducts);
        if ($saved) {
            $this->recordAuditLog([
                'action' => 'reorder_shelf',
                'shelf' => $shelf,
                'count' => $updatedCount,
                'admin_user' => $adminUser
            ]);
            echo json_encode([
                'success' => true,
                'message' => "Reordered {$updatedCount} products in shelf {$shelf}",
                'shelf' => $shelf,
                'count' => $updatedCount
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save reordered shelf']);
        }
    }

    /**
     * Handle Removing a Product from a Shelf & Auto-Compact Remaining Items
     */
    public function handleRemoveFromShelf(array $payload): void
    {
        $shelf = (string)($payload['shelf'] ?? '');
        $productId = (string)($payload['product_id'] ?? '');
        $adminUser = (string)($payload['admin_user'] ?? 'admin');

        $allowedShelves = ['best_seller', 'new_arrival', 'recommended', 'promotion'];
        if (!in_array($shelf, $allowedShelves, true) || empty($productId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid shelf or product_id']);
            return;
        }

        $allProducts = $this->loadProducts();
        $targetFound = false;

        foreach ($allProducts as $idx => $p) {
            if (($p['id'] ?? '') === $productId) {
                $p['storefront_shelves'] = $p['storefront_shelves'] ?? [];
                $p['storefront_shelves'][$shelf] = null;

                $p['flags'] = $p['flags'] ?? [];
                if ($shelf === 'best_seller') $p['flags']['is_best_seller'] = false;
                elseif ($shelf === 'new_arrival') $p['flags']['is_new_arrival'] = false;
                elseif ($shelf === 'recommended') $p['flags']['is_recommended'] = false;
                elseif ($shelf === 'promotion') $p['flags']['is_promotion'] = false;

                $allProducts[$idx] = $p;
                $targetFound = true;
                break;
            }
        }

        if (!$targetFound) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Product not found']);
            return;
        }

        // Auto-compact remaining products in this shelf (1, 2, 3...)
        $shelfItems = [];
        foreach ($allProducts as $idx => $p) {
            $rank = $p['storefront_shelves'][$shelf] ?? null;
            if ($rank !== null && is_numeric($rank)) {
                $shelfItems[] = ['idx' => $idx, 'rank' => (int)$rank];
            }
        }
        usort($shelfItems, fn($a, $b) => $a['rank'] <=> $b['rank']);

        foreach ($shelfItems as $seq => $item) {
            $allProducts[$item['idx']]['storefront_shelves'][$shelf] = $seq + 1;
        }

        $saved = $this->saveProducts($allProducts);
        if ($saved) {
            $this->recordAuditLog([
                'action' => 'remove_from_shelf',
                'shelf' => $shelf,
                'product_id' => $productId,
                'admin_user' => $adminUser
            ]);
            echo json_encode([
                'success' => true,
                'message' => "Removed product {$productId} from shelf {$shelf}",
                'shelf' => $shelf,
                'product_id' => $productId,
                'remaining_count' => count($shelfItems)
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to persist removal']);
        }
    }

    /**
     * Handle Adding a Product to a Shelf at Specific Position
     */
    public function handleAddToShelf(array $payload): void
    {
        $shelf = (string)($payload['shelf'] ?? '');
        $productId = (string)($payload['product_id'] ?? '');
        $position = (string)($payload['position'] ?? 'front'); // 'front' (spotlight #1) or 'end'
        $adminUser = (string)($payload['admin_user'] ?? 'admin');

        $allowedShelves = ['best_seller', 'new_arrival', 'recommended', 'promotion'];
        if (!in_array($shelf, $allowedShelves, true) || empty($productId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid shelf or product_id']);
            return;
        }

        $allProducts = $this->loadProducts();
        $targetIdx = -1;

        foreach ($allProducts as $idx => $p) {
            if (($p['id'] ?? '') === $productId) {
                $targetIdx = $idx;
                break;
            }
        }

        if ($targetIdx === -1) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Product not found']);
            return;
        }

        // Collect existing shelf items
        $shelfItems = [];
        foreach ($allProducts as $idx => $p) {
            if ($idx === $targetIdx) continue;
            $rank = $p['storefront_shelves'][$shelf] ?? null;
            if ($rank !== null && is_numeric($rank)) {
                $shelfItems[] = ['idx' => $idx, 'rank' => (int)$rank];
            }
        }
        usort($shelfItems, fn($a, $b) => $a['rank'] <=> $b['rank']);

        $assignedRank = 1;
        if ($position === 'front') {
            // Shift all existing items up by 1 (+1)
            foreach ($shelfItems as $seq => $item) {
                $allProducts[$item['idx']]['storefront_shelves'][$shelf] = $seq + 2;
            }
            $assignedRank = 1;
        } else {
            // Place at the end
            $assignedRank = count($shelfItems) + 1;
        }

        $target = $allProducts[$targetIdx];
        $target['storefront_shelves'] = $target['storefront_shelves'] ?? [];
        $target['storefront_shelves'][$shelf] = $assignedRank;

        $target['flags'] = $target['flags'] ?? [];
        if ($shelf === 'best_seller') $target['flags']['is_best_seller'] = true;
        elseif ($shelf === 'new_arrival') $target['flags']['is_new_arrival'] = true;
        elseif ($shelf === 'recommended') $target['flags']['is_recommended'] = true;
        elseif ($shelf === 'promotion') $target['flags']['is_promotion'] = true;

        $allProducts[$targetIdx] = $target;

        $saved = $this->saveProducts($allProducts);
        if ($saved) {
            $this->recordAuditLog([
                'action' => 'add_to_shelf',
                'shelf' => $shelf,
                'product_id' => $productId,
                'assigned_rank' => $assignedRank,
                'admin_user' => $adminUser
            ]);
            echo json_encode([
                'success' => true,
                'message' => "Added product {$productId} to shelf {$shelf} at rank {$assignedRank}",
                'shelf' => $shelf,
                'product_id' => $productId,
                'assigned_rank' => $assignedRank
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save product to shelf']);
        }
    }

    /**
     * Handle Batch Collection Curation
     */
    public function handleBatchCurate(array $payload): void
    {
        $scope = (string)($payload['scope'] ?? '');
        $productIds = (array)($payload['product_ids'] ?? []);
        $mode = (string)($payload['mode'] ?? 'add'); // 'add' | 'remove'
        $adminUser = (string)($payload['admin_user'] ?? 'admin');

        if (empty($scope) || empty($productIds)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Scope and product_ids are required']);
            return;
        }

        $allProducts = $this->loadProducts();
        $updatedCount = 0;
        $idSet = array_flip($productIds);
        $isAdd = ($mode === 'add');

        // If adding to a storefront shelf, find current max rank
        $currentMaxRank = 0;
        $isStorefrontShelf = in_array($scope, ['best_seller', 'new_arrival', 'recommended', 'promotion'], true);
        if ($isStorefrontShelf) {
            foreach ($allProducts as $p) {
                $r = $p['storefront_shelves'][$scope] ?? null;
                if ($r !== null && is_numeric($r) && (int)$r > $currentMaxRank) {
                    $currentMaxRank = (int)$r;
                }
            }
        }

        foreach ($allProducts as $idx => $p) {
            $pid = (string)($p['id'] ?? '');
            if (isset($idSet[$pid])) {
                $flags = $p['flags'] ?? [];
                $collections = $p['collections'] ?? ['popular', 'just_for_you'];
                $shelves = $p['storefront_shelves'] ?? [
                    'best_seller' => null,
                    'new_arrival' => null,
                    'recommended' => null,
                    'promotion' => null
                ];

                if ($scope === 'best_seller') {
                    $flags['is_best_seller'] = $isAdd;
                    if ($isAdd) {
                        if (!in_array('top-sale', $collections, true)) $collections[] = 'top-sale';
                        if (empty($shelves['best_seller'])) {
                            $currentMaxRank++;
                            $shelves['best_seller'] = $currentMaxRank;
                        }
                    } else {
                        $collections = array_values(array_diff($collections, ['top-sale']));
                        $shelves['best_seller'] = null;
                    }
                } elseif ($scope === 'new_arrival') {
                    $flags['is_new_arrival'] = $isAdd;
                    if ($isAdd) {
                        if (!in_array('new-arrival', $collections, true)) $collections[] = 'new-arrival';
                        if (empty($shelves['new_arrival'])) {
                            $currentMaxRank++;
                            $shelves['new_arrival'] = $currentMaxRank;
                        }
                    } else {
                        $collections = array_values(array_diff($collections, ['new-arrival']));
                        $shelves['new_arrival'] = null;
                    }
                } elseif ($scope === 'recommended') {
                    $flags['is_recommended'] = $isAdd;
                    if ($isAdd) {
                        if (!in_array('for-you', $collections, true)) $collections[] = 'for-you';
                        if (empty($shelves['recommended'])) {
                            $currentMaxRank++;
                            $shelves['recommended'] = $currentMaxRank;
                        }
                    } else {
                        $collections = array_values(array_diff($collections, ['for-you']));
                        $shelves['recommended'] = null;
                    }
                } elseif ($scope === 'promotion') {
                    $flags['is_promotion'] = $isAdd;
                    if ($isAdd) {
                        if (!in_array('promotion', $collections, true)) $collections[] = 'promotion';
                        if (empty($shelves['promotion'])) {
                            $currentMaxRank++;
                            $shelves['promotion'] = $currentMaxRank;
                        }
                    } else {
                        $collections = array_values(array_diff($collections, ['promotion']));
                        $shelves['promotion'] = null;
                    }
                }

                $p['flags'] = $flags;
                $p['collections'] = $collections;
                $p['storefront_shelves'] = $shelves;
                $allProducts[$idx] = $p;
                $updatedCount++;
            }
        }

        // If removing from a shelf, auto-compact remaining items
        if (!$isAdd && $isStorefrontShelf) {
            $shelfItems = [];
            foreach ($allProducts as $idx => $p) {
                $rank = $p['storefront_shelves'][$scope] ?? null;
                if ($rank !== null && is_numeric($rank)) {
                    $shelfItems[] = ['idx' => $idx, 'rank' => (int)$rank];
                }
            }
            usort($shelfItems, fn($a, $b) => $a['rank'] <=> $b['rank']);
            foreach ($shelfItems as $seq => $item) {
                $allProducts[$item['idx']]['storefront_shelves'][$scope] = $seq + 1;
            }
        }

        if ($updatedCount > 0) {
            $this->saveProducts($allProducts);
            $this->recordAuditLog([
                'action' => 'batch_curate',
                'scope' => $scope,
                'mode' => $mode,
                'count' => $updatedCount,
                'product_ids' => $productIds,
                'admin_user' => $adminUser
            ]);
        }

        echo json_encode([
            'success' => true,
            'message' => "Successfully updated {$updatedCount} products in {$scope}",
            'updated_count' => $updatedCount
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Batch update multiple products (Status, Availability)
     */
    public function handleBatchUpdateProducts(array $payload): void
    {
        $productIds = $payload['product_ids'] ?? [];
        $updates = $payload['updates'] ?? [];

        if (!is_array($productIds) || empty($productIds)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Product IDs array is required']);
            return;
        }

        if (!is_array($updates) || empty($updates)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Update fields are required']);
            return;
        }

        $allProducts = $this->loadProducts();
        $targetIdsSet = array_flip($productIds);
        $updatedCount = 0;

        $newStatus = isset($updates['status']) && in_array($updates['status'], ['publish', 'draft', 'suspended'], true) ? $updates['status'] : null;
        $newAvail = isset($updates['availability']) && in_array($updates['availability'], ['in_stock', 'out_of_stock', 'special_order'], true) ? $updates['availability'] : null;

        foreach ($allProducts as $idx => $p) {
            $pid = $p['id'] ?? '';
            if (isset($targetIdsSet[$pid])) {
                if ($newStatus !== null) {
                    $allProducts[$idx]['status'] = $newStatus;
                }
                if ($newAvail !== null) {
                    $allProducts[$idx]['availability'] = $newAvail;
                    $allProducts[$idx]['flags'] = $allProducts[$idx]['flags'] ?? [];
                    if ($newAvail === 'in_stock') {
                        $allProducts[$idx]['flags']['is_in_stock'] = true;
                    } elseif ($newAvail === 'out_of_stock') {
                        $allProducts[$idx]['flags']['is_in_stock'] = false;
                    }
                }
                $updatedCount++;
            }
        }

        if ($updatedCount > 0) {
            $this->saveProducts($allProducts);

            $logSummary = [];
            if ($newStatus !== null) $logSummary[] = "status: {$newStatus}";
            if ($newAvail !== null) $logSummary[] = "availability: {$newAvail}";
            $summaryStr = implode(', ', $logSummary);

            $this->recordAuditLog([
                'action' => 'batch_update_products',
                'product_id' => 'batch',
                'product_name' => "Batch update {$updatedCount} items",
                'sku' => "Count: {$updatedCount}",
                'reason' => "Batch updated [{$summaryStr}]"
            ]);
        }

        echo json_encode([
            'success' => true,
            'message' => "Successfully updated {$updatedCount} products",
            'updated_count' => $updatedCount
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Update single product lifecycle status
     */
    public function handleUpdateProductStatus(array $payload): void
    {
        $productId = (string)($payload['product_id'] ?? $payload['id'] ?? '');
        $status = (string)($payload['status'] ?? '');
        $allowed = ['publish', 'draft', 'suspended'];

        if (empty($productId) || !in_array($status, $allowed, true)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Valid product_id and status (publish, draft, suspended) are required']);
            return;
        }

        $allProducts = $this->loadProducts();
        $targetIdx = -1;

        foreach ($allProducts as $idx => $p) {
            if (($p['id'] ?? '') === $productId) {
                $targetIdx = $idx;
                break;
            }
        }

        if ($targetIdx === -1) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Product not found']);
            return;
        }

        $oldStatus = $allProducts[$targetIdx]['status'] ?? 'publish';
        $allProducts[$targetIdx]['status'] = $status;

        $saved = $this->saveSingleProduct($allProducts[$targetIdx]);
        if ($saved) {
            $this->recordAuditLog([
                'action' => 'update_status',
                'product_id' => $productId,
                'product_name' => $allProducts[$targetIdx]['name'] ?? '',
                'reason' => "Status changed from {$oldStatus} to {$status}"
            ]);

            echo json_encode([
                'success' => true,
                'product_id' => $productId,
                'old_status' => $oldStatus,
                'status' => $status,
                'message' => "Successfully updated product status to {$status}"
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save product status']);
        }
    }

    private function calculateTotalStock(array $p): int
    {
        $sum = 0;
        foreach ($p['variants'] ?? [] as $v) {
            $sum += (int)($v['stock'] ?? 0);
        }
        return $sum;
    }

    /**
     * Create brand new product and persist to Master Storage
     */
    public function handleCreateProduct(array $payload): void
    {
        $allProducts = $this->loadProducts();

        $name = trim((string)($payload['name'] ?? ''));
        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Product name is required']);
            return;
        }

        // Generate clean unique ID if not provided
        $productId = trim((string)($payload['id'] ?? ''));
        if (empty($productId)) {
            $productId = 'udo-' . (count($allProducts) + 1);
        }

        // Ensure ID is not duplicated
        foreach ($allProducts as $p) {
            if (($p['id'] ?? '') === $productId) {
                $productId = 'udo-' . time() . '-' . bin2hex(random_bytes(2));
                break;
            }
        }

        $sku = trim((string)($payload['sku'] ?? ''));
        if (empty($sku)) {
            $sku = 'UDO-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
        }

        $brand = trim((string)($payload['brand'] ?? 'UDO'));
        $nameEn = trim((string)($payload['name_en'] ?? '')) ?: null;
        $description = trim((string)($payload['description'] ?? ''));
        $status = in_array((string)($payload['status'] ?? 'publish'), ['publish', 'draft', 'suspended'], true) 
                  ? (string)$payload['status'] 
                  : 'publish';
        
        $availability = in_array((string)($payload['availability'] ?? 'in_stock'), ['in_stock', 'out_of_stock', 'special_order'], true) 
                        ? (string)$payload['availability'] 
                        : 'in_stock';

        $sortPriority = isset($payload['sort_priority']) ? (int)$payload['sort_priority'] : 1;

        // Process variants
        $variants = [];
        $hasStock = false;
        if (isset($payload['variants']) && is_array($payload['variants']) && count($payload['variants']) > 0) {
            foreach ($payload['variants'] as $v) {
                $vStock = max(0, (int)($v['stock'] ?? 0));
                if ($vStock > 0) $hasStock = true;
                $variants[] = [
                    'size' => trim((string)($v['size'] ?? 'มาตรฐาน')),
                    'package' => trim((string)($v['package'] ?? 'ชิ้น')),
                    'unit' => trim((string)($v['unit'] ?? 'ชิ้น')),
                    'weight' => trim((string)($v['weight'] ?? '')),
                    'price' => max(0.0, (float)($v['price'] ?? 0.0)),
                    'original_price' => !empty($v['original_price']) ? (float)$v['original_price'] : null,
                    'stock' => $vStock,
                    'sku' => trim((string)($v['sku'] ?? $sku))
                ];
            }
        } else {
            $variants = [
                [
                    'size' => 'มาตรฐาน',
                    'package' => 'ชิ้น',
                    'unit' => 'ชิ้น',
                    'weight' => '',
                    'price' => 0.0,
                    'original_price' => null,
                    'stock' => 10,
                    'sku' => $sku
                ]
            ];
            $hasStock = true;
        }

        // Images
        $images = [];
        if (isset($payload['images']) && is_array($payload['images'])) {
            $images = $payload['images'];
        }

        // Shelves
        $shelvesInput = $payload['storefront_shelves'] ?? [];
        $shelves = [
            'best_seller' => isset($shelvesInput['best_seller']) && is_numeric($shelvesInput['best_seller']) ? (int)$shelvesInput['best_seller'] : null,
            'new_arrival' => isset($shelvesInput['new_arrival']) && is_numeric($shelvesInput['new_arrival']) ? (int)$shelvesInput['new_arrival'] : 1,
            'recommended' => isset($shelvesInput['recommended']) && is_numeric($shelvesInput['recommended']) ? (int)$shelvesInput['recommended'] : null,
            'promotion' => isset($shelvesInput['promotion']) && is_numeric($shelvesInput['promotion']) ? (int)$shelvesInput['promotion'] : null,
        ];

        // Flags
        $flags = [
            'is_in_stock' => $hasStock,
            'is_best_seller' => !empty($shelves['best_seller']),
            'is_new_arrival' => !empty($shelves['new_arrival']),
            'is_recommended' => !empty($shelves['recommended']),
            'is_promotion' => !empty($shelves['promotion']),
        ];

        // Categories
        $categories = $payload['categories'] ?? [
            [
                'level' => 1,
                'name' => 'กลุ่มลวดเชื่อม',
                'url_slug' => 'cat-12'
            ]
        ];

        // Tags
        $tags = isset($payload['tags']) && is_array($payload['tags']) && !empty($payload['tags'])
            ? array_values(array_unique(array_filter(array_map('trim', $payload['tags']))))
            : array_values(array_filter([$name, $brand, $categories[0]['name'] ?? 'ทั่วไป']));

        // Filter attributes
        $sizes = array_values(array_unique(array_filter(array_column($variants, 'size'))));
        $packages = array_values(array_unique(array_filter(array_column($variants, 'package'))));
        $filterAttributes = [
            'category_type' => 'general',
            'material' => $name,
            'sizes' => !empty($sizes) ? $sizes : ['มาตรฐาน'],
            'packages' => !empty($packages) ? $packages : ['ชิ้น']
        ];

        // Specs table
        $categoryName = $categories[0]['name'] ?? 'ทั่วไป';
        $specsTable = isset($payload['specsTable']) && is_array($payload['specsTable']) && !empty($payload['specsTable'])
            ? $payload['specsTable']
            : [
                ['key' => 'แบรนด์', 'value' => $brand],
                ['key' => 'รหัสสินค้า', 'value' => $sku],
                ['key' => 'หมวดหมู่', 'value' => $categoryName],
                ['key' => 'สถานะสต็อก', 'value' => $availability === 'in_stock' ? 'มีสินค้าพร้อมส่ง' : 'ติดต่อสอบถาม']
            ];

        // Rich Content
        $firstImgUrl = '';
        if (!empty($images[0])) {
            $firstImg = $images[0];
            $firstImgUrl = is_array($firstImg) ? ($firstImg['large'] ?? $firstImg['original'] ?? $firstImg['thumb'] ?? '') : (string)$firstImg;
        }
        $richContent = isset($payload['richContent']) && is_array($payload['richContent']) && !empty($payload['richContent'])
            ? $payload['richContent']
            : [
                'headline' => $name,
                'description' => $description,
                'image1' => $firstImgUrl ?: null,
                'image2' => null,
                'image3' => null,
                'tablesHtml' => ''
            ];

        $newProduct = [
            'id' => $productId,
            'name' => $name,
            'name_en' => $nameEn,
            'brand' => $brand,
            'sku' => $sku,
            'description' => $description,
            'descriptionHtml' => htmlspecialchars($description),
            'created_at' => date('Y-m-d H:i:s'),
            'sold_count' => 0,
            'collections' => ['new-arrival', 'popular'],
            'flags' => $flags,
            'storefront_shelves' => $shelves,
            'categories' => $categories,
            'filter_attributes' => $filterAttributes,
            'tags' => $tags,
            'specsTable' => $specsTable,
            'richContent' => $richContent,
            'images' => $images,
            'variants' => $variants,
            'status' => $status,
            'availability' => $availability,
            'sort_priority' => $sortPriority
        ];

        // Save new product document directly to MariaDB
        $saved = $this->saveSingleProduct($newProduct);

        if (!$saved) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to persist new product in database']);
            return;
        }

        // Record Audit Log
        $this->recordAuditLog([
            'action' => 'create_product',
            'product_id' => $productId,
            'sku' => $sku,
            'name' => $name,
            'status' => $status,
            'reason' => 'สร้างสินค้าใหม่ผ่านระบบ Admin'
        ]);

        echo json_encode([
            'success' => true,
            'message' => "สร้างสินค้า {$name} เข้าสู่ระบบเรียบร้อย",
            'product' => $newProduct
        ], JSON_UNESCAPED_UNICODE);
    }

    public function handleDeleteProduct(array $payload): void
    {
        $adminContext = getAuthenticatedAdminContext();
        if (empty($adminContext['admin_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Unauthorized']);
            return;
        }

        if (empty($payload['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Product ID is required']);
            return;
        }

        $productId = (string)$payload['id'];
        $allProducts = $this->loadProducts();
        $targetIndex = -1;
        $targetProduct = null;

        foreach ($allProducts as $idx => $p) {
            if (($p['id'] ?? '') === $productId) {
                $targetIndex = $idx;
                $targetProduct = $p;
                break;
            }
        }

        if ($targetIndex === -1 || $targetProduct === null) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Product not found']);
            return;
        }

        $productName = (string)($targetProduct['name'] ?? $productId);
        $productSku = (string)($targetProduct['sku'] ?? ($targetProduct['variants'][0]['sku'] ?? $productId));

        // Delete product from MariaDB document store
        $saved = $this->deleteSingleProduct($productId);
        if (!$saved) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to delete product from database']);
            return;
        }

        // Record Audit Log
        $this->recordAuditLog([
            'action' => 'delete_product',
            'product_id' => $productId,
            'sku' => $productSku,
            'name' => $productName,
            'status' => 'deleted',
            'reason' => 'ลบสินค้าออกจากระบบผ่านระบบ Admin'
        ]);

        echo json_encode([
            'success' => true,
            'message' => "ลบสินค้า {$productName} ออกจากระบบเรียบร้อย",
            'deleted_id' => $productId
        ], JSON_UNESCAPED_UNICODE);
    }

    public function handleBatchDeleteProducts(array $payload): void
    {
        $adminContext = getAuthenticatedAdminContext();
        if (empty($adminContext['admin_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Unauthorized']);
            return;
        }

        $ids = $payload['ids'] ?? [];
        if (!is_array($ids) || empty($ids)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Product IDs array is required']);
            return;
        }

        $idsSet = array_fill_keys(array_map('strval', $ids), true);
        $allProducts = $this->loadProducts();
        $remainingProducts = [];
        $deletedCount = 0;
        $deletedItems = [];

        foreach ($allProducts as $p) {
            $pId = (string)($p['id'] ?? '');
            if (isset($idsSet[$pId])) {
                $deletedCount++;
                $deletedItems[] = [
                    'id' => $pId,
                    'name' => $p['name'] ?? $pId,
                    'sku' => $p['sku'] ?? ($p['variants'][0]['sku'] ?? $pId)
                ];
            } else {
                $remainingProducts[] = $p;
            }
        }

        if ($deletedCount === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'No matching products found to delete']);
            return;
        }

        // Delete products from MariaDB document store
        $delIds = array_column($deletedItems, 'id');
        $this->deleteMultipleProducts($delIds);

        // Record Audit Log for batch delete
        $this->recordAuditLog([
            'action' => 'batch_delete_products',
            'product_id' => implode(',', array_slice(array_column($deletedItems, 'id'), 0, 10)),
            'sku' => "Batch delete {$deletedCount} items",
            'name' => "ลบสินค้ากลุ่ม {$deletedCount} รายการ",
            'status' => 'deleted',
            'reason' => "ลบสินค้าเป็นกลุ่มจำนวน {$deletedCount} รายการ"
        ]);

        echo json_encode([
            'success' => true,
            'message' => "ลบสินค้าจำนวน {$deletedCount} รายการเรียบร้อย",
            'deleted_count' => $deletedCount,
            'deleted_ids' => array_column($deletedItems, 'id')
        ], JSON_UNESCAPED_UNICODE);
    }

    private function getMinPrice(array $p): float
    {
        $min = 99999999.0;
        foreach ($p['variants'] ?? [] as $v) {
            $price = (float)($v['price'] ?? 0.0);
            if ($price > 0 && $price < $min) {
                $min = $price;
            }
        }
        return $min === 99999999.0 ? 0.0 : $min;
    }
}

// Execute Service (Only when accessed directly)
$currentScript = $_SERVER['SCRIPT_FILENAME'] ?? '';
if (!empty($currentScript) && (realpath($currentScript) === realpath(__FILE__) || basename($currentScript) === 'products.php')) {
    handleCorsAndHeaders();
    $service = new UdoAdminProductsService();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $service->handlePost();
    } else {
        $service->handleGet();
    }
}
