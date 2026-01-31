import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '@repo/database';

@ObjectType()
export class AuthUser {
  @Field()
  id!: string;

  @Field()
  email!: string;

  @Field(() => Role)
  role!: Role;
}

@ObjectType()
export class AuthResponse {
  @Field(() => AuthUser)
  user!: AuthUser;

  @Field()
  accessToken!: string;
}
