import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.models';
import type { GraphQLContext } from 'src/config/graphql.config';

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

  // new tokens
  // logout
}
