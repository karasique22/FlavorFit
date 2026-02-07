import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@repo/database';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/common/decorators';
import { GqlThrottlerGuard } from 'src/common/guards/gql-throttler.guard';
import { UpdateUserProfileArgs } from './users.input';
import { User } from './users.models';
import { UsersService } from './users.service';

@Resolver()
@UseGuards(GqlThrottlerGuard)
@Throttle({ default: { ttl: 60000, limit: 10 } })
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, {
    name: 'currentUser',
    description: 'Get currently authenticated user profile',
  })
  @Auth()
  getCurrentUser(@CurrentUser('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, {
    name: 'updateProfile',
    description: 'Update user profile and body measurements',
  })
  @Auth()
  updateProfile(
    @CurrentUser('id') id: string,
    @Args() input: UpdateUserProfileArgs,
  ) {
    return this.usersService.update(id, input);
  }

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users (admin only)',
  })
  @Auth(Role.ADMIN)
  getAllUsers() {
    return this.usersService.findAll();
  }
}
