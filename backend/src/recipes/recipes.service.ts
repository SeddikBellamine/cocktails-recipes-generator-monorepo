import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiKeyService } from '../api-key/api-key.service';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    private apiKeyService: ApiKeyService
  ) {}

  async addRecipe(apiKey: string, recipe: any): Promise<Recipe> {
    const permissions = await this.apiKeyService.getPermissions(apiKey);
    if (!permissions.includes('addRecipe')) {
      throw new UnauthorizedException('Permission denied');
    }
    recipe.ingredients = recipe.ingredients.map((ingredient: string) =>
      ingredient.toLowerCase()
    );
    const newRecipe = new this.recipeModel(recipe);
    return newRecipe.save();
  }

  async searchRecipes(
    apiKey: string,
    ingredients: string[]
  ): Promise<Recipe[]> {
    const permissions = await this.apiKeyService.getPermissions(apiKey);
    if (!permissions.includes('viewRecipes')) {
      throw new UnauthorizedException('Permission denied');
    }
    const normalizedIngredients = ingredients.map((ingredient) =>
      ingredient.toLowerCase()
    );
    return this.recipeModel
      .find({ ingredients: { $all: normalizedIngredients } })
      .exec();
  }
}
