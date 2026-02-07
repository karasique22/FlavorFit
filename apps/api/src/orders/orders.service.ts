import { BadRequestException, Injectable } from '@nestjs/common';
import { Ingredient } from '@repo/database';
import { handlePrismaError } from 'src/common/utils/prisma-error.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderInput, OrderItemInput } from './orders.input';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly ORDER_INCLUDE = {
    orderItems: {
      include: {
        ingredient: true,
        recipe: true,
      },
    },
    courier: true,
  } as const;

  findAll(userId: string) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: this.ORDER_INCLUDE,
    });
  }

  async create(userId: string, input: CreateOrderInput) {
    const ingredientMap = await this.validateAndFetchIngredients(input.items);
    const orderItemsData = this.buildOrderItems(input.items, ingredientMap);
    const totalPrice = orderItemsData.reduce(
      (sum, item) => sum + item.lineTotal,
      0,
    );

    try {
      return await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            totalPrice,
            user: { connect: { id: userId } },
            orderItems: { create: orderItemsData },
          },
          include: this.ORDER_INCLUDE,
        });

        const orderId = this.generateOrderId(order.orderNumber);

        await tx.order.update({
          where: { id: order.id },
          data: { orderId },
        });

        return { ...order, orderId };
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  private async validateAndFetchIngredients(
    items: OrderItemInput[],
  ): Promise<Map<string, Ingredient>> {
    const ingredientIds = items.map((item) => item.ingredientId);
    const uniqueIds = [...new Set(ingredientIds)];

    const ingredients = await this.prisma.ingredient.findMany({
      where: { id: { in: uniqueIds } },
    });

    if (ingredients.length !== uniqueIds.length) {
      const foundIds = new Set(ingredients.map((ing) => ing.id));
      const missingIds = uniqueIds.filter((id) => !foundIds.has(id));
      throw new BadRequestException(
        `Ingredients not found: ${missingIds.join(', ')}`,
      );
    }

    return new Map(ingredients.map((ing) => [ing.id, ing]));
  }

  private buildOrderItems(
    items: OrderItemInput[],
    ingredientMap: Map<string, Ingredient>,
  ) {
    return items.map((item) => {
      const ingredient = ingredientMap.get(item.ingredientId)!;
      const unitPrice = ingredient.price;
      const lineTotal = unitPrice * item.quantity;

      return {
        quantity: item.quantity,
        unitPrice,
        lineTotal,
        ingredient: { connect: { id: item.ingredientId } },
      };
    });
  }

  private generateOrderId(orderNumber: number): string {
    return `ORD-${String(orderNumber).padStart(6, '0')}`;
  }
}
