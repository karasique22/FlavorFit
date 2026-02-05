import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { DietType, Difficulty, MealType } from '@repo/database';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  MinLength,
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
}

@InputType()
export class UpdateRecipeInput extends PartialType(CreateRecipeInput) {}
