import { AppDataSource } from '../../data-source';
import { User, UserRole } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { StaticPage } from '../entities/static-page.entity';
import * as bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');

    // Clear existing data
    await AppDataSource.getRepository(StaticPage).clear();
    await AppDataSource.getRepository(Product).clear();
    await AppDataSource.getRepository(Category).clear();
    await AppDataSource.getRepository(User).clear();

    // Create admin user
    const adminUser = new User();
    adminUser.firstName = 'Admin';
    adminUser.lastName = 'User';
    adminUser.email = 'admin@example.com';
    adminUser.password = await bcrypt.hash('admin123', 10);
    adminUser.role = UserRole.ADMIN;
    adminUser.isEmailVerified = true;
    await AppDataSource.getRepository(User).save(adminUser);
    console.log('Admin user created');

    // Create regular user
    const regularUser = new User();
    regularUser.firstName = 'John';
    regularUser.lastName = 'Doe';
    regularUser.email = 'john.doe@example.com';
    regularUser.password = await bcrypt.hash('user123', 10);
    regularUser.role = UserRole.USER;
    regularUser.isEmailVerified = true;
    await AppDataSource.getRepository(User).save(regularUser);
    console.log('Regular user created');

    // Create categories
    const categories = [
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Apparel and fashion items' },
      { name: 'Books', description: 'Books and educational materials' },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
      },
    ];

    const categoryEntities = [];
    for (const cat of categories) {
      const category = new Category();
      category.name = cat.name;
      category.description = cat.description;
      category.isActive = true;
      const savedCategory = await AppDataSource.getRepository(Category).save(
        category,
      );
      categoryEntities.push(savedCategory);
      console.log(`Category "${cat.name}" created`);
    }

    // Create products
    const products = [
      {
        name: 'Smartphone',
        description: 'Latest model smartphone with advanced features',
        price: 699.99,
        stock: 50,
        categoryId: categoryEntities[0].id,
        userId: adminUser.id,
      },
      {
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        price: 1299.99,
        stock: 25,
        categoryId: categoryEntities[0].id,
        userId: adminUser.id,
      },
      {
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 19.99,
        stock: 100,
        categoryId: categoryEntities[1].id,
        userId: adminUser.id,
      },
      {
        name: 'JavaScript Guide',
        description: 'Comprehensive guide to JavaScript programming',
        price: 39.99,
        stock: 75,
        categoryId: categoryEntities[2].id,
        userId: adminUser.id,
      },
    ];

    for (const prod of products) {
      const product = new Product();
      product.name = prod.name;
      product.description = prod.description;
      product.price = prod.price;
      product.stock = prod.stock;
      product.isActive = true;
      product.category =
        categoryEntities.find((c) => c.id === prod.categoryId) ||
        categoryEntities[0];
      product.user = adminUser;
      await AppDataSource.getRepository(Product).save(product);
      console.log(`Product "${prod.name}" created`);
    }

    // Create static pages
    const staticPages = [
      {
        slug: 'about',
        title: 'About Us',
        htmlContent:
          '<h1>About Our Company</h1><p>Welcome to our e-commerce platform...</p>',
      },
      {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        htmlContent: '<h1>Privacy Policy</h1><p>We respect your privacy...</p>',
      },
      {
        slug: 'terms',
        title: 'Terms and Conditions',
        htmlContent:
          '<h1>Terms and Conditions</h1><p>Please read these terms...</p>',
      },
    ];

    for (const page of staticPages) {
      const staticPage = new StaticPage();
      staticPage.slug = page.slug;
      staticPage.title = page.title;
      staticPage.htmlContent = page.htmlContent;
      await AppDataSource.getRepository(StaticPage).save(staticPage);
      console.log(`Static page "${page.title}" created`);
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
