import { Injectable, NotFoundException } from '@nestjs/common';
import { handlePrismaError } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeInput, UpdateRecipeInput } from './inputs/recipes.input';

@Injectable()
export class RecipesAdminService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly recipeWithRelationsInclude = {
    author: true,
    steps: {
      orderBy: {
        order: 'asc' as const,
      },
    },
    ingredients: {
      include: {
        ingredient: true,
      },
    },
  } as const;

  private nameToSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  async create(authorId: string, data: CreateRecipeInput) {
    const {
      steps: stepsInput,
      ingredients: ingredientsInput,
      tagNames,
      ...recipeData
    } = data;

    try {
      return await this.prisma.recipe.create({
        data: {
          ...recipeData,
          authorId,
          ...(stepsInput && {
            steps: {
              create: stepsInput,
            },
          }),
          ...(ingredientsInput && {
            ingredients: {
              create: ingredientsInput.map((item) => ({
                amount: item.amount,
                unit: item.unit,
                ingredientId: item.ingredientId,
              })),
            },
          }),
          ...(tagNames?.length && {
            tags: {
              create: tagNames.map((name) => ({
                tag: {
                  connectOrCreate: {
                    where: { slug: this.nameToSlug(name) },
                    create: {
                      name,
                      slug: this.nameToSlug(name),
                    },
                  },
                },
              })),
            },
          }),
        },
        include: this.recipeWithRelationsInclude,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: UpdateRecipeInput) {
    await this.findOne(id);

    const {
      steps: stepsInput,
      ingredients: ingredientsInput,
      tagNames,
      ...recipeData
    } = data;

    try {
      return await this.prisma.recipe.update({
        where: { id },
        data: {
          ...recipeData,
          ...(stepsInput && {
            steps: {
              deleteMany: {},
              create: stepsInput,
            },
          }),
          ...(ingredientsInput && {
            ingredients: {
              deleteMany: {},
              create: ingredientsInput.map((item) => ({
                amount: item.amount,
                unit: item.unit,
                ingredientId: item.ingredientId,
              })),
            },
          }),
          ...(tagNames?.length && {
            tags: {
              deleteMany: {},
              create: tagNames.map((name) => ({
                tag: {
                  connectOrCreate: {
                    where: { slug: this.nameToSlug(name) },
                    create: {
                      name,
                      slug: this.nameToSlug(name),
                    },
                  },
                },
              })),
            },
          }),
        },
        include: this.recipeWithRelationsInclude,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      return await this.prisma.recipe.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        author: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        steps: {
          orderBy: {
            order: 'asc',
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
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }
}
