import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@repo/database';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GqlThrottlerGuard } from 'src/common/guards/gql-throttler.guard';
import { Recipe } from './models';
import { RecipesAdminService } from './recipes-admin.service';
import { CreateRecipeInput, UpdateRecipeInput } from './recipes.input';

@Resolver()
@UseGuards(GqlThrottlerGuard)
@Throttle({ default: { ttl: 60000, limit: 30 } })
export class RecipesAdminResolver {
  constructor(private readonly recipesAdminService: RecipesAdminService) {}

  @Query(() => Recipe, {
    name: 'recipe',
    description: 'Get a single recipe by ID (admin)',
  })
  @Auth(Role.ADMIN)
  getRecipeById(@Args('id') id: string) {
    return this.recipesAdminService.findOne(id);
  }

  @Mutation(() => Recipe, {
    name: 'createRecipe',
    description: 'Create a new recipe',
  })
  @Auth(Role.ADMIN)
  createRecipe(
    @CurrentUser('id') userId: string,
    @Args('input') input: CreateRecipeInput,
  ) {
    return this.recipesAdminService.create(userId, input);
  }

  @Mutation(() => Recipe, {
    name: 'updateRecipe',
    description: 'Update an existing recipe',
  })
  @Auth(Role.ADMIN)
  updateRecipeById(
    @Args('id') id: string,
    @Args('input') input: UpdateRecipeInput,
  ) {
    return this.recipesAdminService.update(id, input);
  }

  @Mutation(() => Recipe, {
    name: 'deleteRecipe',
    description: 'Delete a recipe',
  })
  @Auth(Role.ADMIN)
  deleteRecipeById(@Args('id') id: string) {
    return this.recipesAdminService.remove(id);
  }
}
