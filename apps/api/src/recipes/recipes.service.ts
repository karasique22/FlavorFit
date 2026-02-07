import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(skip = 0, take = 20) {
    const where = { isPublished: true };

    const [recipes, totalCount] = await Promise.all([
      this.prisma.recipe.findMany({
        where,
        skip,
        take,
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
