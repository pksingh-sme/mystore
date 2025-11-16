import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';
import * as bcrypt from 'bcryptjs';

async function seedDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'ecommerce',
  });

  try {
    await client.connect();
    console.log('Database connection established');

    // Clear existing data
    await client.query('DELETE FROM static_page');
    await client.query('DELETE FROM product');
    await client.query('DELETE FROM category');
    await client.query('DELETE FROM "user"');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminResult = await client.query(
      'INSERT INTO "user" ("firstName", "lastName", "email", "password", "role", "isEmailVerified", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING id',
      ['Admin', 'User', 'admin@example.com', adminPassword, 'admin', true]
    );
    const adminId = adminResult.rows[0].id;
    console.log('Admin user created');

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    await client.query(
      'INSERT INTO "user" ("firstName", "lastName", "email", "password", "role", "isEmailVerified", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
      ['John', 'Doe', 'john.doe@example.com', userPassword, 'user', true]
    );
    console.log('Regular user created');

    // Create categories
    const categories = [
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Apparel and fashion items' },
      { name: 'Books', description: 'Books and educational materials' },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
      },
    ];

    const categoryIds = [];
    for (const cat of categories) {
      const result = await client.query(
        'INSERT INTO "category" ("name", "description", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id',
        [cat.name, cat.description, true]
      );
      categoryIds.push(result.rows[0].id);
      console.log(`Category "${cat.name}" created`);
    }

    // Create products
    const products = [
      {
        name: 'Smartphone',
        description: 'Latest model smartphone with advanced features',
        price: 699.99,
        stock: 50,
        categoryId: categoryIds[0],
        userId: adminId,
      },
      {
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        price: 1299.99,
        stock: 25,
        categoryId: categoryIds[0],
        userId: adminId,
      },
      {
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 19.99,
        stock: 100,
        categoryId: categoryIds[1],
        userId: adminId,
      },
      {
        name: 'JavaScript Guide',
        description: 'Comprehensive guide to JavaScript programming',
        price: 39.99,
        stock: 75,
        categoryId: categoryIds[2],
        userId: adminId,
      },
    ];

    for (const prod of products) {
      await client.query(
        'INSERT INTO "product" ("name", "description", "price", "stock", "isActive", "userId", "categoryId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())',
        [prod.name, prod.description, prod.price, prod.stock, true, prod.userId, prod.categoryId]
      );
      console.log(`Product "${prod.name}" created`);
    }

    // Create static pages
    const staticPages = [
      {
        slug: 'about',
        title: 'About Us',
        htmlContent:
          '<h1>About Our Company</h1><p>Welcome to our e-commerce platform...</p>',
      },
      {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        htmlContent: '<h1>Privacy Policy</h1><p>We respect your privacy...</p>',
      },
      {
        slug: 'terms',
        title: 'Terms and Conditions',
        htmlContent:
          '<h1>Terms and Conditions</h1><p>Please read these terms...</p>',
      },
    ];

    for (const page of staticPages) {
      await client.query(
        'INSERT INTO "static_page" ("slug", "title", "htmlContent", "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW())',
        [page.slug, page.title, page.htmlContent]
      );
      console.log(`Static page "${page.title}" created`);
    }

    console.log('Database seeding completed successfully!');
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await client.end();
    process.exit(1);
  }
}

seedDatabase();