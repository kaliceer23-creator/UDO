<?php
declare(strict_types=1);

/**
 * UDO E-Commerce CMS: One-Time Product Migration Script
 * Migrates Master JSON (1,307 products) into MariaDB 10.6.13 Document-Store Table
 * Architecture: Native Modern PHP 8.1 (OOP, PDO Prepared Statements, Transactions)
 * Strict GEMINI.md compliance: No frameworks, zero emojis
 */

require_once __DIR__ . '/../config.php';

$jsonFile = __DIR__ . '/../data/welding_products.json';
if (!file_exists($jsonFile)) {
    echo json_encode(['success' => false, 'error' => "JSON file not found: {$jsonFile}"]);
    exit(1);
}

$content = file_get_contents($jsonFile);
$products = json_decode($content, true);
if (!is_array($products)) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON content']);
    exit(1);
}

try {
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', DB_HOST, DB_PORT, DB_NAME, DB_CHARSET);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Truncate table before migration to ensure clean state
    $pdo->exec("TRUNCATE TABLE products");

    $stmt = $pdo->prepare("
        INSERT INTO products 
        (id, sku, name, brand, category, status, availability, sort_priority, data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $pdo->beginTransaction();
    $count = 0;

    foreach ($products as $p) {
        $id = (string)($p['id'] ?? '');
        if (empty($id)) continue;

        $sku = !empty($p['sku']) ? (string)$p['sku'] : null;
        $name = (string)($p['name'] ?? '');
        $brand = !empty($p['brand']) ? (string)$p['brand'] : null;

        // Resolve primary category
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
            $id,
            $sku,
            $name,
            $brand,
            $category,
            $status,
            $availability,
            $sortPriority,
            $jsonData
        ]);
        $count++;
    }

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'migrated_count' => $count,
        'message' => "Successfully migrated {$count} products into MariaDB."
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";

} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
    exit(1);
}
