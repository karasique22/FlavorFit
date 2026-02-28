import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType()
export class ResetPasswordInput {
	@IsNotEmpty()
	@Field()
	token!: string

	@MinLength(6)
	@MaxLength(100)
	@Field()
	newPassword!: string
}
