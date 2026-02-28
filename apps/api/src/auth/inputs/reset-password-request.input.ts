import { Field, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
export class ResetPasswordRequestInput {
	@IsEmail()
	@Field()
	email!: string
}
