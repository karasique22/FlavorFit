import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesAdminResolver } from './recipes-admin.resolver';
import { RecipesAdminService } from './recipes-admin.service';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  providers: [
    RecipesResolver,
    RecipesService,
    RecipesAdminResolver,
    RecipesAdminService,
  ],
  imports: [IngredientsModule, FeedbackModule],
})
export class RecipesModule {}
