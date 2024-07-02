import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeyModule } from '../api-key/api-key.module'; // Import the ApiKeyModule
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    ApiKeyModule
  ],
  providers: [RecipesService],
  controllers: [RecipesController]
})
export class RecipesModule {}
