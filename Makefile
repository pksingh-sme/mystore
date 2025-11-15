# Makefile for E-commerce Application

# Variables
DOCKER_COMPOSE = docker-compose
DOCKER_COMPOSE_PROD = docker-compose -f docker-compose.prod.yml
BACKEND_DIR = backend
FRONTEND_DIR = frontend

# Default target
.PHONY: help
help:
	@echo "E-commerce Application Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make setup              Setup the development environment"
	@echo "  make dev                Start development environment"
	@echo "  make dev-down           Stop development environment"
	@echo "  make prod               Start production environment"
	@echo "  make prod-down          Stop production environment"
	@echo "  make build              Build all Docker images"
	@echo "  make backend-dev        Start backend in development mode"
	@echo "  make frontend-dev       Start frontend in development mode"
	@echo "  make db-migrate         Run database migrations"
	@echo "  make db-seed            Seed database with initial data"
	@echo "  make test               Run all tests"
	@echo "  make lint               Run linter"
	@echo "  make clean              Remove Docker volumes and networks"

# Setup development environment
.PHONY: setup
setup:
	@echo "Setting up development environment..."
	cp -n .env.example .env 2>/dev/null || true
	cp -n $(BACKEND_DIR)/.env.example $(BACKEND_DIR)/.env 2>/dev/null || true
	$(DOCKER_COMPOSE) build
	@echo "Development environment setup complete!"

# Start development environment
.PHONY: dev
dev:
	@echo "Starting development environment..."
	$(DOCKER_COMPOSE) up --build

# Stop development environment
.PHONY: dev-down
dev-down:
	@echo "Stopping development environment..."
	$(DOCKER_COMPOSE) down

# Start production environment
.PHONY: prod
prod:
	@echo "Starting production environment..."
	$(DOCKER_COMPOSE_PROD) up --build

# Stop production environment
.PHONY: prod-down
prod-down:
	@echo "Stopping production environment..."
	$(DOCKER_COMPOSE_PROD) down

# Build all Docker images
.PHONY: build
build:
	@echo "Building Docker images..."
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE_PROD) build

# Start backend in development mode
.PHONY: backend-dev
backend-dev:
	@echo "Starting backend in development mode..."
	cd $(BACKEND_DIR) && npm run start:dev

# Start frontend in development mode
.PHONY: frontend-dev
frontend-dev:
	@echo "Starting frontend in development mode..."
	cd $(FRONTEND_DIR) && npm run dev

# Run database migrations
.PHONY: db-migrate
db-migrate:
	@echo "Running database migrations..."
	$(DOCKER_COMPOSE) exec backend npm run migration:run

# Seed database with initial data
.PHONY: db-seed
db-seed:
	@echo "Seeding database with initial data..."
	$(DOCKER_COMPOSE) exec backend npm run seed

# Run all tests
.PHONY: test
test:
	@echo "Running tests..."
	$(DOCKER_COMPOSE) exec backend npm run test
	$(DOCKER_COMPOSE) exec frontend npm run test

# Run linter
.PHONY: lint
lint:
	@echo "Running linter..."
	$(DOCKER_COMPOSE) exec backend npm run lint
	$(DOCKER_COMPOSE) exec frontend npm run lint

# Clean Docker volumes and networks
.PHONY: clean
clean:
	@echo "Cleaning Docker volumes and networks..."
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE_PROD) down -v
	docker network prune -f
	docker volume prune -f