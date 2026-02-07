import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '@repo/database';
import { Auth } from 'src/auth/auth.decorator';
import { IngredientsAdminService } from './ingredients-admin.service';
import {
  CreateIngredientInput,
  UpdateIngredientInput,
} from './ingredients.input';
import { Ingredient } from './ingredients.models';

@Resolver()
export class IngredientsAdminResolver {
  constructor(
    private readonly ingredientsAdminService: IngredientsAdminService,
  ) {}

  @Query(() => [Ingredient], {
    name: 'ingredients',
    description: 'Get all ingredients in the catalog (admin)',
  })
  @Auth(Role.ADMIN)
  getAllIngredients() {
    return this.ingredientsAdminService.findAll();
  }

  @Query(() => Ingredient, {
    name: 'ingredient',
    description: 'Get a single ingredient by ID (admin)',
  })
  @Auth(Role.ADMIN)
  getIngredientById(@Args('id') id: string) {
    return this.ingredientsAdminService.findOne(id);
  }

  @Mutation(() => Ingredient, {
    name: 'createIngredient',
    description: 'Create a new ingredient in the catalog',
  })
  @Auth(Role.ADMIN)
  createIngredient(@Args('input') input: CreateIngredientInput) {
    return this.ingredientsAdminService.create(input);
  }

  @Mutation(() => Ingredient, {
    name: 'updateIngredient',
    description: 'Update an existing ingredient',
  })
  @Auth(Role.ADMIN)
  updateIngredientById(
    @Args('id') id: string,
    @Args('input') input: UpdateIngredientInput,
  ) {
    return this.ingredientsAdminService.update(id, input);
  }

  @Mutation(() => Ingredient, {
    name: 'deleteIngredient',
    description: 'Delete an ingredient from the catalog',
  })
  @Auth(Role.ADMIN)
  deleteIngredientById(@Args('id') id: string) {
    return this.ingredientsAdminService.remove(id);
  }
}
