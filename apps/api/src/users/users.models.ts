import { Field, ObjectType, Float, InputType, ArgsType } from '@nestjs/graphql';
import { Gender, NutritionalGoal, ActivityLevel, Role } from '@repo/database';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  avatar?: string;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  gender?: Gender;

  @Field({ nullable: true })
  @IsOptional()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  socials?: string[];

  @Field(() => NutritionalGoal, { nullable: true })
  @IsOptional()
  nutritionalGoal?: NutritionalGoal;

  @Field(() => ActivityLevel, { nullable: true })
  @IsOptional()
  activityLevel?: ActivityLevel;
}

@InputType()
export class UpdateBodyMeasurementsInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  height?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  weight?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  waistCircumference?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  chestMeasurement?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  thighCircumference?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  armCircumference?: number;
}

@ArgsType()
export class UpdateUserProfileArgs {
  @Field(() => UpdateProfileInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfileInput)
  profile?: UpdateProfileInput;

  @Field(() => UpdateBodyMeasurementsInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateBodyMeasurementsInput)
  measurements?: UpdateBodyMeasurementsInput;
}
