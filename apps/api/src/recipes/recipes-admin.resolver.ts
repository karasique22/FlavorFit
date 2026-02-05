import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '@repo/database';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RecipesAdminService } from './recipes-admin.service';
import { CreateRecipeInput, UpdateRecipeInput } from './recipes.input';
import { Recipe } from './recipes.models';

@Resolver()
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
