import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import UserMockService from '../mocks/user_service_mock';
import BlacklistMockModel from '../mocks/blacklist_mock';
import {JwtService} from '@nestjs/jwt';
import {userMockData, userMockDto} from '../mocks/user_mock_data';
import {User} from '../user/interfaces/user';
const bcrypt = require('bcrypt');

const user = {username: userMockData.username, hashedPassword: userMockData.hashedPassword, email: userMockData.email};
const modelUser: User = {...user, toObject() {return user} };

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let bcryptSpy;
  let userServiceSpy;
  const jwtMockService = function () {
    function sign() {
      return 'testJwt';
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: new UserMockService(),
        },
        AuthService,
        {
          provide: JwtService,
          useValue: jwtMockService,
        },
        {
          provide: getModelToken('Blacklist'),
          useValue: BlacklistMockModel,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    /* bcryptSpy = jest.spyOn(bcrypt, 'compare'); */
    userServiceSpy = jest.spyOn(userService, 'findOne');
  });

  afterEach(() => {
    /* bcryptSpy.mockClear(); */
    userServiceSpy.mockClear();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('validateUser should return userObject without password', async () => {
    const userServiceSpy = jest.spyOn(userService, 'findOne').mockReturnValueOnce(
      new Promise(resolve => resolve([modelUser])));
    const result = await authService.validateUser(userMockDto.username, userMockDto.password);
    expect(result).toEqual({username: modelUser.username, email: modelUser.email});
    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toBeCalledWith(userMockDto.username);
  });

  it('validateUser should return null if password is incorrect', async () => {
    /* bcryptSpy.mockReturnValueOnce(false); */
    userServiceSpy.mockReturnValueOnce(
      new Promise(resolve => resolve([modelUser])));
    const result = await authService.validateUser(userMockDto.username, 'falsePw');
    expect(result).toEqual(null);
    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toBeCalledWith(userMockDto.username);
  });
});
