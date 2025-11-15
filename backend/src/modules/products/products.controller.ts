import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../entities/product.entity';
import { Category } from '../../entities/category.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('category') categoryId?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const [products, total] = await this.productsService.findAll(
      page,
      limit,
      search,
      categoryId,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
    );
    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createProductDto: Partial<Product>) {
    return await this.productsService.create(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<Product>,
  ) {
    return await this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }

  // Categories
  @Get('categories')
  async findAllCategories(): Promise<Category[]> {
    return await this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  async findOneCategory(@Param('id') id: string) {
    return await this.productsService.findOneCategory(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('categories')
  async createCategory(@Body() createCategoryDto: Partial<Category>) {
    return await this.productsService.createCategory(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<Category>,
  ) {
    return await this.productsService.updateCategory(+id, updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('categories/:id')
  async removeCategory(@Param('id') id: string) {
    return await this.productsService.removeCategory(+id);
  }
}