import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecipeStep {
  @Field(() => Int)
  order!: number;

  @Field()
  title!: string;

  @Field()
  instruction!: string;

  @Field({ nullable: true })
  mediaUrl?: string;
}
