import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '@repo/database';
import { Auth } from 'src/auth/auth.decorator';
import {
  CreateIngredientInput,
  UpdateIngredientInput,
} from './ingredients.input';
import { Ingredient } from './ingredients.models';
import { IngredientsService } from './ingredients.service';

@Resolver()
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(() => [Ingredient], {
    name: 'ingredients',
    description: 'Get all ingredients in the catalog',
  })
  @Auth(Role.ADMIN)
  getAllIngredients() {
    return this.ingredientsService.findAll();
  }

  @Query(() => Ingredient, {
    name: 'ingredient',
    description: 'Get a single ingredient by ID',
  })
  @Auth(Role.ADMIN)
  getIngredientById(@Args('id') id: string) {
    return this.ingredientsService.findOne(id);
  }

  @Mutation(() => Ingredient, {
    name: 'createIngredient',
    description: 'Create a new ingredient in the catalog',
  })
  @Auth(Role.ADMIN)
  createIngredient(@Args('input') input: CreateIngredientInput) {
    return this.ingredientsService.create(input);
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
    return this.ingredientsService.update(id, input);
  }

  @Mutation(() => Ingredient, {
    name: 'deleteIngredient',
    description: 'Delete an ingredient from the catalog',
  })
  @Auth(Role.ADMIN)
  deleteIngredientById(@Args('id') id: string) {
    return this.ingredientsService.remove(id);
  }
}
