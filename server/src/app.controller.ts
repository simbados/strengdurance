import {Controller, Headers, Request, UseGuards, Post, Body, Get, HttpStatus, HttpCode} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UserService} from './user/user.service';
import {UserDto} from './user/dto/user.dto';
import {User} from './user/interfaces/user';
import {AuthService} from './auth/auth.service';

@Controller('api/v1/')
export class AppController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
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
