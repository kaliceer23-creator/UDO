<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/products.php';

/**
 * UdoAdminStockService
 * 
 * Native PHP 8.1 REST API Endpoint for Instant Inline Stock Updates.
 * Pure Native PHP (OOP, PDO Prepared Statements), strict GEMINI.md compliance.
 */
class UdoAdminStockService
{
    private UdoAdminProductsService $productsService;

    public function __construct()
    {
        $this->productsService = new UdoAdminProductsService();
    }

    public function handlePost(): void
    {
        $raw = file_get_contents('php://input');
        if (empty($raw)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Empty request body']);
            return;
        }

        $payload = json_decode($raw, true);
        if (!is_array($payload) || empty($payload['product_id']) || !isset($payload['new_stock'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing product_id or new_stock']);
            return;
        }

        $adminContext = getAuthenticatedAdminContext();
        $productId = (string)$payload['product_id'];
        $newStock = max(0, (int)$payload['new_stock']);
        $variantIndex = isset($payload['variant_index']) ? (int)$payload['variant_index'] : 0;
        $sku = (string)($payload['sku'] ?? '');
        $reason = trim((string)($payload['reason'] ?? 'Manual stock adjustment'));

        $allProducts = $this->productsService->loadProducts();
        $targetIndex = -1;

        foreach ($allProducts as $idx => $p) {
            if (($p['id'] ?? '') === $productId) {
                $targetIndex = $idx;
                break;
            }
        }

        if ($targetIndex === -1) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Product not found']);
            return;
        }

        $product = $allProducts[$targetIndex];
        $variants = $product['variants'] ?? [];
        if (empty($variants)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Product has no variants']);
            return;
        }

        // Locate variant by SKU or Index
        $vTargetIdx = $variantIndex;
        if (!empty($sku)) {
            foreach ($variants as $vIdx => $v) {
                if (($v['sku'] ?? '') === $sku) {
                    $vTargetIdx = $vIdx;
                    break;
                }
            }
        }

        if (!isset($variants[$vTargetIdx])) {
            $vTargetIdx = 0;
        }

        $oldStock = (int)($variants[$vTargetIdx]['stock'] ?? 0);
        $variants[$vTargetIdx]['stock'] = $newStock;

        // Recalculate is_in_stock
        $hasStock = false;
        foreach ($variants as $v) {
            if (((int)($v['stock'] ?? 0)) > 0) {
                $hasStock = true;
                break;
            }
        }

        $product['variants'] = $variants;
        $product['flags']['is_in_stock'] = $hasStock;
        if (($product['availability'] ?? '') !== 'special_order') {
            $product['availability'] = $hasStock ? 'in_stock' : 'out_of_stock';
        }

        $allProducts[$targetIndex] = $product;
        $saved = $this->productsService->saveProducts($allProducts);

        if (!$saved) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save stock update']);
            return;
        }

        // Record Audit Log
        $this->productsService->recordAuditLog([
            'action' => 'stock_adjustment',
            'product_id' => $productId,
            'product_name' => $product['name'] ?? '',
            'sku' => $variants[$vTargetIdx]['sku'] ?? '',
            'size' => $variants[$vTargetIdx]['size'] ?? '',
            'old_stock' => $oldStock,
            'new_stock' => $newStock,
            'delta' => $newStock - $oldStock,
            'reason' => $reason,
            'admin_id' => $adminContext['admin_id'],
            'admin_name' => $adminContext['admin_name'],
            'admin_role' => $adminContext['admin_role'],
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Stock updated successfully',
            'product_id' => $productId,
            'sku' => $variants[$vTargetIdx]['sku'] ?? '',
            'old_stock' => $oldStock,
            'new_stock' => $newStock,
            'delta' => $newStock - $oldStock,
            'is_in_stock' => $hasStock,
            'admin_name' => $adminContext['admin_name'],
            'admin_role' => $adminContext['admin_role']
        ], JSON_UNESCAPED_UNICODE);
    }
}

// Execute
handleCorsAndHeaders();
$stockService = new UdoAdminStockService();
$stockService->handlePost();
