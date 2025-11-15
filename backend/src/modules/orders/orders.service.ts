import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async findAll(userId?: number): Promise<Order[]> {
    const query = this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product');

    if (userId) {
      query.andWhere('order.userId = :userId', { userId });
    }

    return await query.orderBy('order.createdAt', 'DESC').getMany();
  }

  async findOne(id: number, userId?: number): Promise<Order | null> {
    const query = this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where('order.id = :id', { id });

    if (userId) {
      query.andWhere('order.userId = :userId', { userId });
    }

    return await query.getOne();
  }

  async create(createOrderDto: Partial<Order>, userId: number): Promise<Order> {
    // Generate order number
    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000,
    )}`;

    // Create order
    const order = this.ordersRepository.create({
      ...createOrderDto,
      orderNumber,
      user: { id: userId },
      status: OrderStatus.PENDING,
    });

    return await this.ordersRepository.save(order);
  }

  async update(
    id: number,
    updateOrderDto: Partial<Order>,
  ): Promise<Order | null> {
    await this.ordersRepository.update(id, updateOrderDto);
    return await this.ordersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
