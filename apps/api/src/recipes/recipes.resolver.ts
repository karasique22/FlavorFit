import { Args, Query, Resolver } from '@nestjs/graphql';
import { RecipesQueryInput } from './inputs/recipes-query.input';
import { PaginatedRecipes, Recipe } from './models';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => PaginatedRecipes, {
    name: 'recipes',
    description: 'Get all recipes (public)',
  })
  getAllRecipes(@Args('input') input: RecipesQueryInput) {
    return this.recipesService.findAll(input);
  }

  @Query(() => Recipe, {
    name: 'recipeBySlug',
    description: 'Get a single recipe by slug (public)',
  })
  getRecipeBySlug(@Args('slug') slug: string) {
    return this.recipesService.findBySlug(slug);
  }
}
