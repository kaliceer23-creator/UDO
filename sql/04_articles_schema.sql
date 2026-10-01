-- =====================================================================
-- UDO E-Commerce CMS: Document-Store Articles Schema
-- Target: MariaDB 10.6.13 / DirectAdmin Linux
-- Architecture: Native Modern PHP 8.1 (OOP, PDO Prepared Statements)
-- Strict GEMINI.md compliance: No frameworks, zero emojis
-- =====================================================================

CREATE TABLE IF NOT EXISTS `articles` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(500) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'technical',
  `status` VARCHAR(32) NOT NULL DEFAULT 'published',
  `sort_priority` INT NOT NULL DEFAULT 999999,
  `data` JSON NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_category` (`category`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sort_priority` (`sort_priority`),
  INDEX `idx_title` (`title`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
