import {Model} from 'mongoose';
import {Injectable, Logger} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {User} from 'src/users/interfaces/users';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {Blacklist} from './interfaces/blacklist'

@Injectable()
export class AuthService {
  constructor(@InjectModel('Blacklist') private readonly blacklistModel: Model<Blacklist>, private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    Logger.debug(`Validate user with username ${username} and pw ${password}`);
    const user = await this.usersService.findOne(username);
    if (user[0]) {
      const userObject: User = user[0].toObject();
      Logger.debug(`Is user in db? ${userObject}`);
      const isCorrectPW = await bcrypt.compare(password, userObject.hashedPassword);
      Logger.debug(`Hashed pw is correct? ${isCorrectPW}`);
      if (isCorrectPW) {
        const {hashedPassword, ...result} = userObject;
        return result;
      }
    }
    return null;
  }

  async checkBlacklist(bearer: string) {
    const extractedJwt = this.extractJwt(bearer);
    console.log('extractedJwt', extractedJwt);
    const model = await this.blacklistModel.findOne({jwt: extractedJwt}).exec();
    console.log('checkBlacklist', model);
    if (model !== null && model.length !== 0) {
      return true;
    }
    return false;
  }

  async addToBlacklist(bearer: string) {
    const extractedJwt = this.extractJwt(bearer)
    console.log('add to blacklist extractedJwt', extractedJwt);
    const createdBlacklistModel = new this.blacklistModel({jwt: extractedJwt});
    await createdBlacklistModel.save();
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user._id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  extractJwt(bearer: string) {
    const extractedJwt = bearer.split('Bearer ')[1];
    return extractedJwt;
  }
}
