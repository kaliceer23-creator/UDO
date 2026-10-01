<?php
declare(strict_types=1);

/**
 * UDO E-Commerce CMS: Article SEO Server-Side Injector
 * Architecture: Native Modern PHP 8.1 (OOP, PDO)
 * Strict GEMINI.md compliance: No frameworks, zero emojis
 */

$slug = trim((string)($_GET['slug'] ?? ''));
$id = trim((string)($_GET['id'] ?? ''));

$title = 'บทความและสาระน่ารู้ - UDO';
$description = 'บทความ คู่มือช่าง และสาระความรู้งานเชื่อม เครื่องมืออุตสาหกรรม จากผู้เชี่ยวชาญ UDO';
$coverImage = '';

if (!empty($slug) || !empty($id)) {
    $jsonPath = __DIR__ . '/api/articles.json';
    if (file_exists($jsonPath)) {
        $raw = file_get_contents($jsonPath);
        $articles = json_decode($raw ?: '[]', true);
        if (is_array($articles)) {
            foreach ($articles as $art) {
                if ((!empty($slug) && ($art['slug'] ?? '') === $slug) || (!empty($id) && ($art['id'] ?? '') === $id)) {
                    $title = ($art['title'] ?? '') . ' - UDO เทคนิค & สาระงานช่าง';
                    $description = $art['excerpt'] ?? $art['meta_description'] ?? $description;
                    $coverImage = $art['cover_image'] ?? '';
                    break;
                }
            }
        }
    }
}

$htmlPath = __DIR__ . '/article.html';
if (!file_exists($htmlPath)) {
    http_response_code(404);
    echo 'Article page template not found';
    exit;
}

$html = file_get_contents($htmlPath);

// Inject dynamic title and meta
$html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</title>', $html, 1);
$html = preg_replace('/<meta name="description" content=".*?" \/>/i', '<meta name="description" content="' . htmlspecialchars($description, ENT_QUOTES, 'UTF-8') . '" />', $html, 1);

if (!empty($coverImage)) {
    $ogTags = "\n    <meta property=\"og:title\" content=\"" . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . "\" />"
            . "\n    <meta property=\"og:description\" content=\"" . htmlspecialchars($description, ENT_QUOTES, 'UTF-8') . "\" />"
            . "\n    <meta property=\"og:image\" content=\"" . htmlspecialchars($coverImage, ENT_QUOTES, 'UTF-8') . "\" />";
    $html = str_replace('</head>', $ogTags . "\n  </head>", $html);
}

echo $html;
