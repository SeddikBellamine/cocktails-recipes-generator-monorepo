import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async processUser(user: any, sessionId: string) {
    console.log(sessionId);
    const existingUser = await this.userModel.findOne({
      googleId: user.googleId
    });
    if (existingUser) {
      existingUser.accessToken = user.accessToken;
      existingUser.refreshToken = user.refreshToken;
      existingUser.sessionId = sessionId;
      await existingUser.save();
    } else {
      const newUser = new this.userModel({
        ...user,
        permissions: ['default'],
        sessionId
      });
      await newUser.save();
    }
  }

  async getUserBySessionId(sessionId: string): Promise<User> {
    return this.userModel.findOne({ sessionId }).exec();
  }
}
