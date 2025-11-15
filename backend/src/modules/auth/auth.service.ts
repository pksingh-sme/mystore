import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RefreshTokenService } from './refresh-token.service';

interface JwtPayload {
  email: string;
  sub: number;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.refreshTokenService.generateRefreshToken(user);

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refreshToken: string) {
    const payload: any =
      this.refreshTokenService.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newPayload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const access_token = this.jwtService.sign(newPayload);
    const refresh_token = this.refreshTokenService.generateRefreshToken(user);

    return {
      access_token,
      refresh_token,
    };
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<any> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    // Save user
    const savedUser = await this.usersRepository.save(newUser);

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = savedUser;
    return result;
  }

  async findOrCreateGoogleUser(
    googleId: string,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<any> {
    // Check if user exists with googleId
    let user = await this.usersRepository.findOne({
      where: { googleId },
    });

    if (!user) {
      // Check if user exists with email
      user = await this.usersRepository.findOne({
        where: { email },
      });

      if (user) {
        // Update user with googleId
        user.googleId = googleId;
        await this.usersRepository.save(user);
      } else {
        // Create new user
        user = this.usersRepository.create({
          firstName,
          lastName,
          email,
          googleId,
          role: UserRole.USER,
        });
        await this.usersRepository.save(user);
      }
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
