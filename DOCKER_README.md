# Docker Setup for E-commerce Application

This document provides instructions for setting up and running the e-commerce application using Docker.

## Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose

## Development Environment

### Starting the Development Environment

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   
3. Update the `.env` file with your specific configuration values.

4. Build and start the services:
   ```bash
   docker-compose up --build
   ```

5. Access the services:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - PostgreSQL: localhost:5432
   - PGAdmin: http://localhost:5050

### Stopping the Development Environment

To stop the services:
```bash
docker-compose down
```

To stop the services and remove volumes (data will be lost):
```bash
docker-compose down -v
```

## Production Environment

### Starting the Production Environment

1. Ensure you have a `.env` file with production values.

2. Build and start the services:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

## Environment Variables

The following environment variables can be configured in the `.env` file:

### Database Configuration
- `DB_HOST`: Database host (default: localhost)
- `DB_PORT`: Database port (default: 5432)
- `DB_USERNAME`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_NAME`: Database name (default: ecommerce)

### JWT Configuration
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRES_IN`: JWT token expiration time in seconds (default: 3600)

### Google OAuth Configuration
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_CALLBACK_URL`: Google OAuth callback URL

### Service Ports
- `BACKEND_PORT`: Port for the backend service (default: 3000)
- `FRONTEND_PORT`: Port for the frontend service (default: 5173)
- `PGADMIN_PORT`: Port for PGAdmin (default: 5050)

### URLs
- `FRONTEND_URL`: URL of the frontend application

## Services Overview

### PostgreSQL
- Image: postgres:15
- Container name: ecommerce-postgres
- Data is persisted in a Docker volume

### PGAdmin
- Image: dpage/pgadmin4
- Container name: ecommerce-pgadmin
- Default credentials: admin@example.com / admin

### Backend (NestJS)
- Image: Built from backend/Dockerfile.dev (development) or backend/Dockerfile (production)
- Container name: ecommerce-backend
- Runs in development mode with hot reloading

### Frontend (React/Vite)
- Image: Built from frontend/Dockerfile.dev (development) or frontend/Dockerfile (production)
- Container name: ecommerce-frontend
- Runs in development mode with hot reloading

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure no other services are using the same ports or change the port numbers in the `.env` file.

2. **Database connection failed**: Check that the database credentials in the `.env` file are correct.

3. **Permission denied errors**: On Linux, you might need to adjust file permissions or run Docker with appropriate user permissions.

### Useful Docker Commands

- View logs: `docker-compose logs <service-name>`
- Execute commands in a container: `docker-compose exec <service-name> <command>`
- List running containers: `docker-compose ps`
- Rebuild services: `docker-compose build`
- Force recreate containers: `docker-compose up --force-recreate`