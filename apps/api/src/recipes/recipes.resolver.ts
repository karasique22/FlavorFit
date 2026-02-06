import { Args, Query, Resolver } from '@nestjs/graphql';
import { Recipe } from './models';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => [Recipe], {
    name: 'recipes',
    description: 'Get all recipes (public)',
  })
  getAllRecipes() {
    return this.recipesService.findAll();
  }

  @Query(() => Recipe, {
    name: 'recipeBySlug',
    description: 'Get a single recipe by slug (public)',
  })
  getRecipeBySlug(@Args('slug') slug: string) {
    return this.recipesService.findBySlug(slug);
  }
}
