import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { DietType, Difficulty, MealType, Unit } from '@repo/database';
import { Ingredient } from './ingredients/ingredients.models';

@ObjectType()
export class RecipeStep {
  @Field()
  id!: string;

  @Field(() => Int)
  order!: number;

  @Field()
  title!: string;

  @Field()
  instruction!: string;

  @Field({ nullable: true })
  mediaUrl?: string;
}

@ObjectType()
export class RecipeIngredient {
  @Field()
  id!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => Unit)
  unit!: Unit;

  @Field(() => Ingredient)
  ingredient!: Ingredient;
}

@ObjectType()
export class Tag {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;
}

@ObjectType()
export class RecipeTag {
  @Field(() => Tag)
  tag!: Tag;
}

@ObjectType()
export class Recipe {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field()
  slug!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  heroImage?: string;

  @Field(() => Difficulty)
  difficulty!: Difficulty;

  @Field(() => MealType, { nullable: true })
  mealType?: MealType;

  @Field(() => DietType, { nullable: true })
  dietType?: DietType;

  @Field(() => Int, { nullable: true })
  prepTimeMinutes?: number;

  @Field(() => Int, { nullable: true })
  cookTimeMinutes?: number;

  @Field(() => Int, { nullable: true })
  servings?: number;

  @Field(() => Int, { nullable: true })
  calories?: number;

  @Field(() => Int, { nullable: true })
  protein?: number;

  @Field(() => Int, { nullable: true })
  fat?: number;

  @Field(() => Int, { nullable: true })
  carbs?: number;

  @Field(() => Int, { nullable: true })
  fibers?: number;

  @Field({ nullable: true })
  authorId?: string;

  @Field(() => [RecipeStep], { nullable: true })
  steps?: RecipeStep[];

  @Field(() => [RecipeIngredient], { nullable: true })
  ingredients?: RecipeIngredient[];

  @Field(() => [RecipeTag], { nullable: true })
  tags?: RecipeTag[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
