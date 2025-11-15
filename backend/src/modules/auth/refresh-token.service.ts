import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService) {}

  generateRefreshToken(user: User): string {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role
    };
    
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refreshSecretKey',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });
  }

  verifyRefreshToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'refreshSecretKey',
      });
    } catch (error) {
      return null;
    }
  }
}