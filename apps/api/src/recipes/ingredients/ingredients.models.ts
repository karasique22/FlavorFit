import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Unit } from '@repo/database';

@ObjectType()
export class Ingredient {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { description: 'Price in cents' })
  price!: number;

  @Field({ nullable: true })
  iconUrl?: string;

  @Field(() => Unit)
  defaultUnit!: Unit;
}
