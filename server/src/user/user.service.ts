import {Model} from 'mongoose';
import {Injectable, Logger, HttpException, HttpStatus} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from 'src/user/interfaces/user';
import {UserDto} from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
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

  async findOne(username: string): Promise<[User] | undefined> {
    return await this.userModel.find({username}).exec();
  }

  async createNewUser(userDto: UserDto): Promise<User> {
    const hashedPW = await this.hashPassword(userDto.password);
    const createdUser = new this.userModel({username: userDto.username, hashedPassword: hashedPW, email: userDto.email});
    let storedUser: Model<User>;
    try {
      storedUser = await createdUser.save();
    } catch (error) {
      if (error.errmsg.includes('duplicate')) {
        throw new HttpException(error.errmsg, HttpStatus.CONFLICT);
      }
      throw new HttpException(`Can not store user in db ${error.errormsg}`, HttpStatus.BAD_REQUEST);
    }
    const {hashedPassword, __v, ...rest} = storedUser.toObject();
    return rest;
  }
}
