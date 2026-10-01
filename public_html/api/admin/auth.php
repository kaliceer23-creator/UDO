<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';

/**
 * UdoAdminAuthService
 * 
 * Native Modern PHP 8.1 Authentication Service for Admin CMS.
 * Features:
 * - 2-Tier Role Model: super_admin vs staff
 * - Cryptographic HMAC-SHA256 Session Tokens
 * - Secure HTTP-Only Cookie Storage (Immune to client-side XSS tampering)
 * - Zero frameworks, Zero emojis
 * - 100% Pure JSON API
 */
class UdoAdminAuthService
{
    private ?PDO $db = null;
    private string $usersFilePath;
    private string $cookieName = 'udo_admin_session';

    public function __construct()
    {
        $this->usersFilePath = __DIR__ . '/../data/admin_users.json';
        $this->ensureSeedUsers();
    }

    /**
     * Lazy DB connection via PDO Prepared Statements
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
     * Load admin users from Master Storage
     */
    public function loadUsers(): array
    {
        // 1. Try MariaDB
        $db = $this->getDbConnection();
        if ($db !== null) {
            try {
                $stmt = $db->query("SELECT id, username, password_hash, display_name, role, is_active, created_at, last_login FROM admin_users");
                $rows = $stmt->fetchAll();
                if (!empty($rows)) {
                    return $rows;
                }
            } catch (Throwable $e) {
                // Table might not exist yet, fallback to JSON
            }
        }

        // 2. Fallback to JSON
        if (file_exists($this->usersFilePath)) {
            $content = file_get_contents($this->usersFilePath);
            if ($content) {
                $data = json_decode($content, true);
                if (is_array($data)) {
                    return $data;
                }
            }
        }

        return [];
    }

    /**
     * Persist admin users to storage
     */
    public function saveUsers(array $users): bool
    {
        $dir = dirname($this->usersFilePath);
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }

        $jsonText = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if ($jsonText === false) return false;

        $res = file_put_contents($this->usersFilePath, $jsonText, LOCK_EX);

        // Mirror to frontend public directory if it exists
        $mirrorPath = dirname(__DIR__, 2) . '/frontend/public/api/data/admin_users.json';
        if (file_exists(dirname($mirrorPath))) {
            @file_put_contents($mirrorPath, $jsonText, LOCK_EX);
        }

        return $res !== false;
    }

    /**
     * Ensure Initial Default Accounts exist (Super Admin & Staff)
     */
    private function ensureSeedUsers(): void
    {
        $users = $this->loadUsers();
        if (empty($users)) {
            $seedUsers = [
                [
                    'id' => 1,
                    'username' => 'admin',
                    'password_hash' => password_hash('udo@admin2026', PASSWORD_BCRYPT),
                    'display_name' => 'เจ้าของร้าน (Super Admin)',
                    'role' => 'super_admin',
                    'is_active' => 1,
                    'created_at' => date('Y-m-d H:i:s'),
                    'last_login' => null
                ],
                [
                    'id' => 2,
                    'username' => 'warehouse01',
                    'password_hash' => password_hash('staff@2026', PASSWORD_BCRYPT),
                    'display_name' => 'สมศักดิ์ คลังสินค้า 1',
                    'role' => 'staff',
                    'is_active' => 1,
                    'created_at' => date('Y-m-d H:i:s'),
                    'last_login' => null
                ]
            ];
            $this->saveUsers($seedUsers);

            // Also seed into MariaDB if table exists
            $db = $this->getDbConnection();
            if ($db !== null) {
                try {
                    $insertStmt = $db->prepare("
                        INSERT IGNORE INTO admin_users (id, username, password_hash, display_name, role, is_active, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    ");
                    foreach ($seedUsers as $u) {
                        $insertStmt->execute([
                            $u['id'],
                            $u['username'],
                            $u['password_hash'],
                            $u['display_name'],
                            $u['role'],
                            $u['is_active'],
                            $u['created_at']
                        ]);
                    }
                } catch (Throwable $e) {
                    // Suppress seeding error if table is not yet migrated
                }
            }
        }
    }

    /**
     * Base64URL Safe Encoding
     */
    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64URL Safe Decoding
     */
    private function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }

    /**
     * Generate Cryptographic HMAC-SHA256 Token
     */
    public function generateToken(array $user): string
    {
        $payload = [
            'uid' => (int)$user['id'],
            'username' => (string)$user['username'],
            'name' => (string)$user['display_name'],
            'role' => (string)$user['role'],
            'exp' => time() + (7 * 86400) // 7 days expiration
        ];

        $encodedPayload = $this->base64UrlEncode((string)json_encode($payload));
        $signature = hash_hmac('sha256', $encodedPayload, AUTH_SECRET_KEY);

        return $encodedPayload . '.' . $signature;
    }

    /**
     * Verify and Decode Token
     */
    public function verifyToken(?string $token): ?array
    {
        if (empty($token) || !str_contains($token, '.')) {
            return null;
        }

        [$encodedPayload, $signature] = explode('.', $token, 2);
        $expectedSignature = hash_hmac('sha256', $encodedPayload, AUTH_SECRET_KEY);

        if (!hash_equals($expectedSignature, $signature)) {
            return null;
        }

        $jsonText = $this->base64UrlDecode($encodedPayload);
        $payload = json_decode($jsonText, true);

        if (!is_array($payload) || empty($payload['uid']) || empty($payload['role'])) {
            return null;
        }

        if (isset($payload['exp']) && (int)$payload['exp'] < time()) {
            return null; // Expired
        }

        return $payload;
    }

    /**
     * Extract Currently Authenticated Admin from HTTP-Only Cookie or Authorization Header
     */
    public function getCurrentAdmin(): ?array
    {
        $token = $_COOKIE[$this->cookieName] ?? '';

        if (empty($token)) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
            if (str_starts_with($authHeader, 'Bearer ')) {
                $token = substr($authHeader, 7);
            }
        }

        return $this->verifyToken($token);
    }

    /**
     * Send HTTP-Only Cookie to Browser
     */
    private function setSessionCookie(string $token): void
    {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
        
        // PHP 8.1 setcookie with options array
        setcookie($this->cookieName, $token, [
            'expires' => time() + (7 * 86400),
            'path' => '/',
            'domain' => '',
            'secure' => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
    }

    /**
     * Clear Session Cookie from Browser
     */
    private function clearSessionCookie(): void
    {
        setcookie($this->cookieName, '', [
            'expires' => time() - 3600,
            'path' => '/',
            'domain' => '',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
    }

    /**
     * Handle Login Action
     */
    public function handleLogin(): void
    {
        $raw = file_get_contents('php://input');
        $payload = json_decode($raw ?: '{}', true);

        $username = trim((string)($payload['username'] ?? ''));
        $password = (string)($payload['password'] ?? '');

        if (empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน']);
            return;
        }

        $users = $this->loadUsers();
        $targetUser = null;

        foreach ($users as $u) {
            if (strcasecmp((string)$u['username'], $username) === 0 && !empty($u['is_active'])) {
                $targetUser = $u;
                break;
            }
        }

        if (!$targetUser || !password_verify($password, (string)$targetUser['password_hash'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง']);
            return;
        }

        // Issue secure HTTP-Only Token
        $token = $this->generateToken($targetUser);
        $this->setSessionCookie($token);

        // Update last login timestamp
        $now = date('Y-m-d H:i:s');
        foreach ($users as &$u) {
            if ($u['id'] === $targetUser['id']) {
                $u['last_login'] = $now;
                break;
            }
        }
        $this->saveUsers($users);

        echo json_encode([
            'success' => true,
            'message' => 'เข้าสู่ระบบสำเร็จ',
            'user' => [
                'id' => (int)$targetUser['id'],
                'username' => $targetUser['username'],
                'display_name' => $targetUser['display_name'],
                'role' => $targetUser['role']
            ]
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Handle Logout Action
     */
    public function handleLogout(): void
    {
        $this->clearSessionCookie();
        echo json_encode([
            'success' => true,
            'message' => 'ออกจากระบบเรียบร้อยแล้ว'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Handle 'me' (Current User State)
     */
    public function handleMe(): void
    {
        $admin = $this->getCurrentAdmin();
        if ($admin === null) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'authenticated' => false,
                'error' => 'ไม่ได้เข้าสู่ระบบ'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        echo json_encode([
            'success' => true,
            'authenticated' => true,
            'user' => [
                'id' => (int)$admin['uid'],
                'username' => $admin['username'],
                'display_name' => $admin['name'],
                'role' => $admin['role']
            ]
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Handle List Users (Super Admin Only)
     */
    public function handleListUsers(): void
    {
        $admin = $this->getCurrentAdmin();
        if (!$admin || $admin['role'] !== 'super_admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'เฉพาะผู้ดูแลระบบสูงสุด (Super Admin) เท่านั้นที่เข้าถึงได้']);
            return;
        }

        $users = $this->loadUsers();
        $safeUsers = array_map(function ($u) {
            return [
                'id' => (int)$u['id'],
                'username' => $u['username'],
                'display_name' => $u['display_name'],
                'role' => $u['role'],
                'is_active' => (bool)$u['is_active'],
                'created_at' => $u['created_at'],
                'last_login' => $u['last_login']
            ];
        }, $users);

        echo json_encode([
            'success' => true,
            'users' => $safeUsers
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Handle Create User (Super Admin Only)
     */
    public function handleCreateUser(): void
    {
        $admin = $this->getCurrentAdmin();
        if (!$admin || $admin['role'] !== 'super_admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'เฉพาะผู้ดูแลระบบสูงสุด (Super Admin) เท่านั้นที่สร้างบัญชีได้']);
            return;
        }

        $raw = file_get_contents('php://input');
        $payload = json_decode($raw ?: '{}', true);

        $username = trim((string)($payload['username'] ?? ''));
        $password = (string)($payload['password'] ?? '');
        $displayName = trim((string)($payload['display_name'] ?? ''));
        $role = trim((string)($payload['role'] ?? 'staff'));

        if (empty($username) || empty($password) || empty($displayName)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'กรุณากรอกข้อมูลให้ครบถ้วน']);
            return;
        }

        if (!in_array($role, ['super_admin', 'staff'], true)) {
            $role = 'staff';
        }

        $users = $this->loadUsers();
        foreach ($users as $u) {
            if (strcasecmp((string)$u['username'], $username) === 0) {
                http_response_code(409);
                echo json_encode(['success' => false, 'error' => 'ชื่อผู้ใช้งานนี้มีอยู่ในระบบแล้ว']);
                return;
            }
        }

        $newId = count($users) > 0 ? max(array_column($users, 'id')) + 1 : 1;
        $newUser = [
            'id' => $newId,
            'username' => $username,
            'password_hash' => password_hash($password, PASSWORD_BCRYPT),
            'display_name' => $displayName,
            'role' => $role,
            'is_active' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'last_login' => null
        ];

        $users[] = $newUser;
        $this->saveUsers($users);

        echo json_encode([
            'success' => true,
            'message' => "สร้างบัญชี {$displayName} เรียบร้อยแล้ว",
            'user' => [
                'id' => $newId,
                'username' => $username,
                'display_name' => $displayName,
                'role' => $role
            ]
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Global Middleware Helper for other endpoints (stock.php, products.php)
function getAuthenticatedAdminContext(): array
{
    $authService = new UdoAdminAuthService();
    $admin = $authService->getCurrentAdmin();

    if ($admin !== null) {
        return [
            'admin_id' => (int)$admin['uid'],
            'admin_name' => (string)$admin['name'],
            'admin_role' => (string)$admin['role']
        ];
    }

    // Default fallback if unauthenticated / offline
    return [
        'admin_id' => 1,
        'admin_name' => 'เจ้าของร้าน (Default)',
        'admin_role' => 'super_admin'
    ];
}

// Request Routing (Only execute when accessed directly)
$currentScript = $_SERVER['SCRIPT_FILENAME'] ?? '';
if (!empty($currentScript) && (realpath($currentScript) === realpath(__FILE__) || basename($currentScript) === 'auth.php')) {
    handleCorsAndHeaders();
    $service = new UdoAdminAuthService();
    $action = (string)($_GET['action'] ?? '');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if ($action === 'login') {
            $service->handleLogin();
        } elseif ($action === 'logout') {
            $service->handleLogout();
        } elseif ($action === 'create_user') {
            $service->handleCreateUser();
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid POST action']);
        }
    } else {
        if ($action === 'me') {
            $service->handleMe();
        } elseif ($action === 'users') {
            $service->handleListUsers();
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid GET action']);
        }
    }
}
