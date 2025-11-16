import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';
import * as bcrypt from 'bcryptjs';

async function addMoreProducts() {
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

    // Get admin user ID
    const adminResult = await client.query('SELECT id FROM "user" WHERE email = $1', ['admin@example.com']);
    const adminId = adminResult.rows[0].id;

    // Get category IDs
    const categoriesResult = await client.query('SELECT id, name FROM "category"');
    const categories = categoriesResult.rows.reduce((acc, category) => {
      acc[category.name.toLowerCase()] = category.id;
      return acc;
    }, {} as Record<string, number>);

    // Additional products
    const products = [
      {
        name: 'Gaming Mouse',
        description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons',
        price: 49.99,
        stock: 75,
        categoryId: categories.electronics,
        userId: adminId,
      },
      {
        name: 'Mechanical Keyboard',
        description: 'Full-size mechanical keyboard with blue switches and RGB backlighting',
        price: 89.99,
        stock: 40,
        categoryId: categories.electronics,
        userId: adminId,
      },
      {
        name: '4K Monitor',
        description: '27-inch 4K UHD monitor with HDR support and wide color gamut',
        price: 349.99,
        stock: 20,
        categoryId: categories.electronics,
        userId: adminId,
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof Bluetooth speaker with 20-hour battery life',
        price: 79.99,
        stock: 60,
        categoryId: categories.electronics,
        userId: adminId,
      },
      {
        name: 'Denim Jacket',
        description: 'Classic denim jacket with button closure and chest pockets',
        price: 59.99,
        stock: 35,
        categoryId: categories.clothing,
        userId: adminId,
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with cushioned sole and breathable mesh',
        price: 89.99,
        stock: 50,
        categoryId: categories.clothing,
        userId: adminId,
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors',
        price: 19.99,
        stock: 120,
        categoryId: categories.clothing,
        userId: adminId,
      },
      {
        name: 'JavaScript: The Good Parts',
        description: 'An in-depth look at the best parts of JavaScript and how to use them effectively',
        price: 29.99,
        stock: 80,
        categoryId: categories.books,
        userId: adminId,
      },
      {
        name: 'Clean Code',
        description: 'A handbook of agile software craftsmanship with practical advice',
        price: 34.99,
        stock: 65,
        categoryId: categories.books,
        userId: adminId,
      },
      {
        name: 'Gardening Tools Set',
        description: 'Complete set of essential gardening tools including trowel, pruners, and gloves',
        price: 39.99,
        stock: 45,
        categoryId: categories['home & garden'],
        userId: adminId,
      },
      {
        name: 'Indoor Plant Pot',
        description: 'Ceramic indoor plant pot with drainage saucer and modern design',
        price: 24.99,
        stock: 90,
        categoryId: categories['home & garden'],
        userId: adminId,
      },
      {
        name: 'LED Desk Lamp',
        description: 'Adjustable LED desk lamp with touch controls and multiple brightness settings',
        price: 34.99,
        stock: 70,
        categoryId: categories['home & garden'],
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

    console.log('Additional products added successfully!');
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error adding products:', error);
    await client.end();
    process.exit(1);
  }
}

addMoreProducts();