import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { ApiKeyService } from '../api-key/api-key.service';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly apiKeyService: ApiKeyService
  ) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  async addRecipe(@Body() createRecipeDto: any, @Req() req) {
    const apiKey = req['apiKey'];
    const permissions = await this.apiKeyService.getPermissions(apiKey);
    if (!permissions.includes('addRecipe')) {
      throw new UnauthorizedException('Permission denied');
    }
    return this.recipesService.addRecipe(apiKey, createRecipeDto);
  }

  @Post('search')
  @UseGuards(ApiKeyGuard)
  async searchRecipes(@Body() searchDto: any, @Req() req) {
    const apiKey = req['apiKey'];
    const permissions = await this.apiKeyService.getPermissions(apiKey);
    if (!permissions.includes('viewRecipes')) {
      throw new UnauthorizedException('Permission denied');
    }
    return this.recipesService.searchRecipes(apiKey, searchDto.ingredients);
  }
}
