-- =====================================================================
-- UDO E-Commerce CMS: Admin Authentication & Stock Audit Logging Schema
-- Target: MariaDB 10.6.13 / DirectAdmin Linux
-- Architecture: Native Modern PHP 8.1 (OOP, PDO Prepared Statements)
-- Strict GEMINI.md compliance: No frameworks, zero emojis
-- =====================================================================

-- 1. Admin Users Table (2-Tier Role Model: super_admin vs staff)
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(100) NOT NULL,
  `role` ENUM('super_admin', 'staff') NOT NULL DEFAULT 'staff',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL DEFAULT NULL,
  INDEX `idx_username` (`username`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Immutable Stock Audit Logs Table
CREATE TABLE IF NOT EXISTS `stock_audit_logs` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `timestamp` DATETIME NOT NULL,
  `admin_id` INT UNSIGNED NOT NULL,
  `admin_name` VARCHAR(100) NOT NULL,
  `admin_role` ENUM('super_admin', 'staff') NOT NULL,
  `action` VARCHAR(50) NOT NULL,
  `product_id` VARCHAR(64) NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `sku` VARCHAR(64) NOT NULL,
  `size` VARCHAR(64) DEFAULT NULL,
  `old_stock` INT NOT NULL,
  `new_stock` INT NOT NULL,
  `delta` INT NOT NULL,
  `reason` TEXT DEFAULT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  INDEX `idx_timestamp` (`timestamp`),
  INDEX `idx_admin_id` (`admin_id`),
  INDEX `idx_product_id` (`product_id`),
  INDEX `idx_action` (`action`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
