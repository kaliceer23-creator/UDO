-- =====================================================================
-- UDO E-Commerce CMS: Document-Store Products Schema
-- Target: MariaDB 10.6.13 / DirectAdmin Linux
-- Architecture: Native Modern PHP 8.1 (OOP, PDO Prepared Statements)
-- Strict GEMINI.md compliance: No frameworks, zero emojis
-- =====================================================================

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `sku` VARCHAR(64) NULL,
  `name` VARCHAR(255) NOT NULL,
  `brand` VARCHAR(100) NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'other',
  `status` VARCHAR(32) NOT NULL DEFAULT 'publish',
  `availability` VARCHAR(32) NOT NULL DEFAULT 'in_stock',
  `sort_priority` INT NOT NULL DEFAULT 999999,
  `data` JSON NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sku` (`sku`),
  INDEX `idx_brand` (`brand`),
  INDEX `idx_category` (`category`),
  INDEX `idx_status` (`status`),
  INDEX `idx_availability` (`availability`),
  INDEX `idx_sort_priority` (`sort_priority`),
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
