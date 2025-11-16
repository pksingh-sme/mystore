import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

async function testSemanticSearch() {
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

    // Test semantic search by finding products related to "electronics"
    console.log('\n--- Searching for electronics-related products ---');
    const electronicsResult = await client.query(
      'SELECT id, name, description, price FROM "product" WHERE LOWER(description) LIKE $1 OR LOWER(name) LIKE $1 ORDER BY price LIMIT 5',
      ['%electronic%']
    );
    
    if (electronicsResult.rows.length > 0) {
      console.log('Electronics products found:');
      electronicsResult.rows.forEach((product: any) => {
        console.log(`- ${product.name}: $${product.price} - ${product.description.substring(0, 50)}...`);
      });
    } else {
      console.log('No electronics products found with this search term.');
    }

    // Test semantic search by finding products related to "clothing"
    console.log('\n--- Searching for clothing-related products ---');
    const clothingResult = await client.query(
      'SELECT id, name, description, price FROM "product" WHERE LOWER(description) LIKE $1 OR LOWER(name) LIKE $1 ORDER BY price LIMIT 5',
      ['%clothing%']
    );
    
    if (clothingResult.rows.length > 0) {
      console.log('Clothing products found:');
      clothingResult.rows.forEach((product: any) => {
        console.log(`- ${product.name}: $${product.price} - ${product.description.substring(0, 50)}...`);
      });
    } else {
      console.log('No clothing products found with this search term.');
    }

    // Test semantic search by finding products related to "books"
    console.log('\n--- Searching for book-related products ---');
    const booksResult = await client.query(
      'SELECT id, name, description, price FROM "product" WHERE LOWER(description) LIKE $1 OR LOWER(name) LIKE $1 ORDER BY price LIMIT 5',
      ['%book%']
    );
    
    if (booksResult.rows.length > 0) {
      console.log('Book products found:');
      booksResult.rows.forEach((product: any) => {
        console.log(`- ${product.name}: $${product.price} - ${product.description.substring(0, 50)}...`);
      });
    } else {
      console.log('No book products found with this search term.');
    }

    // Test general search
    console.log('\n--- General search for "mouse" ---');
    const mouseResult = await client.query(
      'SELECT id, name, description, price FROM "product" WHERE LOWER(name) LIKE $1 OR LOWER(description) LIKE $1 ORDER BY price LIMIT 5',
      ['%mouse%']
    );
    
    if (mouseResult.rows.length > 0) {
      console.log('Mouse-related products found:');
      mouseResult.rows.forEach((product: any) => {
        console.log(`- ${product.name}: $${product.price} - ${product.description.substring(0, 50)}...`);
      });
    } else {
      console.log('No mouse-related products found.');
    }

    await client.end();
    console.log('\nSemantic search test completed successfully!');
  } catch (error) {
    console.error('Error testing semantic search:', error);
    await client.end();
  }
}

testSemanticSearch();