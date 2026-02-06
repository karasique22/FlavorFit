import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { DietType, Difficulty, MealType, Unit } from '@repo/database';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateRecipeInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  slug!: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  heroImage?: string;

  @Field(() => Difficulty, { defaultValue: Difficulty.EASY })
  @IsEnum(Difficulty)
  @IsOptional()
  difficulty?: Difficulty;

  @Field(() => MealType, { nullable: true })
  @IsEnum(MealType)
  @IsOptional()
  mealType?: MealType;

  @Field(() => DietType, { nullable: true })
  @IsEnum(DietType)
  @IsOptional()
  dietType?: DietType;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  prepTimeMinutes?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  cookTimeMinutes?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  servings?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  calories?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  protein?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  fat?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  carbs?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  fibers?: number;

  @Field(() => [CreateRecipeStepInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeStepInput)
  @IsOptional()
  steps?: CreateRecipeStepInput[];

  @Field(() => [CreateRecipeIngredientInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeIngredientInput)
  @IsOptional()
  ingredients?: CreateRecipeIngredientInput[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @IsOptional()
  tagNames?: string[];
}

@InputType()
export class CreateRecipeStepInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  order!: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  instruction!: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  mediaUrl?: string;
}

@InputType()
export class CreateRecipeIngredientInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  ingredientId!: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  amount!: number;

  @Field(() => Unit, { defaultValue: Unit.GRAM })
  @IsEnum(Unit)
  @IsOptional()
  unit?: Unit;
}

@InputType()
export class UpdateRecipeInput extends PartialType(CreateRecipeInput) {}
