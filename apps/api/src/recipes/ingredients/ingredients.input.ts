import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Unit } from '@repo/database';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateIngredientInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @Field(() => Number)
  @IsNumber()
  @IsPositive()
  price!: number;

  @Field(() => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  iconUrl?: string;

  @Field(() => Unit, { nullable: true })
  @IsEnum(Unit)
  @IsOptional()
  defaultUnit?: Unit;
}

@InputType()
export class UpdateIngredientInput extends PartialType(CreateIngredientInput) {}
