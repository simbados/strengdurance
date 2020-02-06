import {Injectable, Logger} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {User} from 'src/users/interfaces/users';
/* import {JwtService} from '@nestjs/jwt'; */

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    Logger.debug(`Validate user with username ${username} and pw ${password}`);
    const user = await this.usersService.findOne(username);
    if (user) {
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
  /* async login(user: any) { */
  /*   const payload = {username: user.username, sub: user.userId}; */
  /*   return { */
  /*     access_token: this.jwtService.sign(payload), */
  /*   }; */
  /* } */
}
