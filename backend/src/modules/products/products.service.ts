import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { ProductImage } from '../../entities/product-image.entity';
import { Category } from '../../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImagesRepository: Repository<ProductImage>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
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

  async create(createProductDto: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: Partial<Product>,
  ): Promise<Product | null> {
    await this.productsRepository.update(id, updateProductDto);
    return await this.productsRepository.findOne({ where: { id } });
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
