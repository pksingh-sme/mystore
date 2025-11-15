import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(__dirname, '../../.env') });

// Import entities
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product-image.entity';
import { Category } from '../entities/category.entity';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ContactMessage } from '../entities/contact-message.entity';
import { StaticPage } from '../entities/static-page.entity';

async function initDatabase() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'ecommerce',
    entities: [
      User,
      Product,
      ProductImage,
      Category,
      Cart,
      CartItem,
      Order,
      OrderItem,
      ContactMessage,
      StaticPage,
    ],
    synchronize: false,
    logging: false,
  });

  try {
    console.log('Initializing database connection...');
    await dataSource.initialize();
    console.log('Database connection established.');

    console.log('Running migrations...');
    const migrations = await dataSource.runMigrations();
    console.log(`Applied ${migrations.length} migrations.`);

    console.log('Database initialization completed successfully.');
    await dataSource.destroy();
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1);
  }
}

initDatabase();