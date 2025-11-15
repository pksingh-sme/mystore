import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor() {
    // Only initialize Google Strategy if credentials are provided
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          'http://localhost:3000/auth/google/callback',
        scope: ['email', 'profile'],
        passReqToCallback: false,
      });
    } else {
      // Log a warning but don't throw an error
      Logger.warn(
        'Google OAuth credentials not provided. Google login will be disabled.',
      );
      // We still need to call super() to avoid constructor errors
      // But we'll make it fail gracefully by providing dummy values
      super({
        clientID: 'disabled',
        clientSecret: 'disabled',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      });
    }
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, name, emails } = profile;
    return {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };
  }
}
