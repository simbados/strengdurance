import {Injectable, HttpException, HttpStatus, Logger} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {UserDto} from 'src/users/dto/user.dto';

const SALT_ROUNDS = 10;
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async hashPassword(password: string) {
    return new Promise(resolve => {
      bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
        if (err) {
          throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
          }
          resolve(hash);
        });
      });
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const hashedPW = await this.hashPassword(password);
    Logger.debug(`Hashed pw is ${hashedPW}`);
    const user = await this.usersService.findOne(username);
    if (user && user.hashedPassword === hashedPW) {
      const {hashedPassword, ...result} = user;
      return result;
    }
    return null;
  }
}
