<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

/**
 * UdoAiSearchService
 * 
 * Native PHP 8.1 REST API Service for Pure AI-Powered Search Overview & Multi-Turn Chat
 * Architecture: Clean OOP, PDO, strict security, returns 100% pure JSON.
 * Follows GEMINI.md directives:
 * - Pure Native Modern PHP 8.1 (OOP, PDO)
 * - Zero frameworks
 * - Absolutely NO emojis in source code, comments, or output
 * - 100% Pure AI Semantic Reasoning & Multi-turn History Forwarding
 */
class UdoAiSearchService
{
    private ?PDO $db = null;
    private string $apiKey;
    private string $model;
    private string $cloudRunUrl;

    public function __construct(
        string $apiKey = GEMINI_API_KEY,
        string $model = GEMINI_MODEL,
        string $cloudRunUrl = CLOUD_RUN_URL
    ) {
        $this->apiKey = $apiKey;
        $this->model = $model;
        $this->cloudRunUrl = rtrim($cloudRunUrl, '/');
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
     * Sanitize user search input
     */
    public function sanitizeQuery(string $input): string
    {
        $clean = trim($input);
        $clean = strip_tags($clean);
        if (mb_strlen($clean) > 200) {
            $clean = mb_substr($clean, 0, 200);
        }
        return $clean;
    }

    /**
     * Main dispatch method
     */
    public function process(string $query, array $history = []): array
    {
        @set_time_limit(60);
        $sanitized = $this->sanitizeQuery($query);

        if ($sanitized === '') {
            return [
                'success' => false,
                'error' => 'Query parameter cannot be empty.',
            ];
        }

        // 1. Check local MariaDB cache (only for single-turn queries without conversation history)
        if (empty($history)) {
            $cached = $this->checkCache($sanitized);
            if ($cached !== null) {
                return [
                    'success' => true,
                    'source' => 'cache',
                    'data' => $cached,
                ];
            }
        }

        // 2. Forward request to Google Cloud Run AI Microservice (Vertex AI Gemini)
        if ($this->cloudRunUrl !== '') {
            $cloudRunResult = $this->callCloudRunService($sanitized, $history);
            if ($cloudRunResult !== null) {
                if (empty($history)) {
                    $this->saveCache($sanitized, $cloudRunResult);
                }
                return [
                    'success' => true,
                    'source' => 'cloud_run_vertex_ai',
                    'data' => $cloudRunResult,
                ];
            }
        }

        // 3. Fallback: Call direct Gemini API if key is available
        if ($this->apiKey !== '') {
            $geminiResult = $this->callGeminiApi($sanitized, $history);
            if ($geminiResult !== null) {
                if (empty($history)) {
                    $this->saveCache($sanitized, $geminiResult);
                }
                return [
                    'success' => true,
                    'source' => 'gemini_direct',
                    'data' => $geminiResult,
                ];
            }
        }

        // 4. Circuit Breaker: When AI services are unavailable
        return [
            'success' => false,
            'error' => 'AI overview service is temporarily unavailable. Please browse products via direct search.',
            'circuit_breaker' => true,
            'data' => [
                'query' => $sanitized,
                'is_out_of_scope' => false,
                'related_category' => null,
                'matched_products' => [],
                'markdown' => '',
                'citations' => [],
                'followUps' => []
            ]
        ];
    }

    /**
     * Check cache in MariaDB
     */
    private function checkCache(string $query): ?array
    {
        $db = $this->getDbConnection();
        if (!$db) {
            return null;
        }

        try {
            $stmt = $db->prepare('SELECT response_json FROM ai_search_cache WHERE query_hash = :hash AND expires_at > NOW() LIMIT 1');
            $stmt->execute([':hash' => md5(mb_strtolower($query))]);
            $row = $stmt->fetch();
            if ($row && !empty($row['response_json'])) {
                $decoded = json_decode((string)$row['response_json'], true);
                if (is_array($decoded)) {
                    return $decoded;
                }
            }
        } catch (Throwable $e) {
            // Ignore cache read failures gracefully
        }
        return null;
    }

    /**
     * Save successful response to cache
     */
    private function saveCache(string $query, array $data): void
    {
        $db = $this->getDbConnection();
        if (!$db) {
            return;
        }

        try {
            $db->exec('CREATE TABLE IF NOT EXISTS ai_search_cache (
                query_hash VARCHAR(32) PRIMARY KEY,
                query_text VARCHAR(255) NOT NULL,
                response_json MEDIUMTEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 7 DAY)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');

            $stmt = $db->prepare('INSERT INTO ai_search_cache (query_hash, query_text, response_json, expires_at)
                VALUES (:hash, :query, :json, NOW() + INTERVAL 7 DAY)
                ON DUPLICATE KEY UPDATE response_json = VALUES(response_json), expires_at = VALUES(expires_at)');
            $stmt->execute([
                ':hash' => md5(mb_strtolower($query)),
                ':query' => $query,
                ':json' => json_encode($data, JSON_UNESCAPED_UNICODE),
            ]);
        } catch (Throwable $e) {
            // Ignore cache write failures gracefully
        }
    }

    /**
     * Call Google Cloud Run AI Microservice with optional conversation history
     */
    private function callCloudRunService(string $query, array $history = []): ?array
    {
        $url = $this->cloudRunUrl . '/api/ai-search';
        $payload = json_encode([
            'q' => $query,
            'history' => $history
        ], JSON_UNESCAPED_UNICODE);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 45,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Accept: application/json',
                'User-Agent: UDO-PHP-Gateway/1.0'
            ],
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && is_string($response)) {
            $parsed = json_decode($response, true);
            if (isset($parsed['data']) && is_array($parsed['data'])) {
                return $parsed['data'];
            }
            if (isset($parsed['lead']) || isset($parsed['markdown'])) {
                return $parsed;
            }
        }
        return null;
    }

    /**
     * Call Google Gemini REST API Direct (Backup if Cloud Run is unreachable)
     */
    private function callGeminiApi(string $query, array $history = []): ?array
    {
        $url = sprintf(
            'https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s',
            urlencode($this->model),
            urlencode($this->apiKey)
        );

        $systemInstruction = "You are UDO AI, an industrial welding and hardware specialist for UDO (บริษัท ยู.ดี.โอ. เทรดดิ้ง จำกัด).\n" .
            "SCOPE GUARDRAIL:\n" .
            "If the inquiry is unrelated to welding, cutting, industrial tools, gas equipment, abrasives, chemicals, hardware, safety, or engineering products and services provided by UDO (e.g. food, recipes, entertainment, politics), set 'is_out_of_scope': true, and output strictly 'ฉันไม่สามารถช่วยเหลือในเรื่องนี้ได้', set 'related_category': null, 'matched_products': [], 'citations': [], 'followUps': [].\n\n" .
            "UDO MASTER CATALOG TAXONOMY:\n" .
            "- cat-389: อุปกรณ์เซฟตี้ (Safety & PPE, auto-darkening helmets, OPTECH)\n" .
            "- cat-398: เครื่องมือช่าง (Power tools, cordless drills, EMTOP)\n" .
            "- cat-312: อุปกรณ์เชื่อมตัดเผาแก๊ส (Gas cutting torches, regulators, CHAMP)\n" .
            "- cat-327: ท่อบรรจุก๊าซ และวาล์ว (Gas cylinders, oxygen, argon)\n" .
            "- cat-339: เครื่องเชื่อมและเครื่องตัดพลาสม่า (Inverters, TIG, MIG, AUTOWEL)\n" .
            "- cat-344: อะไหล่สิ้นเปลือง เครื่องตัดพลาสม่า เครื่องเชื่อม (Contact tips, nozzles)\n" .
            "- cat-298: ใบตัดใบเจียร (Abrasives, cutting discs, NKK, SUPERCUT)\n" .
            "- cat-382: วัสดุอุปกรณ์เคมีภัณฑ์สำหรับงานเชื่อม (Chemicals, anti-spatter, WhaleSpray)\n" .
            "- cat-12: กลุ่มลวดเชื่อม (Welding consumables, cat-263 stainless, cat-265 cast iron)\n\n" .
            "Absolutely NO emojis. Return pure JSON matching schema.";

        $contents = [];
        if (!empty($history)) {
            $recent = array_slice($history, -4);
            foreach ($recent as $h) {
                $role = ($h['role'] ?? '') === 'assistant' || ($h['role'] ?? '') === 'model' ? 'model' : 'user';
                $text = $h['text'] ?? $h['content'] ?? '';
                if ($text !== '') {
                    $contents[] = [
                        'role' => $role,
                        'parts' => [['text' => mb_substr((string)$text, 0, 1000)]]
                    ];
                }
            }
        }
        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $query]]
        ];

        $payload = [
            'system_instruction' => [
                'parts' => [
                    ['text' => $systemInstruction]
                ]
            ],
            'contents' => $contents,
            'generationConfig' => [
                'response_mime_type' => 'application/json',
                'temperature' => 0.2,
                'maxOutputTokens' => 2048,
            ]
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_TIMEOUT => 25,
            CURLOPT_CONNECTTIMEOUT => 6,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && is_string($response)) {
            $parsed = json_decode($response, true);
            $candidateText = $parsed['candidates'][0]['content']['parts'][0]['text'] ?? null;
            if ($candidateText) {
                $decodedJson = json_decode($candidateText, true);
                if (is_array($decodedJson)) {
                    $decodedJson['query'] = $query;
                    return $decodedJson;
                }
            }
        }

        return null;
    }
}

// Execute REST API Endpoint
handleCorsAndHeaders();

$query = $_GET['q'] ?? '';
$history = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $postData = json_decode((string)$rawInput, true);
    if (is_array($postData)) {
        $query = $postData['q'] ?? $query;
        $history = isset($postData['history']) && is_array($postData['history']) ? $postData['history'] : [];
    }
}

$service = new UdoAiSearchService();
$result = $service->process((string)$query, $history);

if (!($result['success'] ?? false) && !($result['circuit_breaker'] ?? false)) {
    http_response_code(400);
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
exit;
