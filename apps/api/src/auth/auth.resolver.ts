import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.models';
import type { GraphQLContext } from '../common/types/graphql.types';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello() {
    return 'Hello from FlavorFit API!';
  }

  // TODO: капча
  @Mutation(() => AuthResponse)
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } =
      await this.authService.register(input);

    this.authService.setRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } = await this.authService.login(input);

    this.authService.setRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Query(() => AuthResponse)
  async newTokens(@Context() { req, res }: GraphQLContext) {
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

  @Mutation(() => Boolean)
  logout(@Context() { res }: GraphQLContext) {
    this.authService.setRefreshTokenCookie(res, null);
    return true;
  }
}
