import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const user = {
      googleId: id,
      displayName,
      email: emails[0].value,
      profilePicture: photos[0].value,
      accessToken,
      refreshToken
    };
    done(null, user);
  }
}
