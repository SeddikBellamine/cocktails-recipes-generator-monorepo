import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ApiKeyModule } from './api-key/api-key.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      authSource: 'admin'
    }),
    AuthModule,
    ApiKeyModule,
    RecipesModule
  ]
})
export class AppModule {}
