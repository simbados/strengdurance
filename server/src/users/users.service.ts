import {Model} from 'mongoose';
import {Injectable, Logger, HttpException, HttpStatus} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from 'src/users/interfaces/users';
import {UserDto} from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {
  }

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

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.find({username}).exec();
  }

  async createNewUser(userDto: UserDto): Promise<User> {
    const hashedPW = await this.hashPassword(userDto.password);
    const createdUser = new this.userModel({username: userDto.username, hashedPassword: hashedPW});
    return await createdUser.save();
  }
}
