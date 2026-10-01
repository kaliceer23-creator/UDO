<?php
declare(strict_types=1);

/**
 * UDO E-Commerce CMS: Public Articles REST API
 * Serves real-time technical articles directly from MariaDB 10.6.13 Document-Store Table
 * Architecture: Native Modern PHP 8.1 (OOP, PDO Prepared Statements)
 * Strict GEMINI.md compliance: No frameworks, zero emojis, pure JSON
 */

require_once __DIR__ . '/config.php';

class UdoPublicArticlesService
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
        header('Cache-Control: public, max-age=60');

        $slug = trim((string)($_GET['slug'] ?? ''));
        $id = trim((string)($_GET['id'] ?? ''));
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;
        $category = trim((string)($_GET['category'] ?? ''));
        $search = trim((string)($_GET['q'] ?? $_GET['search'] ?? ''));
        $noCache = !empty($_GET['nocache']) || !empty($_GET['t']) || !empty($_GET['v']);

        $db = $this->getDbConnection();

        if ($db !== null) {
            try {
                // 1. Single article lookup by slug or id
                if (!empty($slug) || !empty($id)) {
                    $sql = !empty($slug)
                        ? "SELECT id, slug, title, category, UNIX_TIMESTAMP(updated_at) AS updated_ts, data FROM articles WHERE slug = ? AND status = 'published' LIMIT 1"
                        : "SELECT id, slug, title, category, UNIX_TIMESTAMP(updated_at) AS updated_ts, data FROM articles WHERE id = ? AND status = 'published' LIMIT 1";
                    
                    $param = !empty($slug) ? $slug : $id;
                    $stmt = $db->prepare($sql);
                    $stmt->execute([$param]);
                    $row = $stmt->fetch();

                    if ($row && !empty($row['data'])) {
                        $etag = sprintf('"%s-%s"', $row['id'], $row['updated_ts'] ?? 0);
                        header("ETag: {$etag}");

                        $ifNoneMatch = trim($_SERVER['HTTP_IF_NONE_MATCH'] ?? '');
                        if (!$noCache && !empty($ifNoneMatch) && ($ifNoneMatch === $etag || str_replace('-gzip', '', $ifNoneMatch) === $etag)) {
                            http_response_code(304);
                            return;
                        }

                        $articleData = json_decode($row['data'], true);
                        if (!is_array($articleData)) {
                            $articleData = [];
                        }
                        $articleData['id'] = $row['id'];
                        $articleData['slug'] = $row['slug'];
                        $articleData['title'] = $row['title'];
                        $articleData['category'] = $row['category'];

                        echo json_encode([
                            'success' => true,
                            'article' => $articleData
                        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                        return;
                    } else {
                        http_response_code(404);
                        echo json_encode(['success' => false, 'error' => 'Article not found'], JSON_UNESCAPED_UNICODE);
                        return;
                    }
                }

                // 2. List articles lookup
                $query = "SELECT id, slug, title, category, sort_priority, UNIX_TIMESTAMP(updated_at) AS updated_ts, data FROM articles WHERE status = 'published'";
                $params = [];

                if (!empty($category)) {
                    $query .= " AND category = ?";
                    $params[] = $category;
                }

                if (!empty($search)) {
                    $query .= " AND (title LIKE ? OR slug LIKE ?)";
                    $params[] = "%{$search}%";
                    $params[] = "%{$search}%";
                }

                $query .= " ORDER BY sort_priority ASC, created_at DESC";

                if ($limit > 0) {
                    $query .= " LIMIT " . (int)$limit;
                }

                $stmt = $db->prepare($query);
                $stmt->execute($params);
                $rows = $stmt->fetchAll();

                $articles = [];
                $latestTs = 0;

                foreach ($rows as $r) {
                    $ts = (int)($r['updated_ts'] ?? 0);
                    if ($ts > $latestTs) {
                        $latestTs = $ts;
                    }

                    $data = json_decode($r['data'] ?? '{}', true);
                    if (!is_array($data)) {
                        $data = [];
                    }

                    $articles[] = [
                        'id' => $r['id'],
                        'slug' => $r['slug'],
                        'title' => $r['title'],
                        'category' => $r['category'],
                        'sort_priority' => (int)$r['sort_priority'],
                        'excerpt' => $data['excerpt'] ?? '',
                        'cover_image' => $data['cover_image'] ?? '',
                        'read_time_minutes' => $data['read_time_minutes'] ?? 3,
                        'author' => $data['author'] ?? 'UDO Technical Team',
                        'tags' => $data['tags'] ?? [],
                        'created_at' => $data['created_at'] ?? '',
                        'blocks_count' => isset($data['content_blocks']) && is_array($data['content_blocks']) ? count($data['content_blocks']) : 0
                    ];
                }

                $count = count($articles);
                $etag = sprintf('"%d-%d-%d"', $latestTs, $count, crc32(json_encode($params)));
                header("ETag: {$etag}");

                $ifNoneMatch = trim($_SERVER['HTTP_IF_NONE_MATCH'] ?? '');
                if (!$noCache && !empty($ifNoneMatch) && ($ifNoneMatch === $etag || str_replace('-gzip', '', $ifNoneMatch) === $etag)) {
                    http_response_code(304);
                    return;
                }

                echo json_encode([
                    'success' => true,
                    'total' => $count,
                    'articles' => $articles
                ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                return;

            } catch (Throwable $e) {
                // If table is not created or DB error, fall through to static JSON fallback
            }
        }

        // 3. Static JSON Fallback when MariaDB table is offline or empty
        $jsonPath = __DIR__ . '/articles.json';
        if (file_exists($jsonPath)) {
            $raw = file_get_contents($jsonPath);
            $allArticles = json_decode($raw ?: '[]', true);
            if (!is_array($allArticles)) {
                $allArticles = [];
            }

            // Single lookup in static file
            if (!empty($slug) || !empty($id)) {
                $found = null;
                foreach ($allArticles as $art) {
                    if (!empty($slug) && ($art['slug'] ?? '') === $slug) {
                        $found = $art;
                        break;
                    }
                    if (!empty($id) && ($art['id'] ?? '') === $id) {
                        $found = $art;
                        break;
                    }
                }

                if ($found) {
                    echo json_encode([
                        'success' => true,
                        'article' => $found,
                        'source' => 'static_fallback'
                    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'error' => 'Article not found in static fallback'], JSON_UNESCAPED_UNICODE);
                }
                return;
            }

            // List in static file
            $filtered = [];
            foreach ($allArticles as $art) {
                if (($art['status'] ?? 'published') !== 'published') {
                    continue;
                }
                if (!empty($category) && ($art['category'] ?? '') !== $category) {
                    continue;
                }
                if (!empty($search)) {
                    $needle = mb_strtolower($search, 'UTF-8');
                    $haystack = mb_strtolower(($art['title'] ?? '') . ' ' . ($art['slug'] ?? ''), 'UTF-8');
                    if (mb_strpos($haystack, $needle) === false) {
                        continue;
                    }
                }

                $filtered[] = [
                    'id' => $art['id'] ?? '',
                    'slug' => $art['slug'] ?? '',
                    'title' => $art['title'] ?? '',
                    'category' => $art['category'] ?? 'เทคนิค & สาระงานช่าง',
                    'sort_priority' => $art['sort_priority'] ?? 100,
                    'excerpt' => $art['excerpt'] ?? '',
                    'cover_image' => $art['cover_image'] ?? '',
                    'read_time_minutes' => $art['read_time_minutes'] ?? 3,
                    'author' => $art['author'] ?? 'UDO Technical Team',
                    'tags' => $art['tags'] ?? [],
                    'created_at' => $art['created_at'] ?? '',
                    'blocks_count' => isset($art['content_blocks']) && is_array($art['content_blocks']) ? count($art['content_blocks']) : 0
                ];
            }

            if ($limit > 0) {
                $filtered = array_slice($filtered, 0, $limit);
            }

            echo json_encode([
                'success' => true,
                'total' => count($filtered),
                'articles' => $filtered,
                'source' => 'static_fallback'
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            return;
        }

        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Articles data source unavailable'], JSON_UNESCAPED_UNICODE);
    }
}

$service = new UdoPublicArticlesService();
$service->handleRequest();
