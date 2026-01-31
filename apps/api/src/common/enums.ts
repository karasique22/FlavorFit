import { registerEnumType } from '@nestjs/graphql';
import { Role, Gender, NutritionalGoal, ActivityLevel  } from '@repo/database';

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
}
