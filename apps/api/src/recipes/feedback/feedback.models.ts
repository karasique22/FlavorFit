import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/users.models';

@ObjectType()
export class Comment {
  @Field()
  id!: string;

  @Field()
  content!: string;

  @Field(() => User)
  author!: User;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class ToggleLikeResponse {
  @Field(() => Boolean)
  liked!: boolean;
}
