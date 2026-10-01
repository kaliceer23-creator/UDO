<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/auth.php';

/**
 * UdoAdminImageUploadService
 * 
 * Native PHP 8.1 REST API Service for Secure Product Image Uploads.
 * Conforms strictly to GEMINI.md Trojan Horse Strategy:
 * - Pure Native Modern PHP 8.1 (OOP)
 * - Zero frameworks
 * - Zero emojis in code, comments, or output
 * - Returns 100% pure JSON
 * - Security Pillar 3: Strict MIME inspection, size restriction, randomized naming
 */
class UdoAdminImageUploadService
{
    private const MAX_FILE_SIZE = 8388608; // 8 MB
    private const ALLOWED_MIME_TYPES = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
    ];

    private string $uploadRootDir;
    private string $publicUrlPrefix;

    public function __construct()
    {
        // Target: public_html/images/products/
        $this->uploadRootDir = dirname(__DIR__, 2) . '/images/products';
        $this->publicUrlPrefix = '/images/products';

        if (!is_dir($this->uploadRootDir)) {
            @mkdir($this->uploadRootDir, 0755, true);
        }
    }

    /**
     * Handle incoming upload or proxy request
     */
    public function handleUpload(): void
    {
        // Handle GET / HEAD proxy request for legacy images to bypass CORS
        if (in_array($_SERVER['REQUEST_METHOD'] ?? '', ['GET', 'HEAD'], true) && !empty($_GET['proxy_url'])) {
            $this->handleProxyImage((string)$_GET['proxy_url']);
            return;
        }

        // 1. Verify Authentication
        $adminContext = getAuthenticatedAdminContext();
        if (empty($adminContext['admin_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Unauthorized']);
            return;
        }

        // 2. Enforce POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
            return;
        }

        // 3. Process either multipart/form-data or Base64 JSON
        if (isset($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
            $this->processUploadedFile($_FILES['image']);
            return;
        }

        $rawBody = file_get_contents('php://input');
        if (!empty($rawBody)) {
            $json = json_decode($rawBody, true);
            if (is_array($json) && !empty($json['image_data'])) {
                $this->processBase64Payload((string)$json['image_data'], (string)($json['filename'] ?? ''));
                return;
            }
        }

        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'No image file or image_data provided'
        ]);
    }

    /**
     * Process standard multipart form-data upload
     */
    private function processUploadedFile(array $file): void
    {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Upload error code: ' . $file['error']]);
            return;
        }

        if ($file['size'] > self::MAX_FILE_SIZE) {
            http_response_code(413);
            echo json_encode(['success' => false, 'error' => 'File size exceeds maximum limit of 8 MB']);
            return;
        }

        // Inspect actual MIME type from binary header
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = $finfo ? finfo_file($finfo, $file['tmp_name']) : '';
        if ($finfo) finfo_close($finfo);

        if (!array_key_exists($mime, self::ALLOWED_MIME_TYPES)) {
            http_response_code(415);
            echo json_encode(['success' => false, 'error' => 'Invalid file format. Allowed: JPG, PNG, WebP. Received: ' . $mime]);
            return;
        }

        $ext = self::ALLOWED_MIME_TYPES[$mime];
        $destInfo = $this->prepareTargetFilePath($ext);

        if (!move_uploaded_file($file['tmp_name'], $destInfo['full_path'])) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file']);
            return;
        }

        $this->mirrorToFrontendDir($destInfo['sub_dir'], $destInfo['filename'], $destInfo['full_path']);

        echo json_encode([
            'success' => true,
            'image_url' => $destInfo['public_url'],
            'filename' => $destInfo['filename'],
            'size_bytes' => $file['size'],
            'mime_type' => $mime
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Process base64 encoded data URI (e.g. data:image/webp;base64,...)
     */
    private function processBase64Payload(string $base64String, string $clientFilename): void
    {
        // Expected format: data:image/webp;base64,xxxx...
        if (!preg_match('/^data:(image\/[a-zA-Z0-9\-\.\+]+);base64,(.+)$/', $base64String, $matches)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid base64 image format']);
            return;
        }

        $declaredMime = strtolower($matches[1]);
        $binaryData = base64_decode($matches[2], true);

        if ($binaryData === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Base64 decoding failed']);
            return;
        }

        $size = strlen($binaryData);
        if ($size > self::MAX_FILE_SIZE) {
            http_response_code(413);
            echo json_encode(['success' => false, 'error' => 'Image data exceeds maximum limit of 8 MB']);
            return;
        }

        // Validate true binary MIME type
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $actualMime = $finfo ? finfo_buffer($finfo, $binaryData) : $declaredMime;
        if ($finfo) finfo_close($finfo);

        if (!array_key_exists($actualMime, self::ALLOWED_MIME_TYPES)) {
            http_response_code(415);
            echo json_encode(['success' => false, 'error' => 'Invalid file format. Allowed: JPG, PNG, WebP. Received: ' . $actualMime]);
            return;
        }

        $ext = self::ALLOWED_MIME_TYPES[$actualMime];
        $destInfo = $this->prepareTargetFilePath($ext);

        if (file_put_contents($destInfo['full_path'], $binaryData, LOCK_EX) === false) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save base64 image data']);
            return;
        }

        $this->mirrorToFrontendDir($destInfo['sub_dir'], $destInfo['filename'], $destInfo['full_path']);

        echo json_encode([
            'success' => true,
            'image_url' => $destInfo['public_url'],
            'filename' => $destInfo['filename'],
            'size_bytes' => $size,
            'mime_type' => $actualMime
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Create date-based subdirectories and randomized unique filename
     */
    private function prepareTargetFilePath(string $ext): array
    {
        $yearMonth = date('Y') . '/' . date('m');
        $targetDir = $this->uploadRootDir . '/' . $yearMonth;

        if (!is_dir($targetDir)) {
            @mkdir($targetDir, 0755, true);
        }

        $randomHex = bin2hex(random_bytes(6));
        $timestamp = date('Ymd_His');
        $filename = "prod_{$timestamp}_{$randomHex}.{$ext}";

        $fullPath = $targetDir . '/' . $filename;
        $publicUrl = $this->publicUrlPrefix . '/' . $yearMonth . '/' . $filename;

        return [
            'sub_dir' => $yearMonth,
            'filename' => $filename,
            'full_path' => $fullPath,
            'public_url' => $publicUrl
        ];
    }

    /**
     * Mirror saved image to frontend/public for local dev server consistency
     */
    private function mirrorToFrontendDir(string $subDir, string $filename, string $sourcePath): void
    {
        $frontendImagesDir = dirname(__DIR__, 3) . '/frontend/public/images/products/' . $subDir;
        if (is_dir(dirname($frontendImagesDir))) {
            if (!is_dir($frontendImagesDir)) {
                @mkdir($frontendImagesDir, 0755, true);
            }
            @copy($sourcePath, $frontendImagesDir . '/' . $filename);
        }
    }

    /**
     * Stream legacy product images with CORS headers
     */
    public function handleProxyImage(string $url): void
    {
        $parsed = parse_url($url);
        $host = strtolower($parsed['host'] ?? '');
        if ($host !== 'www.udo.co.th' && $host !== 'udo.co.th') {
            http_response_code(403);
            echo 'Forbidden proxy target';
            return;
        }

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, 'UDO-Admin/1.0');
        $data = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        curl_close($ch);

        if ($status === 200 && $data !== false) {
            header('Content-Type: ' . ($contentType ?: 'image/jpeg'));
            header('Access-Control-Allow-Origin: *');
            header('Cache-Control: public, max-age=86400');
            echo $data;
            exit;
        }

        http_response_code(404);
        echo 'Image not found';
        exit;
    }
}

// Request Execution
handleCorsAndHeaders();

$service = new UdoAdminImageUploadService();
$service->handleUpload();
