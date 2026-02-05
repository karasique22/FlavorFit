import { Module } from '@nestjs/common';
import { IngredientsAdminResolver } from './ingredients-admin.resolver';
import { IngredientsAdminService } from './ingredients-admin.service';

@Module({
  providers: [IngredientsAdminResolver, IngredientsAdminService],
})
export class IngredientsModule {}
