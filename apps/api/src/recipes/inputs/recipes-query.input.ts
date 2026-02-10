import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from 'src/common/dto/pagination.input';

export enum RecipeSortType {
  NEW = 'new',
  RECOMMENDED = 'recommended',
  POPULAR = 'popular',
}

@InputType()
export class RecipesQueryInput extends PaginationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(RecipeSortType)
  sort?: RecipeSortType;
}
