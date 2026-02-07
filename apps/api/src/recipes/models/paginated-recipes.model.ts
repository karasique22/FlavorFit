import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Recipe } from './recipe.model';

@ObjectType()
export class PaginatedRecipes {
  @Field(() => [Recipe])
  items!: Recipe[];

  @Field(() => Int)
  totalCount!: number;
}
