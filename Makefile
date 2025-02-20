# Variables
BACKEND_DIR = ebank-backend
FRONTEND_DIR = ebank-frontend

DOCKER_IMAGE_NAME_TRANSACTION_SERVICE = ebank-transaction-service
DOCKER_IMAGE_NAME_RATE_SERVICE = ebank-rate-service
DOCKER_IMAGE_NAME_USER_SERVICE = ebank-user-service
DOCKER_IMAGE_NAME_FRONTEND = ebank-frontend
DOCKER_IMAGE_NAME_DATABASE = ebank-database

DOCKER_VOLUME_NAME_DATABASE = ebank-database-volume
DOCKER_VOLUME_NAME_LOG_FILES = ebank-logs-data

# Colors for terminal output
GREEN = \033[0;32m
NC = \033[0m # No Color
YELLOW = \033[1;33m
RED = \033[0;31m

.PHONY: help build clean docker-build docker-up docker-down

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  ${YELLOW}%-20s${NC} %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: build-backend build-frontend ## Build both backend and frontend projects

build-backend: ## Build the backend project
	@echo "${GREEN}Building backend...${NC}"
	@cd $(BACKEND_DIR) && ./mvnw clean install -DskipTests

build-frontend: ## Build the frontend project
	@echo "${GREEN}Building frontend...${NC}"
	@cd $(FRONTEND_DIR) && npm install && npm run build

clean: clean-backend clean-frontend clean-docker ## Clean both projects

clean-backend: ## Clean backend build files
	@echo "${GREEN}Cleaning backend...${NC}"
	@cd $(BACKEND_DIR) && ./mvnw clean

clean-frontend: ## Clean frontend build files
	@echo "${GREEN}Cleaning frontend...${NC}"
	@cd $(FRONTEND_DIR) && npm run clean

clean-docker: ## Clean Docker images
	@echo "${GREEN}Cleaning Docker images...${NC}"
	@docker rmi $(DOCKER_IMAGE_NAME_TRANSACTION_SERVICE)
	@docker rmi $(DOCKER_IMAGE_NAME_RATE_SERVICE)
	@docker rmi $(DOCKER_IMAGE_NAME_USER_SERVICE)
	@docker rmi $(DOCKER_IMAGE_NAME_FRONTEND)
	@docker rmi $(DOCKER_IMAGE_NAME_DATABASE)
	@docker volume rm $(DOCKER_VOLUME_NAME_DATABASE)
	@docker volume rm $(DOCKER_VOLUME_NAME_LOG_FILES)

docker-build: ## Build all Docker images
	@echo "${GREEN}Building Docker images...${NC}"
	@docker-compose build

docker-up: ## Start all containers
	@echo "${GREEN}Starting containers...${NC}"
	@docker-compose up -d
	@echo "${GREEN}Services are starting...${NC}"
	@echo "Frontend: http://localhost:8080"
	@echo "User Service: http://localhost:8081"
	@echo "Transaction Service: http://localhost:8082"
	@echo "Rate Service: http://localhost:8083"
	@echo "MySQL: localhost:3306"

docker-down: ## Stop all containers
	@echo "${GREEN}Stopping containers...${NC}"
	@docker-compose down

docker-logs: ## View container logs
	@echo "${GREEN}Showing container logs...${NC}"
	@docker-compose logs -f

docker-ps: ## List running containers
	@echo "${GREEN}Running containers:${NC}"
	@docker-compose ps

init: ## Initialize the project (first time setup)
	@echo "${GREEN}Initializing project...${NC}"
	@if [ ! -f "$(BACKEND_DIR)/mvnw" ]; then \
		echo "${RED}Error: Maven wrapper not found${NC}"; \
		exit 1; \
	fi
	@cd $(FRONTEND_DIR) && npm install --legacy-peer-deps
	@make build
	@echo "${GREEN}Project initialized successfully!${NC}" 