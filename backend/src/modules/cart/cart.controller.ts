import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCart(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return await this.cartService.getOrCreateCart(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('items')
  async addItemToCart(
    @Req() req: AuthenticatedRequest,
    @Body() addItemDto: { productId: number; quantity?: number },
  ) {
    const userId = req.user.id;
    const { productId, quantity = 1 } = addItemDto;
    return await this.cartService.addItemToCart(userId, productId, quantity);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('items/:productId')
  async updateItemQuantity(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
    @Body() updateDto: { quantity: number },
  ) {
    const userId = req.user.id;
    const { quantity } = updateDto;
    return await this.cartService.updateItemQuantity(userId, +productId, quantity);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('items/:productId')
  async removeItemFromCart(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ) {
    const userId = req.user.id;
    return await this.cartService.removeItemFromCart(userId, +productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async clearCart(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    await this.cartService.clearCart(userId);
    return { message: 'Cart cleared successfully' };
  }
}