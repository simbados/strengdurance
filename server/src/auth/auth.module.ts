import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from 'src/user/user.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from 'src/auth/local.strategy';
import {JwtModule} from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import {JwtStrategy} from 'src/auth/jwt.strategy';
import {MongooseModule} from '@nestjs/mongoose';
import {BlacklistSchema} from 'src/auth/schemas/blacklist.schema';
import {GoogleStrategy} from './google.strategy';

dotenv.config();

@Module({

  imports: [
    MongooseModule.forFeature([{name: 'Blacklist', schema: BlacklistSchema}]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: `${process.env.JWT_EXPIRY}s`},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
