import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { getPaginationParams } from 'src/common/utils/pagination.util';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RecipeSortType,
  RecipesQueryInput,
} from './inputs/recipes-query.input';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ page, limit, searchTerm, sort }: RecipesQueryInput) {
    const where: Prisma.RecipeWhereInput = {
      isPublished: true,
      ...(searchTerm && {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          {
            ingredients: {
              some: {
                ingredient: {
                  name: { contains: searchTerm, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      }),
    };

    const { skip, take } = getPaginationParams(page, limit);

    const [recipes, totalCount] = await Promise.all([
      this.prisma.recipe.findMany({
        where,
        skip,
        take,
        orderBy: this.getOrderBy(sort),
        include: {
          author: true,
          comments: true,
          _count: { select: { likes: true } },
        },
      }),
      this.prisma.recipe.count({ where }),
    ]);

    return {
      items: recipes.map((recipe) => ({
        ...recipe,
        likesCount: recipe._count.likes,
      })),
      totalCount,
    };
  }

  private getOrderBy(sort?: string) {
    switch (sort) {
      case RecipeSortType.RECOMMENDED:
        return { likes: { _count: Prisma.SortOrder.desc } };

      case RecipeSortType.POPULAR:
        return { views: Prisma.SortOrder.desc };

      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  }

  async findBySlug(slug: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { slug, isPublished: true },
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
        _count: { select: { likes: true } },
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with slug ${slug} not found`);
    }

    return {
      ...recipe,
      likesCount: recipe._count.likes,
    };
  }
}
