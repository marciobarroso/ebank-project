-- Initial data for Rate Service
USE `ebank-rate-services-db`;

-- Insert sample rates for different transaction types
INSERT INTO `rates` 
    (`type`, `rate`, `description`, `active`, `created_at`) 
VALUES 
    -- Deposit rates (0.5%, 1%, 1.5%)
    ('DEPOSIT', 0.0050, 'Base deposit fee', true, NOW()),
    ('DEPOSIT', 0.0100, 'Service deposit fee', true, NOW()),
    ('DEPOSIT', 0.0150, 'Premium deposit fee', true, NOW()),
    
    -- Withdrawal rates (1%, 1.5%, 2%)
    ('WITHDRAWAL', 0.0100, 'Base withdrawal fee', true, NOW()),
    ('WITHDRAWAL', 0.0150, 'Service withdrawal fee', true, NOW()),
    ('WITHDRAWAL', 0.0200, 'Premium withdrawal fee', true, NOW()),
    
    -- Transfer rates (1.5%, 2%, 2.5%)
    ('TRANSFER', 0.0150, 'Base transfer fee', true, NOW()),
    ('TRANSFER', 0.0200, 'Service transfer fee', true, NOW()),
    ('TRANSFER', 0.0250, 'Premium transfer fee', true, NOW());

-- Initial data for Transaction Service
USE `ebank-transaction-services-db`;

-- Insert sample pending transactions
INSERT INTO `transactions` 
    (`amount`, `calculated_fee`, `type`, `status`, `created_at`, `fee_calculation_metadata`, `fee_calculated_at`) 
VALUES 
    -- Regular transactions
    (100.00, 0.00, 'DEPOSIT', 'PENDING', NOW(), NULL, NULL),
    (200.00, 0.00, 'WITHDRAWAL', 'PENDING', NOW(), NULL, NULL),
    (150.00, 0.00, 'DEPOSIT', 'PENDING', NOW(), NULL, NULL),
    (300.00, 0.00, 'TRANSFER', 'PENDING', NOW(), NULL, NULL),
    (500.00, 0.00, 'DEPOSIT', 'PENDING', NOW(), NULL, NULL),
    
    -- Medium value transactions
    (750.00, 0.00, 'TRANSFER', 'PENDING', NOW(), NULL, NULL),
    (1000.00, 0.00, 'WITHDRAWAL', 'PENDING', NOW(), NULL, NULL),
    (2500.00, 0.00, 'TRANSFER', 'PENDING', NOW(), NULL, NULL),
    (5000.00, 0.00, 'DEPOSIT', 'PENDING', NOW(), NULL, NULL),
    
    -- High value transactions
    (10000.00, 0.00, 'WITHDRAWAL', 'PENDING', NOW(), NULL, NULL),
    (1500.00, 0.00, 'TRANSFER', 'PENDING', NOW(), NULL, NULL);