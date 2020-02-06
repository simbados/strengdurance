import {Controller, Request, UseGuards, Post, Body} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from 'src/users/users.service';
import {UserDto} from 'src/users/dto/user.dto';
import {User} from 'src/users/interfaces/users';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('test')
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createNewUser(userDto);
  }

}
