<?php
declare(strict_types=1);

/**
 * UDO E-Commerce CMS: Admin Articles REST API
 * Handles CRUD operations, status toggling, and story blocks storage for technical articles.
 * Architecture: Native Modern PHP 8.1 (OOP, PDO Prepared Statements, Dual JSON sync)
 * Strict GEMINI.md compliance: No frameworks, zero emojis, pure JSON
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/auth.php';

class UdoAdminArticlesService
{
    private ?PDO $db = null;
    private string $jsonFilePath;

    public function __construct()
    {
        $this->jsonFilePath = dirname(__DIR__) . '/articles.json';
    }

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

    private function loadArticlesFromJson(): array
    {
        if (file_exists($this->jsonFilePath)) {
            $raw = file_get_contents($this->jsonFilePath);
            $data = json_decode($raw ?: '[]', true);
            if (is_array($data)) {
                return $data;
            }
        }
        return [];
    }

    private function saveArticlesToJson(array $articles): bool
    {
        $encoded = json_encode($articles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        return file_put_contents($this->jsonFilePath, $encoded) !== false;
    }

    public function handleRequest(): void
    {
        handleCorsAndHeaders();

        $adminContext = getAuthenticatedAdminContext();
        if (empty($adminContext['admin_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Unauthorized: Admin authentication required'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $action = trim((string)($_GET['action'] ?? ''));

        if ($method === 'GET') {
            $this->handleGetList();
            return;
        }

        if ($method === 'POST') {
            $rawInput = file_get_contents('php://input');
            $payload = json_decode($rawInput ?: '{}', true) ?: [];

            $effectiveAction = !empty($payload['action']) ? (string)$payload['action'] : $action;

            switch ($effectiveAction) {
                case 'create':
                    $this->handleCreateArticle($payload);
                    break;
                case 'update':
                    $this->handleUpdateArticle($payload);
                    break;
                case 'delete':
                    $this->handleDeleteArticle($payload);
                    break;
                case 'toggle_status':
                    $this->handleToggleStatus($payload);
                    break;
                default:
                    if (!empty($payload['id'])) {
                        $this->handleUpdateArticle($payload);
                    } else {
                        $this->handleCreateArticle($payload);
                    }
                    break;
            }
            return;
        }

        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method Not Allowed'], JSON_UNESCAPED_UNICODE);
    }

    private function handleGetList(): void
    {
        $id = trim((string)($_GET['id'] ?? ''));
        $search = trim((string)($_GET['q'] ?? $_GET['search'] ?? ''));
        $category = trim((string)($_GET['category'] ?? ''));
        $status = trim((string)($_GET['status'] ?? ''));

        $articles = [];
        $db = $this->getDbConnection();

        if ($db !== null) {
            try {
                if (!empty($id)) {
                    $stmt = $db->prepare("SELECT id, slug, title, category, status, sort_priority, data, created_at, updated_at FROM articles WHERE id = ? LIMIT 1");
                    $stmt->execute([$id]);
                    $row = $stmt->fetch();
                    if ($row && !empty($row['data'])) {
                        $art = json_decode($row['data'], true);
                        if (is_array($art)) {
                            $art['id'] = $row['id'];
                            $art['slug'] = $row['slug'];
                            $art['title'] = $row['title'];
                            $art['category'] = $row['category'];
                            $art['status'] = $row['status'];
                            echo json_encode(['success' => true, 'article' => $art], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                            return;
                        }
                    }
                } else {
                    $query = "SELECT id, slug, title, category, status, sort_priority, data, created_at, updated_at FROM articles WHERE 1=1";
                    $params = [];

                    if (!empty($category)) {
                        $query .= " AND category = ?";
                        $params[] = $category;
                    }
                    if (!empty($status)) {
                        $query .= " AND status = ?";
                        $params[] = $status;
                    }
                    if (!empty($search)) {
                        $query .= " AND (title LIKE ? OR slug LIKE ?)";
                        $params[] = "%{$search}%";
                        $params[] = "%{$search}%";
                    }

                    $query .= " ORDER BY sort_priority ASC, created_at DESC";
                    $stmt = $db->prepare($query);
                    $stmt->execute($params);
                    $rows = $stmt->fetchAll();

                    foreach ($rows as $r) {
                        $data = json_decode($r['data'] ?? '{}', true) ?: [];
                        $data['id'] = $r['id'];
                        $data['slug'] = $r['slug'];
                        $data['title'] = $r['title'];
                        $data['category'] = $r['category'];
                        $data['status'] = $r['status'];
                        $data['sort_priority'] = (int)$r['sort_priority'];
                        $articles[] = $data;
                    }

                    echo json_encode([
                        'success' => true,
                        'total' => count($articles),
                        'articles' => $articles
                    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                    return;
                }
            } catch (Throwable $e) {
                // Fall back to JSON file
            }
        }

        // Fallback to JSON file
        $all = $this->loadArticlesFromJson();
        if (!empty($id)) {
            foreach ($all as $item) {
                if (($item['id'] ?? '') === $id) {
                    echo json_encode(['success' => true, 'article' => $item], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                    return;
                }
            }
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Article not found'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $filtered = [];
        foreach ($all as $item) {
            if (!empty($category) && ($item['category'] ?? '') !== $category) continue;
            if (!empty($status) && ($item['status'] ?? '') !== $status) continue;
            if (!empty($search)) {
                $needle = mb_strtolower($search, 'UTF-8');
                $haystack = mb_strtolower(($item['title'] ?? '') . ' ' . ($item['slug'] ?? ''), 'UTF-8');
                if (mb_strpos($haystack, $needle) === false) continue;
            }
            $filtered[] = $item;
        }

        echo json_encode([
            'success' => true,
            'total' => count($filtered),
            'articles' => $filtered,
            'source' => 'static_fallback'
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    private function handleCreateArticle(array $payload): void
    {
        $title = trim((string)($payload['title'] ?? ''));
        if (empty($title)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Title is required'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $id = 'art-' . time() . '-' . substr(bin2hex(random_bytes(4)), 0, 6);
        $slug = trim((string)($payload['slug'] ?? ''));
        if (empty($slug)) {
            $slug = 'article-' . time();
        }

        $now = date('Y-m-d H:i:s');
        $article = [
            'id' => $id,
            'slug' => $slug,
            'title' => $title,
            'category' => trim((string)($payload['category'] ?? 'เทคนิค & สาระงานช่าง')),
            'status' => in_array($payload['status'] ?? '', ['published', 'draft'], true) ? $payload['status'] : 'published',
            'excerpt' => trim((string)($payload['excerpt'] ?? '')),
            'cover_image' => trim((string)($payload['cover_image'] ?? '')),
            'read_time_minutes' => (int)($payload['read_time_minutes'] ?? 3),
            'author' => trim((string)($payload['author'] ?? 'UDO Technical Team')),
            'tags' => is_array($payload['tags'] ?? null) ? $payload['tags'] : [],
            'recommended_products' => is_array($payload['recommended_products'] ?? null) ? $payload['recommended_products'] : [],
            'meta_title' => trim((string)($payload['meta_title'] ?? $title)),
            'meta_description' => trim((string)($payload['meta_description'] ?? ($payload['excerpt'] ?? ''))),
            'content_blocks' => is_array($payload['content_blocks'] ?? null) ? $payload['content_blocks'] : [],
            'created_at' => $now,
            'updated_at' => $now
        ];

        // 1. Save to MariaDB
        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $stmt = $db->prepare("
                    INSERT INTO articles (id, slug, title, category, status, sort_priority, data, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, 100, ?, ?, ?)
                ");
                $stmt->execute([
                    $id,
                    $slug,
                    $title,
                    $article['category'],
                    $article['status'],
                    json_encode($article, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    $now,
                    $now
                ]);
            } catch (Throwable $e) {
                // Proceed to JSON update
            }
        }

        // 2. Sync to JSON master
        $all = $this->loadArticlesFromJson();
        array_unshift($all, $article);
        $this->saveArticlesToJson($all);

        echo json_encode([
            'success' => true,
            'message' => 'Article created successfully',
            'article' => $article
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    private function handleUpdateArticle(array $payload): void
    {
        $id = trim((string)($payload['id'] ?? ''));
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Article ID is required'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $all = $this->loadArticlesFromJson();
        $targetIndex = -1;
        $existing = null;

        foreach ($all as $idx => $art) {
            if (($art['id'] ?? '') === $id) {
                $targetIndex = $idx;
                $existing = $art;
                break;
            }
        }

        $now = date('Y-m-d H:i:s');
        $updated = $existing ?: ['id' => $id, 'created_at' => $now];

        if (isset($payload['title'])) $updated['title'] = trim((string)$payload['title']);
        if (isset($payload['slug'])) $updated['slug'] = trim((string)$payload['slug']);
        if (isset($payload['category'])) $updated['category'] = trim((string)$payload['category']);
        if (isset($payload['status'])) $updated['status'] = in_array($payload['status'], ['published', 'draft'], true) ? $payload['status'] : 'published';
        if (isset($payload['excerpt'])) $updated['excerpt'] = trim((string)$payload['excerpt']);
        if (isset($payload['cover_image'])) $updated['cover_image'] = trim((string)$payload['cover_image']);
        if (isset($payload['read_time_minutes'])) $updated['read_time_minutes'] = (int)$payload['read_time_minutes'];
        if (isset($payload['author'])) $updated['author'] = trim((string)$payload['author']);
        if (isset($payload['tags']) && is_array($payload['tags'])) $updated['tags'] = $payload['tags'];
        if (isset($payload['recommended_products']) && is_array($payload['recommended_products'])) $updated['recommended_products'] = $payload['recommended_products'];
        if (isset($payload['meta_title'])) $updated['meta_title'] = trim((string)$payload['meta_title']);
        if (isset($payload['meta_description'])) $updated['meta_description'] = trim((string)$payload['meta_description']);
        if (isset($payload['content_blocks']) && is_array($payload['content_blocks'])) $updated['content_blocks'] = $payload['content_blocks'];
        $updated['updated_at'] = $now;

        // 1. Update MariaDB
        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $stmt = $db->prepare("
                    INSERT INTO articles (id, slug, title, category, status, sort_priority, data, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, 100, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                        slug = VALUES(slug),
                        title = VALUES(title),
                        category = VALUES(category),
                        status = VALUES(status),
                        data = VALUES(data),
                        updated_at = VALUES(updated_at)
                ");
                $stmt->execute([
                    $id,
                    $updated['slug'] ?? 'article-' . $id,
                    $updated['title'] ?? '',
                    $updated['category'] ?? 'เทคนิค & สาระงานช่าง',
                    $updated['status'] ?? 'published',
                    json_encode($updated, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    $updated['created_at'] ?? $now,
                    $now
                ]);
            } catch (Throwable $e) {
                // Continue to JSON file update
            }
        }

        // 2. Sync to JSON file
        if ($targetIndex >= 0) {
            $all[$targetIndex] = $updated;
        } else {
            array_unshift($all, $updated);
        }
        $this->saveArticlesToJson($all);

        echo json_encode([
            'success' => true,
            'message' => 'Article updated successfully',
            'article' => $updated
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    private function handleDeleteArticle(array $payload): void
    {
        $id = trim((string)($payload['id'] ?? ''));
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Article ID is required'], JSON_UNESCAPED_UNICODE);
            return;
        }

        // 1. Delete from MariaDB
        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $stmt = $db->prepare("DELETE FROM articles WHERE id = ?");
                $stmt->execute([$id]);
            } catch (Throwable $e) {
                // Continue
            }
        }

        // 2. Delete from JSON file
        $all = $this->loadArticlesFromJson();
        $filtered = array_values(array_filter($all, fn($item) => ($item['id'] ?? '') !== $id));
        $this->saveArticlesToJson($filtered);

        echo json_encode([
            'success' => true,
            'message' => 'Article deleted successfully',
            'id' => $id
        ], JSON_UNESCAPED_UNICODE);
    }

    private function handleToggleStatus(array $payload): void
    {
        $id = trim((string)($payload['id'] ?? ''));
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Article ID is required'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $all = $this->loadArticlesFromJson();
        $newStatus = 'published';
        $targetIndex = -1;

        foreach ($all as $idx => $item) {
            if (($item['id'] ?? '') === $id) {
                $targetIndex = $idx;
                $current = $item['status'] ?? 'published';
                $newStatus = ($current === 'published') ? 'draft' : 'published';
                $all[$idx]['status'] = $newStatus;
                $all[$idx]['updated_at'] = date('Y-m-d H:i:s');
                break;
            }
        }

        // 1. Update MariaDB
        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $stmt = $db->prepare("
                    UPDATE articles 
                    SET status = ?, 
                        data = JSON_SET(data, '$.status', ?),
                        updated_at = NOW()
                    WHERE id = ?
                ");
                $stmt->execute([$newStatus, $newStatus, $id]);
            } catch (Throwable $e) {
                // Continue
            }
        }

        // 2. Save JSON file
        if ($targetIndex >= 0) {
            $this->saveArticlesToJson($all);
        }

        echo json_encode([
            'success' => true,
            'id' => $id,
            'status' => $newStatus,
            'message' => 'Status updated to ' . $newStatus
        ], JSON_UNESCAPED_UNICODE);
    }
}

$service = new UdoAdminArticlesService();
$service->handleRequest();
