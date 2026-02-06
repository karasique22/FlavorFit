import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Unit } from '@repo/database';
import { Ingredient } from '../ingredients/ingredients.models';

@ObjectType()
export class RecipeIngredient {
  @Field(() => Float)
  amount!: number;

  @Field(() => Unit)
  unit!: Unit;

  @Field(() => Ingredient)
  ingredient!: Ingredient;
}
