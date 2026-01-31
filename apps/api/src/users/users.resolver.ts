import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user-profile.models';
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

  @Auth('ADMIN')
  @Query(() => [User], { name: 'allUsers' })
  GetAllUsers() {
    return this.usersService.getAllUsers();
  }
}
