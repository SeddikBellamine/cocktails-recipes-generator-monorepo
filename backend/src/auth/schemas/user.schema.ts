import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  googleId: string;

  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop()
  profilePicture: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop([String])
  permissions: string[];

  @Prop()
  sessionId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
