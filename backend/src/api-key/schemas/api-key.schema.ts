import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ApiKey extends Document {
  @Prop({ required: true })
  apiKey: string;

  @Prop([String])
  permissions: string[];

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  creationDate: Date;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
