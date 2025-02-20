# E-Bank Financial Services

A modern digital banking platform built to provide secure and efficient financial services through microservices architecture.

## About E-Bank

E-Bank is a comprehensive digital banking solution that offers a seamless banking experience for both individuals and businesses. Our platform is designed with security, reliability, and user experience in mind.

## Key Features

- 🔒 **Secure Transactions** - End-to-end encryption and robust security measures
- 💸 **Money Transfers** - Easy and instant transfers between accounts
- 💳 **Account Management** - Full control over your banking accounts
- 📊 **Rate Management** - Transparent fee structure and rate calculations
- 📱 **User-Friendly Interface** - Intuitive design for the best user experience
- 🔄 **Real-Time Updates** - Instant transaction processing and notifications

## Getting Started

### Prerequisites

Before running E-Bank, make sure you have the following installed:
- Docker and Docker Compose
- Make

### Quick Start with Make

1. Build all services:
```bash
make build
```

2. Start the application:
```bash
make docker-up
```

3. Access the services:
- Frontend: http://localhost:8080
- User Service API: http://localhost:8081
- Transaction Service API: http://localhost:8082
- Rate Service API: http://localhost:8083

4. To stop the application:
```bash
make docker-down
```

### Available Make Commands

- `make help` - Show all available commands
- `make build` - Build both backend and frontend
- `make clean` - Clean build files
- `make docker-build` - Build Docker images
- `make docker-up` - Start all containers
- `make docker-down` - Stop all containers
- `make docker-logs` - View container logs
- `make docker-ps` - List running containers

## Project Structure

- `ebank-backend/` - Backend microservices
  - `ebank-user-services/` - User management and authentication
  - `ebank-transaction-services/` - Transaction processing
  - `ebank-rate-services/` - Rate and fee management
  - `ebank-common/` - Shared utilities and configurations
- `ebank-frontend/` - Next.js frontend application

## API Documentation

Each service provides Swagger UI documentation:
- User Service: http://localhost:8081/swagger-ui.html
- Transaction Service: http://localhost:8082/swagger-ui.html
- Rate Service: http://localhost:8083/swagger-ui.html

## Support

For support and inquiries, please contact:
- Email: support@ebank.digital
- Website: https://e-bank.digital/support

## License

This project is proprietary software. All rights reserved.

---

"Your finances, simplified. Make banking easy with E-Bank."
