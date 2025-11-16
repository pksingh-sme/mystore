import { Injectable, Logger } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { Product } from '../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VectorService {
  private pinecone: Pinecone;
  private openai: OpenAI;
  private indexName = 'products';
  private readonly logger = new Logger(VectorService.name);
  private isConfigured = true;

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {
    // Check if API keys are configured
    const pineconeApiKey = process.env.PINECONE_API_KEY || '';
    const openaiApiKey = process.env.OPENAI_API_KEY || '';
    
    if (pineconeApiKey === 'your_pinecone_api_key_here' || !pineconeApiKey) {
      this.logger.warn('Pinecone API key not configured. Semantic search will use fallback text search.');
      this.isConfigured = false;
    }
    
    if (openaiApiKey === 'your_openai_api_key_here' || !openaiApiKey) {
      this.logger.warn('OpenAI API key not configured. Semantic search will use fallback text search.');
      this.isConfigured = false;
    }
    
    if (this.isConfigured) {
      // Initialize Pinecone
      this.pinecone = new Pinecone({
        apiKey: pineconeApiKey,
      });

      // Initialize OpenAI
      this.openai = new OpenAI({
        apiKey: openaiApiKey,
      });
    }
  }

  /**
   * Generate embedding for a product
   */
  async generateProductEmbedding(product: Product): Promise<number[]> {
    if (!this.isConfigured) {
      // Return a mock embedding if not configured
      return Array(1536).fill(0);
    }
    
    const text = `${product.name} ${product.description} ${product.category?.name || ''}`;
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    return response.data[0].embedding;
  }

  /**
   * Index a product in the vector database
   */
  async indexProduct(product: Product): Promise<void> {
    if (!this.isConfigured) {
      this.logger.warn(`Skipping product indexing for product ${product.id} - APIs not configured`);
      return;
    }
    
    try {
      const embedding = await this.generateProductEmbedding(product);
      const index = this.pinecone.Index(this.indexName);
      
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
    } catch (error) {
      this.logger.error('Error indexing product:', error);
      throw error;
    }
  }

  /**
   * Index all products in the vector database
   */
  async indexAllProducts(): Promise<void> {
    if (!this.isConfigured) {
      this.logger.warn('Skipping all products indexing - APIs not configured');
      return;
    }
    
    try {
      const products = await this.productsRepository.find({
        relations: ['category'],
      });
      
      for (const product of products) {
        await this.indexProduct(product);
      }
    } catch (error) {
      this.logger.error('Error indexing all products:', error);
      throw error;
    }
  }

  /**
   * Search for products using semantic search
   */
  async searchProducts(query: string, limit: number = 10): Promise<any[]> {
    if (!this.isConfigured) {
      this.logger.warn('Using fallback text search instead of semantic search');
      return await this.fallbackSearch(query, limit);
    }
    
    try {
      // Generate embedding for the search query
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: query,
      });
      const queryEmbedding = response.data[0].embedding;

      // Search in Pinecone
      const index = this.pinecone.Index(this.indexName);
      const searchResponse = await index.query({
        vector: queryEmbedding,
        topK: limit,
        includeMetadata: true,
      });

      return searchResponse.matches || [];
    } catch (error) {
      this.logger.error('Error searching products:', error);
      throw error;
    }
  }

  /**
   * Get product suggestions based on a product
   */
  async getProductSuggestions(productId: number, limit: number = 5): Promise<any[]> {
    if (!this.isConfigured) {
      this.logger.warn('Using fallback suggestions instead of semantic suggestions');
      // Return some random products as fallback
      const products = await this.productsRepository.find({
        take: limit,
      });
      return products.map(product => ({
        id: product.id,
        metadata: {
          productId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        }
      }));
    }
    
    try {
      // Get the product
      const product = await this.productsRepository.findOne({
        where: { id: productId },
        relations: ['category'],
      });

      if (!product) {
        throw new Error('Product not found');
      }

      // Generate embedding for the product
      const embedding = await this.generateProductEmbedding(product);

      // Search for similar products in Pinecone
      const index = this.pinecone.Index(this.indexName);
      const searchResponse = await index.query({
        vector: embedding,
        topK: limit + 1, // +1 because the product itself will be included
        includeMetadata: true,
        filter: {
          productId: { $ne: productId }, // Exclude the product itself
        },
      });

      return searchResponse.matches || [];
    } catch (error) {
      this.logger.error('Error getting product suggestions:', error);
      throw error;
    }
  }
  
  /**
   * Fallback text-based search
   */
  private async fallbackSearch(query: string, limit: number): Promise<any[]> {
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.name ILIKE :query OR product.description ILIKE :query', {
        query: `%${query}%`,
      })
      .limit(limit)
      .getMany();
      
    return products.map(product => ({
      id: product.id,
      metadata: {
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      }
    }));
  }
}