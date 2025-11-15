import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../../entities/order.entity';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return await this.ordersService.findAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return await this.ordersService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createOrderDto: Partial<Order>,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    return await this.ordersService.create(createOrderDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<Order>,
  ) {
    return await this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }
}