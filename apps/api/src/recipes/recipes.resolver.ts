import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Recipe } from './models';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => [Recipe], {
    name: 'recipes',
    description: 'Get all recipes (public)',
  })
  getAllRecipes(
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 20 }) take: number,
  ) {
    return this.recipesService.findAll(skip, take);
  }

  @Query(() => Recipe, {
    name: 'recipeBySlug',
    description: 'Get a single recipe by slug (public)',
  })
  getRecipeBySlug(@Args('slug') slug: string) {
    return this.recipesService.findBySlug(slug);
  }
}
