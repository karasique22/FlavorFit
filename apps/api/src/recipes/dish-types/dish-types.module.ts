import { Module } from '@nestjs/common';
import { DishTypesAdminResolver } from './dish-types-admin.resolver';
import { DishTypesAdminService } from './dish-types-admin.service';

@Module({
  providers: [DishTypesAdminResolver, DishTypesAdminService],
})
export class DishTypesModule {}
