import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ActivityLevel, Gender, NutritionalGoal, Role } from '@repo/database';

@ObjectType()
export class BodyMeasurements {
  @Field()
  id!: string;

  @Field(() => Float, { nullable: true })
  height?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field(() => Float, { nullable: true })
  waistCircumference?: number;

  @Field(() => Float, { nullable: true })
  chestMeasurement?: number;

  @Field(() => Float, { nullable: true })
  thighCircumference?: number;

  @Field(() => Float, { nullable: true })
  armCircumference?: number;

  @Field()
  createdAt!: Date;
}

@ObjectType()
export class Profile {
  @Field()
  id!: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [String], { nullable: true })
  socials?: string[];

  @Field(() => [BodyMeasurements])
  bodyMeasurements!: BodyMeasurements[];

  @Field(() => NutritionalGoal, { nullable: true })
  nutritionalGoal?: NutritionalGoal;

  @Field(() => ActivityLevel, { nullable: true })
  activityLevel?: ActivityLevel;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field()
  email!: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => Role)
  role!: Role;
}
