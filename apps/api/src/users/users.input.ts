import { ArgsType, Field, Float, InputType } from '@nestjs/graphql';
import { ActivityLevel, Gender, NutritionalGoal } from '@repo/database';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

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
