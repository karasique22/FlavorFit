import { z } from 'zod'

import { ActivityLevel, Gender, NutritionalGoal } from '@/__generated__/graphql'

export const profileFormSchema = z.object({
	profile: z.object({
		fullName: z.string().nullish(),
		gender: z.enum(Gender).nullish(),
		age: z.number().min(1).max(120).nullish(),
		bio: z.string().max(500).nullish(),
		socials: z.array(z.string()).nullish(),
		avatarUrl: z.string().nullish(),
		activityLevel: z.enum(ActivityLevel).nullish(),
		nutritionalGoal: z.enum(NutritionalGoal).nullish()
	}),
	measurements: z
		.object({
			height: z.number().positive().nullish(),
			weight: z.number().positive().nullish(),
			goalWeight: z.number().positive().nullish(),
			chestMeasurement: z.number().positive().nullish(),
			waistCircumference: z.number().positive().nullish(),
			thighCircumference: z.number().positive().nullish(),
			armCircumference: z.number().positive().nullish()
		})
		.nullish()
})

export type ProfileForm = z.infer<typeof profileFormSchema>
