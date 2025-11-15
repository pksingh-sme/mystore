import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Product } from '../../entities/product.entity';
import { ProductImage } from '../../entities/product-image.entity';
import { Category } from '../../entities/category.entity';
import { Order, OrderStatus } from '../../entities/order.entity';

import { ContactMessage } from '../../entities/contact-message.entity';
import { StaticPage } from '../../entities/static-page.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(ContactMessage)
    private contactMessageRepository: Repository<ContactMessage>,
    @InjectRepository(StaticPage)
    private staticPageRepository: Repository<StaticPage>,
  ) {}

  // User management
  async getAllUsers(
    page: number = 1,
    limit: number = 10,
  ): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(
    id: number,
    updateUserDto: Partial<User>,
  ): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Product management
  async getAllProducts(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<[Product[], number]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      query.andWhere(
        'product.name LIKE :search OR product.description LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    return await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('product.createdAt', 'DESC')
      .getManyAndCount();
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'images'],
    });
  }

  async createProduct(createProductDto: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async updateProduct(
    id: number,
    updateProductDto: Partial<Product>,
  ): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'images'],
    });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  // Category management
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async createCategory(
    createCategoryDto: Partial<Category>,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async updateCategory(
    id: number,
    updateCategoryDto: Partial<Category>,
  ): Promise<Category | null> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  // Order management
  async getAllOrders(
    page: number = 1,
    limit: number = 10,
  ): Promise<[Order[], number]> {
    return await this.orderRepository.findAndCount({
      relations: ['user', 'items', 'items.product'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(id: number): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | null> {
    await this.orderRepository.update(id, { status: status as OrderStatus });
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
  }

  // Contact messages
  async getAllContactMessages(
    page: number = 1,
    limit: number = 10,
  ): Promise<[ContactMessage[], number]> {
    return await this.contactMessageRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  async getContactMessageById(id: number): Promise<ContactMessage | null> {
    return await this.contactMessageRepository.findOne({ where: { id } });
  }

  async deleteContactMessage(id: number): Promise<void> {
    await this.contactMessageRepository.delete(id);
  }

  // Static pages
  async getAllStaticPages(): Promise<StaticPage[]> {
    return await this.staticPageRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getStaticPageById(id: number): Promise<StaticPage | null> {
    return await this.staticPageRepository.findOne({ where: { id } });
  }

  async getStaticPageBySlug(slug: string): Promise<StaticPage | null> {
    return await this.staticPageRepository.findOne({ where: { slug } });
  }

  async createStaticPage(
    createStaticPageDto: Partial<StaticPage>,
  ): Promise<StaticPage> {
    const staticPage = this.staticPageRepository.create(createStaticPageDto);
    return await this.staticPageRepository.save(staticPage);
  }

  async updateStaticPage(
    id: number,
    updateStaticPageDto: Partial<StaticPage>,
  ): Promise<StaticPage | null> {
    await this.staticPageRepository.update(id, updateStaticPageDto);
    return await this.staticPageRepository.findOne({ where: { id } });
  }

  async deleteStaticPage(id: number): Promise<void> {
    await this.staticPageRepository.delete(id);
  }
}
