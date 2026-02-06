import { Field, ObjectType } from '@nestjs/graphql';

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
