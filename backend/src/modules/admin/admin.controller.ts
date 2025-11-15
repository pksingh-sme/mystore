import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // User management
  @Get('users')
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const [users, total] = await this.adminService.getAllUsers(page, limit);
    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return await this.adminService.getUserById(+id);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<any>,
  ) {
    return await this.adminService.updateUser(+id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    await this.adminService.deleteUser(+id);
    return { message: 'User deleted successfully' };
  }

  // Product management
  @Get('products')
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const [products, total] = await this.adminService.getAllProducts(page, limit, search);
    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: string) {
    return await this.adminService.getProductById(+id);
  }

  @Post('products')
  async createProduct(@Body() createProductDto: Partial<any>) {
    return await this.adminService.createProduct(createProductDto);
  }

  @Put('products/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<any>,
  ) {
    return await this.adminService.updateProduct(+id, updateProductDto);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    await this.adminService.deleteProduct(+id);
    return { message: 'Product deleted successfully' };
  }

  // Category management
  @Get('categories')
  async getAllCategories() {
    return await this.adminService.getAllCategories();
  }

  @Get('categories/:id')
  async getCategoryById(@Param('id') id: string) {
    return await this.adminService.getCategoryById(+id);
  }

  @Post('categories')
  async createCategory(@Body() createCategoryDto: Partial<any>) {
    return await this.adminService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<any>,
  ) {
    return await this.adminService.updateCategory(+id, updateCategoryDto);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    await this.adminService.deleteCategory(+id);
    return { message: 'Category deleted successfully' };
  }

  // Order management
  @Get('orders')
  async getAllOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const [orders, total] = await this.adminService.getAllOrders(page, limit);
    return {
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('orders/:id')
  async getOrderById(@Param('id') id: string) {
    return await this.adminService.getOrderById(+id);
  }

  @Put('orders/:id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return await this.adminService.updateOrderStatus(+id, status);
  }

  // Contact messages
  @Get('contact-messages')
  async getAllContactMessages(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const [messages, total] = await this.adminService.getAllContactMessages(page, limit);
    return {
      data: messages,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('contact-messages/:id')
  async getContactMessageById(@Param('id') id: string) {
    return await this.adminService.getContactMessageById(+id);
  }

  @Delete('contact-messages/:id')
  async deleteContactMessage(@Param('id') id: string) {
    await this.adminService.deleteContactMessage(+id);
    return { message: 'Contact message deleted successfully' };
  }

  // Static pages
  @Get('static-pages')
  async getAllStaticPages() {
    return await this.adminService.getAllStaticPages();
  }

  @Get('static-pages/:id')
  async getStaticPageById(@Param('id') id: string) {
    return await this.adminService.getStaticPageById(+id);
  }

  @Post('static-pages')
  async createStaticPage(@Body() createStaticPageDto: Partial<any>) {
    return await this.adminService.createStaticPage(createStaticPageDto);
  }

  @Put('static-pages/:id')
  async updateStaticPage(
    @Param('id') id: string,
    @Body() updateStaticPageDto: Partial<any>,
  ) {
    return await this.adminService.updateStaticPage(+id, updateStaticPageDto);
  }

  @Delete('static-pages/:id')
  async deleteStaticPage(@Param('id') id: string) {
    await this.adminService.deleteStaticPage(+id);
    return { message: 'Static page deleted successfully' };
  }
}