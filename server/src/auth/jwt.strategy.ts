import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, HttpStatus, HttpException} from '@nestjs/common';
import {AuthService} from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: any) {
    console.log('validate jwt strat', payload);
    const bearer = request.headers.authorization;
    const isBlacklisted = await this.authService.checkBlacklist(bearer);
    if (isBlacklisted) {
      throw new HttpException('JWT token is blacklisted', HttpStatus.UNAUTHORIZED);
    }
    return {userId: payload.sub, username: payload.username};
  }
}
