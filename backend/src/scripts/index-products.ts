import { config } from 'dotenv';
import { join } from 'path';
import { AppDataSource } from '../../data-source';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Load environment variables
config({ path: join(__dirname, '../../.env') });

async function indexAllProducts() {
  console.log('Initializing database connection...');
  
  // Initialize database
  await AppDataSource.initialize();
  
  // Initialize Pinecone
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
  });
  
  // Initialize OpenAI
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
  
  const indexName = 'products';
  
  try {
    // Create index if it doesn't exist
    const indexes = await pinecone.listIndexes();
    const indexExists = indexes.indexes?.some(index => index.name === indexName);
    
    if (!indexExists) {
      console.log('Creating Pinecone index...');
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536, // OpenAI embeddings dimension
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-west-2',
          },
        },
      });
      console.log('Pinecone index created successfully');
    } else {
      console.log('Pinecone index already exists');
    }
    
    // Wait for index to be ready
    console.log('Waiting for index to be ready...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Get all products
    console.log('Fetching products from database...');
    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);
    
    const products = await productRepository.find({
      relations: ['category'],
    });
    
    console.log(`Found ${products.length} products to index`);
    
    // Index products
    const index = pinecone.Index(indexName);
    let indexedCount = 0;
    
    for (const product of products) {
      try {
        // Generate embedding
        const text = `${product.name} ${product.description} ${product.category?.name || ''}`;
        const response = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: text,
        });
        const embedding = response.data[0].embedding;
        
        // Index in Pinecone
        await index.upsert([
          {
            id: `product_${product.id}`,
            values: embedding,
            metadata: {
              productId: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              categoryId: product.category?.id,
              categoryName: product.category?.name,
            },
          },
        ]);
        
        indexedCount++;
        console.log(`Indexed product ${product.id}: ${product.name}`);
      } catch (error) {
        console.error(`Failed to index product ${product.id}:`, error.message);
      }
    }
    
    console.log(`Successfully indexed ${indexedCount} out of ${products.length} products`);
    
  } catch (error) {
    console.error('Error indexing products:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }
}

// Run the script
indexAllProducts().catch(console.error);