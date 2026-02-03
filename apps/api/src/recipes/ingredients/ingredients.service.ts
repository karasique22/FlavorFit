import { Injectable, NotFoundException } from '@nestjs/common';
import { handlePrismaError } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateIngredientInput,
  UpdateIngredientInput,
} from './ingredients.input';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ingredient.findMany();
  }

  async findOne(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return ingredient;
  }

  async create(data: CreateIngredientInput) {
    try {
      return await this.prisma.ingredient.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error);
      throw error;
    }
  }

  async update(id: string, data: UpdateIngredientInput) {
    await this.findOne(id);

    try {
      return await this.prisma.ingredient.update({
        where: { id },
        data,
      });
    } catch (error) {
      handlePrismaError(error);
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      return await this.prisma.ingredient.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
