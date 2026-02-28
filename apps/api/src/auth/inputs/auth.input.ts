import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @IsEmail()
  email!: string;

  @MinLength(6)
  @MaxLength(100)
  @Field()
  password!: string;
}
