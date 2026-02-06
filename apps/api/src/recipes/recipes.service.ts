import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const recipes = await this.prisma.recipe.findMany({
      include: {
        author: true,
        comments: true,
      },
    });

    const recipesWithLikesCount = await Promise.all(
      recipes.map(async (recipe) => this.enrichWithLikesCount(recipe)),
    );

    return recipesWithLikesCount;
  }

  async findBySlug(slug: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { slug },
      include: {
        author: true,
        steps: {
          orderBy: {
            order: 'asc',
          },
        },
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with slug ${slug} not found`);
    }

    return this.enrichWithLikesCount(recipe);
  }

  private async enrichWithLikesCount<T extends { id: string }>(
    recipe: T,
  ): Promise<T & { likesCount: number }> {
    const likesCount = await this.prisma.like.count({
      where: { recipeId: recipe.id },
    });
    return {
      ...recipe,
      likesCount,
    };
  }
}
