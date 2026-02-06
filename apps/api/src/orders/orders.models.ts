import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@repo/database';
import { Ingredient } from '../recipes/ingredients/ingredients.models';
import { Recipe } from '../recipes/models';

@ObjectType()
export class Courier {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  phoneNumber!: string;

  @Field()
  vehicleType!: string;
}

@ObjectType()
export class OrderItem {
  @Field()
  id!: string;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Int, { description: 'Unit price in cents' })
  unitPrice!: number;

  @Field(() => Int, { description: 'Line total in cents' })
  lineTotal!: number;

  @Field(() => Ingredient)
  ingredient!: Ingredient;

  @Field(() => Recipe, { nullable: true })
  recipe?: Recipe;
}

@ObjectType()
export class Order {
  @Field()
  id!: string;

  @Field()
  orderId!: string;

  @Field(() => Int, { description: 'Total price in cents' })
  totalPrice!: number;

  @Field(() => OrderStatus)
  status!: OrderStatus;

  @Field(() => [OrderItem])
  orderItems!: OrderItem[];

  @Field(() => Courier, { nullable: true })
  courier?: Courier;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
