import { Injectable, NotFoundException } from '@nestjs/common';
import { handlePrismaError } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeInput, UpdateRecipeInput } from './recipes.input';

@Injectable()
export class RecipesAdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: string, data: CreateRecipeInput) {
    try {
      return await this.prisma.recipe.create({
        data: {
          ...data,
          authorId,
        },
        include: {
          author: true,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: UpdateRecipeInput) {
    await this.findOne(id);

    try {
      return await this.prisma.recipe.update({
        where: { id },
        data,
        include: {
          author: true,
        },
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
