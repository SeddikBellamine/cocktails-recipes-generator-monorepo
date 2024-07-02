import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import * as querystring from 'querystring';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  async googleAuth(
    @Req() req,
    @Query('sessionId') sessionId: string,
    @Res() res: Response
  ) {
    const googleOAuthUrl =
      'https://accounts.google.com/o/oauth2/auth?' +
      querystring.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL, // Ensure this matches your callback URL
        response_type: 'code',
        scope: 'email profile',
        state: sessionId
      });

    res.redirect(googleOAuthUrl);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Res() res: Response,
    @Query('state') sessionId: string
  ) {
    const user = req.user;
    await this.authService.processUser(user, sessionId);
    return res.send(`
      <html>
        <body>
          <h1>Successful Authorization</h1>
        </body>
      </html>
    `);
  }

  @Get('user-by-session')
  async getUserBySessionId(
    @Query('sessionId') sessionId: string,
    @Res() res: Response
  ) {
    const user = await this.authService.getUserBySessionId(sessionId);
    if (user) {
      return res.json({ googleId: user.googleId });
    }
    return res.json({ googleId: null, message: 'User not found' });
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}
