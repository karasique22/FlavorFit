import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UpdateUserProfileArgs, User } from './users.models';
import { CurrentUser } from 'src/common/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @Query(() => User, { name: 'currentUser' })
  GetCurrentUser(@CurrentUser('id') id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => User, { name: 'updateProfile' })
  @Auth()
  UpdateProfile(
    @CurrentUser('id') id: string,
    @Args() input: UpdateUserProfileArgs,
  ) {
    return this.usersService.updateProfile(id, input);
  }

  @Auth('ADMIN')
  @Query(() => [User], { name: 'allUsers' })
  GetAllUsers() {
    return this.usersService.getAllUsers();
  }
}
