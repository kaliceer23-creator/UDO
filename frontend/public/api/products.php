<?php
declare(strict_types=1);

/**
 * UDO E-Commerce CMS: Public Products REST API
 * Serves real-time product data directly from MariaDB 10.6.13 Document-Store Table
 * Architecture: Native Modern PHP 8.1 (OOP, PDO Prepared Statements)
 * Strict GEMINI.md compliance: No frameworks, zero emojis, pure JSON
 */

require_once __DIR__ . '/config.php';

class UdoPublicProductsService
{
    private ?PDO $db = null;

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

    public function handleRequest(): void
    {
        handleCorsAndHeaders();
        header('Cache-Control: no-cache, must-revalidate');

        $id = trim((string)($_GET['id'] ?? ''));
        $noCache = !empty($_GET['nocache']) || !empty($_GET['t']) || !empty($_GET['v']);
        $db = $this->getDbConnection();

        if ($db !== null) {
            try {
                // Single product lookup
                if (!empty($id)) {
                    $stmt = $db->prepare("SELECT id, UNIX_TIMESTAMP(updated_at) AS updated_ts, data FROM products WHERE id = ? LIMIT 1");
                    $stmt->execute([$id]);
                    $row = $stmt->fetch();

                    if ($row && !empty($row['data'])) {
                        $etag = sprintf('"%s-%s"', $row['id'], $row['updated_ts'] ?? 0);
                        header("ETag: {$etag}");

                        $ifNoneMatch = trim($_SERVER['HTTP_IF_NONE_MATCH'] ?? '');
                        if (!$noCache && !empty($ifNoneMatch) && ($ifNoneMatch === $etag || str_replace('-gzip', '', $ifNoneMatch) === $etag)) {
                            http_response_code(304);
                            return;
                        }

                        $product = json_decode($row['data'], true);
                        if (is_array($product)) {
                            $product['id'] = $row['id'];
                            echo json_encode([
                                'success' => true,
                                'product' => $product
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

                // Products list query
                $category = trim((string)($_GET['category'] ?? ''));
                $brand = trim((string)($_GET['brand'] ?? ''));
                $limit = min(2000, max(1, (int)($_GET['limit'] ?? 1500)));

                // ETag calculation for catalog list (Ultra-fast MariaDB index check, <0.5ms)
                $etagSql = "SELECT UNIX_TIMESTAMP(MAX(updated_at)) AS max_updated, COUNT(*) AS total_count FROM products WHERE status = 'publish'";
                $etagParams = [];

                if (!empty($category) && $category !== 'all') {
                    $etagSql .= " AND category = ?";
                    $etagParams[] = $category;
                }
                if (!empty($brand) && $brand !== 'all') {
                    $etagSql .= " AND brand = ?";
                    $etagParams[] = $brand;
                }

                $stmtEtag = $db->prepare($etagSql);
                $stmtEtag->execute($etagParams);
                $etagMeta = $stmtEtag->fetch();

                $maxUpdated = $etagMeta['max_updated'] ?? 0;
                $totalCount = $etagMeta['total_count'] ?? 0;
                $filterHash = md5($category . '|' . $brand . '|' . $limit);
                $etag = sprintf('"udo-cat-%s-%s-%s"', $maxUpdated, $totalCount, substr($filterHash, 0, 8));

                header("ETag: {$etag}");

                $ifNoneMatch = trim($_SERVER['HTTP_IF_NONE_MATCH'] ?? '');
                if (!$noCache && !empty($ifNoneMatch) && ($ifNoneMatch === $etag || str_replace('-gzip', '', $ifNoneMatch) === $etag)) {
                    http_response_code(304);
                    return;
                }

                $sql = "SELECT id, data FROM products WHERE status = 'publish'";
                $params = [];

                if (!empty($category) && $category !== 'all') {
                    $sql .= " AND category = ?";
                    $params[] = $category;
                }

                if (!empty($brand) && $brand !== 'all') {
                    $sql .= " AND brand = ?";
                    $params[] = $brand;
                }

                $sql .= " ORDER BY sort_priority ASC, id ASC LIMIT " . (int)$limit;

                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                $rows = $stmt->fetchAll();

                $products = [];
                foreach ($rows as $r) {
                    if (!empty($r['data'])) {
                        $p = json_decode($r['data'], true);
                        if (is_array($p)) {
                            $p['id'] = $r['id'];
                            $products[] = $p;
                        }
                    }
                }

                echo json_encode($products, JSON_UNESCAPED_UNICODE);
                return;

            } catch (Throwable $e) {
                error_log('Public products API error: ' . $e->getMessage());
            }
        }

        // Fallback to static JSON if DB connection is unavailable
        $this->serveFallbackJson($id);
    }

    private function serveFallbackJson(string $targetId = ''): void
    {
        $jsonPath = __DIR__ . '/data/welding_products.json';
        if (!file_exists($jsonPath)) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Data source unavailable']);
            return;
        }

        $content = file_get_contents($jsonPath);
        if ($content === false) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Unable to read product data']);
            return;
        }

        if (!empty($targetId)) {
            $data = json_decode($content, true);
            if (is_array($data)) {
                foreach ($data as $p) {
                    if (($p['id'] ?? '') === $targetId) {
                        echo json_encode(['success' => true, 'product' => $p], JSON_UNESCAPED_UNICODE);
                        return;
                    }
                }
            }
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Product not found']);
            return;
        }

        echo $content;
    }
}

$service = new UdoPublicProductsService();
$service->handleRequest();
