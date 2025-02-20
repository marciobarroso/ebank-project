-- Create tables for Rate Service
USE `ebank-rate-services-db`;

CREATE TABLE IF NOT EXISTS `rates` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `type` ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT') NOT NULL,
    `rate` DECIMAL(5,4) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_rate_type` (`type`),
    INDEX `idx_rate_active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create tables for Transaction Service
USE `ebank-transaction-services-db`;

CREATE TABLE IF NOT EXISTS `transactions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(19,2) NOT NULL,
    `calculated_fee` DECIMAL(19,2) NOT NULL DEFAULT 0.00,
    `type` ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT') NOT NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'PROCESSED') NOT NULL DEFAULT 'PENDING',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `fee_calculation_metadata` JSON,
    `fee_calculated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    INDEX `idx_transaction_status` (`status`),
    INDEX `idx_transaction_type` (`type`),
    INDEX `idx_transaction_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create tables for User Service
USE `ebank-user-services-db`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `uk_user_email` (`email`),
    INDEX `idx_user_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 