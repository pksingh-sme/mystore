# ShopEase E-commerce Platform

A complete, production-grade full-stack e-commerce application built with modern technologies.

## 🚀 Features

### Frontend
- React with TypeScript
- Vite for fast development
- Tailwind CSS with custom design tokens
- shadcn/ui components
- Framer Motion animations
- Responsive design
- Light/Dark mode support

### Backend
- NestJS with TypeScript
- PostgreSQL database
- TypeORM for database operations
- JWT authentication with refresh tokens
- Google OAuth integration
- RESTful API design

### Pages
- Home Page
- Product Catalog
- Product Details
- Shopping Cart
- Checkout
- Order Confirmation
- Order History
- User Authentication (Login, Register, Forgot Password)
- User Profile
- Admin Panel
- Static Pages (About, Contact, FAQ, Privacy Policy, Terms & Conditions, Refund Policy, Shipping Policy)

## 🛠 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport.js

### Infrastructure
- Docker
- Docker Compose
- Nginx
- AWS (ECS, S3, CloudFront, RDS, Secrets Manager)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. Create environment files:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```

3. Update the environment variables in both `.env` files according to your needs.

### Running with Docker Compose (Recommended)

#### Development Mode

1. Start all services in development mode:
   ```bash
   docker-compose up --build
   ```

2. Access the applications:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - PGAdmin: http://localhost:5050

3. The development environment includes hot reloading for both frontend and backend.

#### Production Mode

1. Start all services in production mode:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. Access the applications:
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - Database: localhost:5432

### Running Locally

#### Frontend
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

#### Backend
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run start:dev
   ```

#### Database Setup

1. Make sure PostgreSQL is running on your system.
2. Create a database named `ecommerce`.
3. Update the database credentials in `backend/.env`.
4. Run database migrations:
   ```bash
   cd backend
   npm run migration:run
   ```

5. Seed initial data (optional):
   ```bash
   npm run seed
   ```

## 📁 Project Structure

```
.
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   └── ...
│   ├── public/               # Static assets
│   └── ...
├── backend/                  # NestJS backend application
│   ├── src/
│   │   ├── modules/          # Feature modules
│   │   ├── entities/         # Database entities
│   │   ├── config/           # Configuration files
│   │   └── ...
│   └── ...
├── aws-deployment/           # AWS deployment configurations
│   ├── main.tf               # Main Terraform configuration
│   ├── variables.tf          # Terraform variables
│   ├── outputs.tf            # Terraform outputs
│   └── ...
├── .github/workflows/        # GitHub Actions workflows
│   ├── ci.yml                # Continuous Integration
│   ├── cd.yml                # Continuous Deployment
│   └── ...
docker-compose.yml            # Development Docker Compose
├── docker-compose.prod.yml   # Production Docker Compose
├── Makefile                  # Development commands
└── README.md                 # This file
```

## 🗄 Database Schema

The application uses PostgreSQL with the following entities:
- User
- Product
- ProductImage
- Category
- Cart
- CartItem
- Order
- OrderItem
- ContactMessage
- StaticPage

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/logout` - User logout
- `GET /auth/google` - Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/profile` - Get user profile

### Users
- `GET /users` - Get all users (Admin only)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Products
- `GET /products` - Get all products with filtering and pagination
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (Admin only)
- `PATCH /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Categories
- `GET /products/categories` - Get all categories
- `GET /products/categories/:id` - Get category by ID
- `POST /products/categories` - Create category (Admin only)
- `PATCH /products/categories/:id` - Update category (Admin only)
- `DELETE /products/categories/:id` - Delete category (Admin only)

### Orders
- `GET /orders` - Get all orders for current user
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order
- `PATCH /orders/:id` - Update order (Admin only)
- `DELETE /orders/:id` - Delete order (Admin only)

### Contact
- `POST /contact` - Submit contact form
- `GET /contact` - Get all contact messages (Admin only)
- `GET /contact/:id` - Get contact message by ID (Admin only)
- `DELETE /contact/:id` - Delete contact message (Admin only)

### Static Pages
- `GET /static-pages/:slug` - Get static page by slug
- `GET /static-pages` - Get all static pages (Admin only)
- `POST /static-pages` - Create static page (Admin only)
- `PATCH /static-pages/:slug` - Update static page (Admin only)
- `DELETE /static-pages/:slug` - Delete static page (Admin only)

## ☁️ Deployment

### AWS Deployment

The application is designed to be deployed on AWS with the following services:
- ECS Fargate for backend
- S3 + CloudFront for frontend
- RDS for PostgreSQL
- Secrets Manager for environment variables
- Route53 for domain management
- ACM for SSL certificates

### CI/CD

GitHub Actions pipelines are included for:
- Continuous Integration (lint, test, build)
- Continuous Deployment (deploy to AWS)

## 🛠 Development

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Commitlint for commit message conventions

### Testing
- Jest for unit testing
- Supertest for API testing

### Development Commands

The project includes a Makefile with common development commands:

```bash
make setup     # Setup development environment
make dev       # Start development environment
make prod      # Start production environment
make test      # Run tests
make lint      # Run linter
make clean     # Clean Docker volumes and networks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the MIT License.