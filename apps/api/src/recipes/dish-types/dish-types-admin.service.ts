import { Injectable, NotFoundException } from '@nestjs/common';
import { handlePrismaError } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDishTypeInput,
  UpdateDishTypeInput,
} from './dish-types.input';

@Injectable()
export class DishTypesAdminService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.dishType.findMany();
  }

  async findOne(id: string) {
    const dishType = await this.prisma.dishType.findUnique({
      where: { id },
    });

    if (!dishType) {
      throw new NotFoundException(`DishType with ID ${id} not found`);
    }

    return dishType;
  }

  async create(data: CreateDishTypeInput) {
    try {
      return await this.prisma.dishType.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: UpdateDishTypeInput) {
    await this.findOne(id);

    try {
      return await this.prisma.dishType.update({
        where: { id },
        data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      return await this.prisma.dishType.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
