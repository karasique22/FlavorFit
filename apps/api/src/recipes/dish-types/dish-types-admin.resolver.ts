import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { Role } from '@repo/database';

import { DishTypesAdminService } from './dish-types-admin.service';
import {
  CreateDishTypeInput,
  UpdateDishTypeInput,
} from './dish-types.input';
import { DishType } from './dish-types.model';

@Resolver()
export class DishTypesAdminResolver {
  constructor(
    private readonly dishTypesAdminService: DishTypesAdminService,
  ) {}

  @Query(() => [DishType], {
    name: 'dishTypes',
    description: 'Get all dish types',
  })
  @Auth(Role.ADMIN)
  getAllDishTypes() {
    return this.dishTypesAdminService.findAll();
  }

  @Query(() => DishType, {
    name: 'dishType',
    description: 'Get a single dish type by ID',
  })
  @Auth(Role.ADMIN)
  getDishTypeById(@Args('id') id: string) {
    return this.dishTypesAdminService.findOne(id);
  }

  @Mutation(() => DishType, {
    name: 'createDishType',
    description: 'Create a new dish type',
  })
  @Auth(Role.ADMIN)
  createDishType(@Args('input') input: CreateDishTypeInput) {
    return this.dishTypesAdminService.create(input);
  }

  @Mutation(() => DishType, {
    name: 'updateDishType',
    description: 'Update an existing dish type',
  })
  @Auth(Role.ADMIN)
  updateDishTypeById(
    @Args('id') id: string,
    @Args('input') input: UpdateDishTypeInput,
  ) {
    return this.dishTypesAdminService.update(id, input);
  }

  @Mutation(() => DishType, {
    name: 'deleteDishType',
    description: 'Delete a dish type',
  })
  @Auth(Role.ADMIN)
  deleteDishTypeById(@Args('id') id: string) {
    return this.dishTypesAdminService.remove(id);
  }
}
