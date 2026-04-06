import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DietType, Difficulty, MealType } from '@repo/database';
import { User } from 'src/users/users.models';
import { DishType } from '../dish-types/dish-types.model';
import { RecipeIngredient } from './recipe-ingredient.model';
import { RecipeStep } from './recipe-step.model';
import { RecipeTag } from './recipe-tag.model';

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
  imageUrl?: string;

  @Field(() => Difficulty)
  difficulty!: Difficulty;

  @Field(() => MealType, { nullable: true })
  mealType?: MealType;

  @Field(() => DietType, { nullable: true })
  dietType?: DietType;

  @Field(() => DishType, { nullable: true })
  dishType?: DishType;

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

  @Field(() => User, { nullable: true })
  author?: User;

  @Field(() => [RecipeStep], { nullable: true })
  steps?: RecipeStep[];

  @Field(() => [RecipeIngredient], { nullable: true })
  ingredients?: RecipeIngredient[];

  @Field(() => [RecipeTag], { nullable: true })
  tags?: RecipeTag[];

  @Field(() => Int)
  views!: number;

  @Field(() => Int)
  likesCount!: number;

  @Field()
  createdAt!: Date;
}
