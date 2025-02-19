# E-Bank Financial Services

A Spring Boot microservices application for banking operations.

![EasyBank Logo](docs/images/logo-small.png)

## About EasyBank
EasyBank is a modern and secure digital banking platform designed to simplify financial transactions for users. Our mission is to provide a seamless, intuitive, and secure banking experience tailored to the needs of individuals and businesses.

## Why Choose EasyBank?
✔ **Secure Transactions** – End-to-end encryption and multi-factor authentication (MFA) ensure safety.  
✔ **Fast & Reliable** – Lightning-fast transactions and real-time account updates.  
✔ **User-Friendly Interface** – Intuitive design for smooth navigation.  
✔ **24/7 Access** – Manage your finances anytime, anywhere.  
✔ **Transparent Fees** – No hidden charges, clear and fair pricing.  

## Key Features
- **Account Management** – Open, view, and manage your bank accounts.  
- **Seamless Transfers** – Send and receive money securely.  
- **Bill Payments** – Pay your bills with ease.  
- **Investment & Savings** – Tools to help you save and invest smartly.  
- **Card Management** – Virtual and physical card options with instant control.  
- **AI-Powered Insights** – Get financial recommendations and spending analysis.  

## Business Model
EasyBank operates as a digital-first banking platform, partnering with financial institutions to provide seamless and legally compliant services. We focus on:
- Subscription-based premium features.
- Transaction-based revenue.
- Partnerships with fintech services for extended capabilities.

## Getting Started
To start using EasyBank:
1. **Sign Up** – Create an account through our app or website.
2. **Verify Identity** – Secure authentication process for safety.
3. **Link Your Bank** – Connect external accounts for easy transfers.
4. **Start Banking** – Enjoy seamless and secure financial services.

## Documentation & Tech Details
For developers and integrators, all technical specifications and API documentation are located in the [docs](docs/) folder.

## Contact & Support
For inquiries or support, please reach out to **support@e-bank.digital** or visit our [Help Center](https://e-bank.digital/support).

## Testing

The project uses JUnit 5 and Mockito for testing. Test configurations are set up in each module.

### Running Tests

To run all tests:

```bash
mvn clean test
```

To run tests for a specific module:
```bash
mvn clean test -pl ebank-user-services
mvn clean test -pl ebank-rate-services
mvn clean test -pl ebank-transaction-services
```

### Test Configuration

Each service module includes:
- Unit tests for service layer
- H2 in-memory database for testing
- Mock configurations using Mockito
- Test-specific properties in `application-test.properties`

### Test Dependencies

The project uses the following test dependencies:
- JUnit Jupiter 5.8.2
- Mockito 4.5.1
- Spring Boot Test Starter
- H2 Database (for testing)

## Development

### Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8+

### Building

```bash
mvn clean install
```

### Running

Each service can be run independently:

```bash
mvn spring-boot:run -pl ebank-user-services
mvn spring-boot:run -pl ebank-rate-services
mvn spring-boot:run -pl ebank-transaction-services
```

---

"Your finances, simplified. Make banking easy with EasyBank."
