import { Injectable } from '@nestjs/common';
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

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {
    // Initialize Pinecone
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
    });

    // Initialize OpenAI
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }

  /**
   * Generate embedding for a product
   */
  async generateProductEmbedding(product: Product): Promise<number[]> {
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
      console.error('Error indexing product:', error);
      throw error;
    }
  }

  /**
   * Index all products in the vector database
   */
  async indexAllProducts(): Promise<void> {
    try {
      const products = await this.productsRepository.find({
        relations: ['category'],
      });
      
      for (const product of products) {
        await this.indexProduct(product);
      }
    } catch (error) {
      console.error('Error indexing all products:', error);
      throw error;
    }
  }

  /**
   * Search for products using semantic search
   */
  async searchProducts(query: string, limit: number = 10): Promise<any[]> {
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
      console.error('Error searching products:', error);
      throw error;
    }
  }

  /**
   * Get product suggestions based on a product
   */
  async getProductSuggestions(productId: number, limit: number = 5): Promise<any[]> {
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
      console.error('Error getting product suggestions:', error);
      throw error;
    }
  }
}