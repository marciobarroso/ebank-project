-- Create users and grant privileges
CREATE USER IF NOT EXISTS 'ebank-user-services'@'%' IDENTIFIED BY 'y6qL75Nn73Dp9NgE5HPSrbbiojiiMBhNYRneqAa7';
GRANT ALL PRIVILEGES ON `ebank-user-services-db`.* TO 'ebank-user-services'@'%';

CREATE USER IF NOT EXISTS 'ebank-transaction-services'@'%' IDENTIFIED BY 'y6qL75Nn73Dp9NgE5HPSrbbiojiiMBhNYRneqAa7';
GRANT ALL PRIVILEGES ON `ebank-transaction-services-db`.* TO 'ebank-transaction-services'@'%';

CREATE USER IF NOT EXISTS 'ebank-rate-services'@'%' IDENTIFIED BY 'y6qL75Nn73Dp9NgE5HPSrbbiojiiMBhNYRneqAa7';
GRANT ALL PRIVILEGES ON `ebank-rate-services-db`.* TO 'ebank-rate-services'@'%';

FLUSH PRIVILEGES; 