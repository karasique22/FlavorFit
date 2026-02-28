import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/users.models'

@ObjectType()
export class AuthResponse {
	@Field(() => User)
	user!: User

	@Field(() => String, { nullable: true })
	accessToken?: string
}
