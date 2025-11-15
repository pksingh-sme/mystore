import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

interface GoogleUser {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthenticatedRequest extends Request {
  user:
    | {
        id: number;
        email: string;
        role: string;
      }
    | GoogleUser;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }
    const token = await this.authService.login(user as any);
    response.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });
    response.cookie('refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return response.json({ ...token, user });
  }

  @Post('refresh')
  async refresh(
    @Body('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const tokens = await this.authService.refreshToken(refreshToken);
      response.cookie('access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000, // 1 hour
      });
      response.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      return response.json(tokens);
    } catch (error) {
      return response.status(401).json({ message: 'Invalid refresh token' });
    }
  }

  @Post('register')
  async register(
    @Body()
    registerDto: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
  ) {
    try {
      const user = await this.authService.register(
        registerDto.firstName,
        registerDto.lastName,
        registerDto.email,
        registerDto.password,
      );
      return { user };
    } catch (error: any) {
      return { message: error.message || 'Registration failed' };
    }
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const googleUser = req.user as GoogleUser;
    const user = await this.authService.findOrCreateGoogleUser(
      googleUser.googleId,
      googleUser.email,
      googleUser.firstName,
      googleUser.lastName,
    );
    const token = await this.authService.login(user as any);
    response.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });
    response.cookie('refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // Redirect to frontend
    return response.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${
        token.access_token
      }`,
    );
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
