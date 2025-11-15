import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/cart.entity';
import { CartItem } from '../../entities/cart-item.entity';
import { User } from '../../entities/user.entity';
import { Product } from '../../entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        user: { id: userId },
      });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItemToCart(userId: number, productId: number, quantity: number = 1): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    
    // Check if product exists and is active
    const product = await this.productRepository.findOne({
      where: { id: productId, isActive: true },
    });
    
    if (!product) {
      throw new Error('Product not found or inactive');
    }
    
    // Check if item already exists in cart
    let cartItem = cart.items.find(item => item.product.id === productId);
    
    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
    } else {
      // Create new cart item
      cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity,
      });
      cart.items.push(cartItem);
    }
    
    // Save cart item
    await this.cartItemRepository.save(cartItem);
    
    // Reload cart with relations
    return await this.getOrCreateCart(userId);
  }

  async updateItemQuantity(userId: number, productId: number, quantity: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    
    // Find cart item
    const cartItem = cart.items.find(item => item.product.id === productId);
    
    if (!cartItem) {
      throw new Error('Item not found in cart');
    }
    
    if (quantity <= 0) {
      // Remove item from cart
      await this.cartItemRepository.remove(cartItem);
    } else {
      // Update quantity
      cartItem.quantity = quantity;
      await this.cartItemRepository.save(cartItem);
    }
    
    // Reload cart with relations
    return await this.getOrCreateCart(userId);
  }

  async removeItemFromCart(userId: number, productId: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    
    // Find cart item
    const cartItem = cart.items.find(item => item.product.id === productId);
    
    if (!cartItem) {
      throw new Error('Item not found in cart');
    }
    
    // Remove item from cart
    await this.cartItemRepository.remove(cartItem);
    
    // Reload cart with relations
    return await this.getOrCreateCart(userId);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.getOrCreateCart(userId);
    
    // Remove all items from cart
    await this.cartItemRepository.remove(cart.items);
  }
}