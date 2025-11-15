# ShopEase Backend

A NestJS backend for the ShopEase e-commerce platform with PostgreSQL database.

## Features

- User authentication with JWT and Google OAuth
- Product management with categories
- Order management
- Contact form handling
- Static page management
- RESTful API design
- TypeORM for database operations
- PostgreSQL database

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT for authentication
- Passport for authentication strategies
- bcryptjs for password hashing

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

3. Run the development server:
   ```bash
   npm run start
   ```

4. Run in watch mode:
   ```bash
   npm run start:dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Run in production mode:
   ```bash
   npm run start:prod
   ```

## API Endpoints

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

## Database Schema

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

## Environment Variables

Create a `.env` file with the following variables:
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - Google OAuth callback URL
- `FRONTEND_URL` - Frontend application URL
- `NODE_ENV` - Node environment (development/production)