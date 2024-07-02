import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiKey } from './schemas/api-key.schema';

@Injectable()
export class ApiKeyService {
  constructor(@InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>) {}

  async generateApiKey(userId: string, permissions: string[]): Promise<string> {
    const token = uuidv4();

    const newApiKey = new this.apiKeyModel({
      apiKey: token,
      permissions,
      userId
    });
    await newApiKey.save();

    return token;
  }

  async validateApiKey(token: string): Promise<boolean> {
    const apiKey = await this.apiKeyModel.findOne({ apiKey: token }).exec();
    return !!apiKey;
  }

  async getPermissions(token: string): Promise<string[]> {
    const apiKey = await this.apiKeyModel.findOne({ apiKey: token }).exec();
    return apiKey ? apiKey.permissions : [];
  }
}
