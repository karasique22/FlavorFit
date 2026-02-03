import { registerEnumType } from '@nestjs/graphql';
import {
  ActivityLevel,
  Gender,
  NutritionalGoal,
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
}
