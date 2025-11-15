import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Product } from './src/entities/product.entity';
import { ProductImage } from './src/entities/product-image.entity';
import { Category } from './src/entities/category.entity';
import { Cart } from './src/entities/cart.entity';
import { CartItem } from './src/entities/cart-item.entity';
import { Order } from './src/entities/order.entity';
import { OrderItem } from './src/entities/order-item.entity';
import { ContactMessage } from './src/entities/contact-message.entity';
import { StaticPage } from './src/entities/static-page.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT as string) || 5432,
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
    StaticPage
  ],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: false,
});