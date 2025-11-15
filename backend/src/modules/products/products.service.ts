import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { ProductImage } from '../../entities/product-image.entity';
import { Category } from '../../entities/category.entity';
import { VectorService } from '../vector/vector.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImagesRepository: Repository<ProductImage>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private vectorService: VectorService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<[Product[], number]> {
    const query = this.productsRepository.createQueryBuilder('product');

    // Add search filter
    if (search) {
      query.andWhere(
        'product.name LIKE :search OR product.description LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    // Add category filter
    if (categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    // Add price filters
    if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    // Add sorting
    if (sortBy) {
      query.orderBy(`product.${sortBy}`, sortOrder);
    } else {
      query.orderBy('product.createdAt', 'DESC');
    }

    return await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['images', 'category'],
    });
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { id: In(ids) },
      relations: ['images', 'category'],
    });
  }

  async create(createProductDto: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    const savedProduct = await this.productsRepository.save(product);
    
    // Index the product in the vector database
    try {
      await this.vectorService.indexProduct(savedProduct);
    } catch (error) {
      console.error('Failed to index product:', error);
    }
    
    return savedProduct;
  }

  async update(
    id: number,
    updateProductDto: Partial<Product>,
  ): Promise<Product | null> {
    await this.productsRepository.update(id, updateProductDto);
    const updatedProduct = await this.productsRepository.findOne({ where: { id } });
    
    // Re-index the product in the vector database
    if (updatedProduct) {
      try {
        await this.vectorService.indexProduct(updatedProduct);
      } catch (error) {
        console.error('Failed to re-index product:', error);
      }
    }
    
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

  // Categories
  async findAllCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOneCategory(id: number): Promise<Category | null> {
    return await this.categoriesRepository.findOne({ where: { id } });
  }

  async createCategory(
    createCategoryDto: Partial<Category>,
  ): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async updateCategory(
    id: number,
    updateCategoryDto: Partial<Category>,
  ): Promise<Category | null> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return await this.categoriesRepository.findOne({ where: { id } });
  }

  async removeCategory(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}