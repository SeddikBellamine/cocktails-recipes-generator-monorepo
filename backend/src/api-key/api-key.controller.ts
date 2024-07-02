import { Body, Controller, Post } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post('generate')
  async generateApiKey(
    @Body('userId') userId: string,
    @Body('permissions') permissions: string[]
  ) {
    const apiKey = await this.apiKeyService.generateApiKey(userId, permissions);
    return { apiKey };
  }

  @Post('validate')
  async validateApiKey(@Body('apiKey') apiKey: string) {
    const isValid = await this.apiKeyService.validateApiKey(apiKey);
    return { isValid };
  }

  @Post('permissions')
  async getPermissions(@Body('apiKey') apiKey: string) {
    const permissions = await this.apiKeyService.getPermissions(apiKey);
    return { permissions };
  }
}
