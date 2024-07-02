import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { ApiKeyService } from '../api-key/api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('Missing API key');
    }

    const isValid = await this.apiKeyService.validateApiKey(apiKey);

    if (!isValid) {
      throw new UnauthorizedException('Invalid API key');
    }

    request['apiKey'] = apiKey;
    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return undefined;
    }

    return token;
  }
}
