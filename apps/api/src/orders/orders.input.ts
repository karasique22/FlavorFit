import { Field, InputType, Int } from '@nestjs/graphql';
import { OrderStatus } from '@repo/database';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

@InputType()
export class OrderItemInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  ingredientId!: string;

  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [OrderItemInput])
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[];
}

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
