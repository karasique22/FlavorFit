import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CommentCreateInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  content!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  recipeId!: string;
}

@InputType()
export class CommentUpdateInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  content!: string;
}
