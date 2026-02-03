import { BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import type { GraphQLContext } from '../common/types/graphql.types';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.models';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {
    name: 'register',
    description: 'Register a new user account',
  })
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } =
      await this.authService.register(input);

    this.authService.setRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse, {
    name: 'login',
    description: 'Authenticate user and return tokens',
  })
  async login(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } = await this.authService.login(input);

    this.authService.setRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse, {
    name: 'refreshTokens',
    description: 'Refresh access and refresh tokens using refresh token cookie',
  })
  async getNewTokens(@Context() { req, res }: GraphQLContext) {
    const initRefreshToken = req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!initRefreshToken) {
      this.authService.setRefreshTokenCookie(res, null);
      throw new BadRequestException('No refresh token provided');
    }

    const { refreshToken, ...response } =
      await this.authService.getNewTokens(initRefreshToken);

    this.authService.setRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => Boolean, {
    name: 'logout',
    description: 'Logout user and clear refresh token cookie',
  })
  logout(@Context() { res }: GraphQLContext) {
    this.authService.setRefreshTokenCookie(res, null);
    return true;
  }
}
