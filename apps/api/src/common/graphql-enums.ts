import { registerEnumType } from '@nestjs/graphql';
import {
  ActivityLevel,
  DietType,
  Difficulty,
  Gender,
  MealType,
  NutritionalGoal,
  OrderStatus,
  Role,
  Unit,
} from '@repo/database';

export function registerGraphQLEnums() {
  registerEnumType(Role, {
    name: 'Role',
    description: 'User role in the system',
  });

  registerEnumType(Gender, {
    name: 'Gender',
    description: 'User gender',
  });

  registerEnumType(NutritionalGoal, {
    name: 'NutritionalGoal',
    description: 'Nutritional goal for the user',
  });

  registerEnumType(ActivityLevel, {
    name: 'ActivityLevel',
    description: 'User activity level',
  });

  registerEnumType(Unit, {
    name: 'Unit',
    description: 'Measurement unit for ingredients',
  });

  registerEnumType(Difficulty, {
    name: 'Difficulty',
    description: 'Recipe difficulty level',
  });

  registerEnumType(MealType, {
    name: 'MealType',
    description: 'Type of meal (breakfast, lunch, dinner, etc.)',
  });

  registerEnumType(DietType, {
    name: 'DietType',
    description: 'Dietary restriction or preference',
  });

  registerEnumType(OrderStatus, {
    name: 'OrderStatus',
    description: 'Status of an order',
  });
}
