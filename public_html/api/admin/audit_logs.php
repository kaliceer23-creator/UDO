<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';

/**
 * UdoAdminAuditLogsService
 * 
 * Native PHP 8.1 REST API Endpoint for Stock Movement and Action Audit Logs.
 * Strictly adheres to GEMINI.md directives:
 * - Pure Native Modern PHP (OOP, PDO Prepared Statements)
 * - Zero frameworks, Zero emojis
 * - 100% Pure JSON output
 */
class UdoAdminAuditLogsService
{
    private ?PDO $db = null;
    private string $logFile;

    public function __construct()
    {
        $this->logFile = __DIR__ . '/inventory_logs.json';
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

    public function handleGet(): void
    {
        $q = trim((string)($_GET['q'] ?? ''));
        $role = trim((string)($_GET['role'] ?? 'all'));
        $action = trim((string)($_GET['action'] ?? 'all'));
        $limit = min(200, max(1, (int)($_GET['limit'] ?? 50)));
        $page = max(1, (int)($_GET['page'] ?? 1));
        $offset = ($page - 1) * $limit;

        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $where = [];
                $params = [];

                if ($role !== 'all' && !empty($role)) {
                    $where[] = 'admin_role = ?';
                    $params[] = $role;
                }

                if ($action !== 'all' && !empty($action)) {
                    $where[] = 'action = ?';
                    $params[] = $action;
                }

                if (!empty($q)) {
                    $where[] = '(product_name LIKE ? OR sku LIKE ? OR admin_name LIKE ? OR reason LIKE ?)';
                    $paramQ = "%{$q}%";
                    $params[] = $paramQ;
                    $params[] = $paramQ;
                    $params[] = $paramQ;
                    $params[] = $paramQ;
                }

                $whereSql = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

                // Count total matching
                $countStmt = $db->prepare("SELECT COUNT(*) FROM stock_audit_logs {$whereSql}");
                $countStmt->execute($params);
                $totalMatching = (int)$countStmt->fetchColumn();

                // Fetch paged records
                $dataSql = "SELECT * FROM stock_audit_logs {$whereSql} ORDER BY id DESC LIMIT {$limit} OFFSET {$offset}";
                $dataStmt = $db->prepare($dataSql);
                $dataStmt->execute($params);
                $rows = $dataStmt->fetchAll();

                echo json_encode([
                    'success' => true,
                    'source' => 'mariadb',
                    'total_logs' => $totalMatching,
                    'page' => $page,
                    'limit' => $limit,
                    'total_pages' => $limit > 0 ? (int)ceil($totalMatching / $limit) : 1,
                    'logs' => $rows
                ], JSON_UNESCAPED_UNICODE);
                return;
            } catch (Throwable $e) {
                // Fallback to JSON if table does not exist
            }
        }

        // Fallback: Read from JSON file
        $logs = [];
        if (file_exists($this->logFile)) {
            $content = file_get_contents($this->logFile);
            if ($content) {
                $decoded = json_decode($content, true);
                if (is_array($decoded)) {
                    $logs = $decoded;
                }
            }
        }

        // Filter JSON logs
        $filtered = array_values(array_filter($logs, function ($item) use ($q, $role, $action) {
            if ($role !== 'all' && !empty($role)) {
                $itemRole = (string)($item['admin_role'] ?? 'super_admin');
                if ($itemRole !== $role) return false;
            }

            if ($action !== 'all' && !empty($action)) {
                $itemAction = (string)($item['action'] ?? '');
                if ($itemAction !== $action) return false;
            }

            if (!empty($q)) {
                $qLower = mb_strtolower($q, 'UTF-8');
                $targetStr = mb_strtolower(implode(' ', [
                    (string)($item['product_name'] ?? ''),
                    (string)($item['sku'] ?? ''),
                    (string)($item['admin_name'] ?? ($item['admin_user'] ?? '')),
                    (string)($item['reason'] ?? ''),
                    (string)($item['action'] ?? '')
                ]), 'UTF-8');
                if (!str_contains($targetStr, $qLower)) return false;
            }

            return true;
        }));

        $totalMatching = count($filtered);
        $pagedLogs = array_slice($filtered, $offset, $limit);

        echo json_encode([
            'success' => true,
            'source' => 'json',
            'total_logs' => $totalMatching,
            'page' => $page,
            'limit' => $limit,
            'total_pages' => $limit > 0 ? (int)ceil($totalMatching / $limit) : 1,
            'logs' => $pagedLogs
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Execute
handleCorsAndHeaders();
$service = new UdoAdminAuditLogsService();
$service->handleGet();
