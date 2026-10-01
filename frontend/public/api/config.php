<?php
declare(strict_types=1);

/**
 * UDO API Configuration
 * Client Specs: Linux, DirectAdmin, Apache, PHP 8.1, MariaDB 10.6.13
 * Rule: Pure Native Modern PHP (OOP, PDO). No frameworks. No emojis.
 */

// Error handling in development vs production
ini_set('display_errors', '0');
error_reporting(E_ALL);

// API Environment Settings
define('API_ENVIRONMENT', getenv('APP_ENV') ?: 'development');

// Gemini / Vertex AI Configuration
define('GEMINI_API_KEY', getenv('GEMINI_API_KEY') ?: '');
define('GEMINI_MODEL', 'gemini-3.5-flash-lite');

// Google Cloud Run Microservice URL (e.g. https://udo-ai-service-xxx.a.run.app)
define('CLOUD_RUN_URL', getenv('CLOUD_RUN_URL') ?: 'https://udo-ai-service-330377476882.asia-southeast1.run.app');

// Database Credentials (for MariaDB 10.6.13)
define('DB_HOST', getenv('DB_HOST') ?: 'udo_db');
define('DB_PORT', (int)(getenv('DB_PORT') ?: 3306));
define('DB_NAME', getenv('DB_NAME') ?: 'udo_db');
define('DB_USER', getenv('DB_USER') ?: 'udo_user');
define('DB_PASS', getenv('DB_PASS') ?: 'udo_password');
define('DB_CHARSET', 'utf8mb4');

// Auth Secret Key for HMAC Session Tokens
define('AUTH_SECRET_KEY', getenv('AUTH_SECRET_KEY') ?: 'udo_secure_hmac_secret_key_2026_industrial_tools');

/**
 * Handle CORS and Standard JSON Headers
 */
function handleCorsAndHeaders(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (!empty($origin)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
    } else {
        header("Access-Control-Allow-Origin: *");
    }

    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json; charset=utf-8');

    // Handle pre-flight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
