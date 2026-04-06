import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DishType {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;
}
