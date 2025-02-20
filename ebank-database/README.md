# E-Bank Database Module

This module contains the database initialization and schema files for the E-Bank application.

## Structure

- `init-scripts/` - Contains initialization scripts that run when the container starts
  - `01-create-databases.sql` - Creates the required databases
  - `02-create-tables.sql` - Creates necessary tables for each service
  - `03-create-users.sql` - Creates users and grants permissions
  - `04-insert-initial-data.sql` - Inserts initial test data
- `schema/` - Contains schema files for each service

## Building

The database image can be built using:

```bash
docker build -t ebank-database .
```

## Configuration

The database initialization is handled automatically when the container starts. The following environment variables can be configured:

- `MYSQL_ROOT_PASSWORD` - Root password for MySQL (default: root)

## Initialization Order

1. Creates required databases
2. Creates necessary tables
3. Creates service users and grants permissions
4. Inserts initial test data

## Test Data

The initial data includes:
- Sample rates for different transaction types
- Example transactions in pending status
- Test user accounts (password for all: Password123!)
  - john.doe@example.com
  - jane.smith@example.com
  - admin@ebank.digital 