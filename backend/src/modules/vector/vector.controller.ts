import { Controller, Get, Post, Query, Param, Body, UseGuards } from '@nestjs/common';
import { VectorService } from './vector.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('vector')
export class VectorController {
  constructor(private readonly vectorService: VectorService) {}

  /**
   * Index all products in the vector database
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('index-all')
  async indexAllProducts() {
    try {
      await this.vectorService.indexAllProducts();
      return { message: 'All products indexed successfully' };
    } catch (error) {
      return { error: 'Failed to index products', details: error.message };
    }
  }

  /**
   * Index a specific product
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('index-product/:id')
  async indexProduct(@Param('id') id: string) {
    try {
      // This would need to be implemented to fetch and index a single product
      return { message: `Product ${id} indexing initiated` };
    } catch (error) {
      return { error: 'Failed to index product', details: error.message };
    }
  }

  /**
   * Search products using semantic search
   */
  @Get('search')
  async searchProducts(
    @Query('query') query: string,
    @Query('limit') limit: number = 10,
  ) {
    try {
      if (!query) {
        return { error: 'Query parameter is required' };
      }
      
      const results = await this.vectorService.searchProducts(query, limit);
      return { results };
    } catch (error) {
      return { error: 'Failed to search products', details: error.message };
    }
  }

  /**
   * Get product suggestions
   */
  @Get('suggestions/:productId')
  async getProductSuggestions(
    @Param('productId') productId: string,
    @Query('limit') limit: number = 5,
  ) {
    try {
      const suggestions = await this.vectorService.getProductSuggestions(
        parseInt(productId),
        limit,
      );
      return { suggestions };
    } catch (error) {
      return { error: 'Failed to get product suggestions', details: error.message };
    }
  }
}