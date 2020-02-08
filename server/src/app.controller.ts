import {Controller, Headers, Request, UseGuards, Post, Body, Get, HttpStatus, HttpCode} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from 'src/users/users.service';
import {UserDto} from 'src/users/dto/user.dto';
import {User} from 'src/users/interfaces/users';
import {AuthService} from 'src/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createNewUser(userDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('auth/logout')
  async logout(@Headers('authorization') bearer) {
    console.log('header is', bearer);
    await this.authService.addToBlacklist(bearer);
    return '';
  }
}
