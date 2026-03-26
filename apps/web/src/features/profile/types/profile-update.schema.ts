import { z } from 'zod'

import { ActivityLevel, Gender, NutritionalGoal } from '@/__generated__/graphql'

const positiveFloat = (min: number, max: number, unit: string) =>
	z
		.number()
		.min(min, `Must be at least ${min} ${unit}`)
		.max(max, `Must be at most ${max} ${unit}`)
		.nullish()

export const profileFormSchema = z.object({
	profile: z.object({
		fullName: z.string().max(100, 'Name must be at most 100 characters').nullish(),
		gender: z.enum(Gender).nullish(),
		age: z
			.number()
			.int('Age must be a whole number')
			.min(1, 'Age must be between 1 and 120')
			.max(120, 'Age must be between 1 and 120')
			.nullish(),
		bio: z.string().max(500, 'Bio must be at most 500 characters').nullish(),
		socials: z.array(z.object({ value: z.url('Must be a valid URL') })).nullish(),
		avatarUrl: z.string().nullish(),
		activityLevel: z.enum(ActivityLevel).nullish(),
		nutritionalGoal: z.enum(NutritionalGoal).nullish()
	}),
	measurements: z
		.object({
			height: positiveFloat(50, 300, 'cm'),
			weight: positiveFloat(20, 500, 'kg'),
			goalWeight: positiveFloat(20, 500, 'kg'),
			chestMeasurement: positiveFloat(10, 300, 'cm'),
			waistCircumference: positiveFloat(10, 300, 'cm'),
			thighCircumference: positiveFloat(10, 300, 'cm'),
			armCircumference: positiveFloat(10, 300, 'cm')
		})
		.nullish()
})

export type ProfileForm = z.infer<typeof profileFormSchema>
