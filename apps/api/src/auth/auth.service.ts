import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { isDev } from 'src/utils/is-dev.util';
import { AuthInput } from './auth.input';
import type { AuthTokenData } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private EXPIRE_DAY_REFRESH = 3;
  REFRESH_TOKEN_NAME = 'refresh_token';

  async register(input: AuthInput) {
    const email = input.email.toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this.usersService.createUser(
      email,
      await hash(input.password),
    );

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    });

    return { user, ...tokens };
  }

  async login(input: AuthInput) {
    const user = await this.validateUser(input);

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    });

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result =
      await this.jwt.verifyAsync<Pick<AuthTokenData, 'id'>>(refreshToken);
    if (!result) throw new BadRequestException('Invalid refresh token');

    const user = await this.usersService.findUserById(result.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    });

    return { user, ...tokens };
  }

  private async validateUser(input: AuthInput) {
    const email = input.email.toLowerCase();
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await verify(user.password, input.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  private generateTokens(data: AuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(
      { id: data.id },
      {
        expiresIn: `${this.EXPIRE_DAY_REFRESH}d`,
      },
    );

    return { accessToken, refreshToken };
  }

  setRefreshTokenCookie(res: Response, token: string | null) {
    if (token) {
      const expiresIn = new Date();
      expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH);

      res.cookie(this.REFRESH_TOKEN_NAME, token, {
        httpOnly: true,
        expires: expiresIn,
        sameSite: isDev(this.configService) ? 'none' : 'strict',
        secure: true,
      });
    } else {
      res.clearCookie(this.REFRESH_TOKEN_NAME);
    }
  }
}
