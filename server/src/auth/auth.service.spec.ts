import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import UserMockService from '../mocks/user_service_mock';
import BlacklistMockModel from '../mocks/blacklist_mock';
import blackListMockData from '../mocks/blacklist_mock_data';
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

  class jwtMockService {
    static sign() {
      return '';
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
    bcryptSpy = jest.spyOn(bcrypt, 'compare');
    userServiceSpy = jest.spyOn(userService, 'findOne');
  });

  afterEach(() => {
    bcryptSpy.mockClear();
    userServiceSpy.mockClear();
    BlacklistMockModel.reset();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('validateUser should return userObject without password', async () => {
    userServiceSpy.mockReturnValueOnce(
      new Promise(resolve => resolve([modelUser])));
    const result = await authService.validateUser(userMockDto.username, userMockDto.password);
    expect(result).toEqual({username: modelUser.username, email: modelUser.email});
    expect(bcryptSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toBeCalledWith(userMockDto.username);
    expect(bcryptSpy).toBeCalledWith(userMockDto.password, modelUser.hashedPassword);
  });

  it('validateUser should return null if password is incorrect', async () => {
    const falsePassword = 'falsePw';
    userServiceSpy.mockReturnValueOnce(
      new Promise(resolve => resolve([modelUser])));
    const result = await authService.validateUser(userMockDto.username, falsePassword);
    expect(result).toEqual(null);
    expect(bcryptSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toBeCalledWith(userMockDto.username);
    expect(bcryptSpy).toBeCalledWith(falsePassword, modelUser.hashedPassword);
  });

  it('validateUser should return null if user is not found', async () => {
    userServiceSpy.mockReturnValueOnce(
      new Promise(resolve => resolve([])));
    const result = await authService.validateUser(userMockDto.username, userMockDto.password);
    expect(result).toEqual(null);
    expect(bcryptSpy).toHaveBeenCalledTimes(0);
    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(userServiceSpy).toBeCalledWith(userMockDto.username);
  });

  it('checkBlacklist should return true if jwt is found in blacklist', async () => {
    const blackListFindOneSpy = jest.spyOn(BlacklistMockModel, 'findOne');
    const blackListExecSpy = jest.spyOn(BlacklistMockModel, 'exec').mockReturnValueOnce(new Promise(resolve => resolve(blackListMockData)));
    const result = await authService.checkBlacklist('Bearer ' + blackListMockData.jwt);
    expect(result).toEqual(true);
    expect(blackListFindOneSpy).toHaveBeenCalledTimes(1);
    expect(blackListFindOneSpy).toBeCalledWith({jwt: blackListMockData.jwt});
    expect(blackListExecSpy).toHaveBeenCalledTimes(1);
    blackListExecSpy.mockClear();
    blackListFindOneSpy.mockClear();
  });

  it('checkBlacklist should return false if jwt is not found in blacklist', async () => {
    const blackListFindOneSpy = jest.spyOn(BlacklistMockModel, 'findOne');
    const blackListExecSpy = jest.spyOn(BlacklistMockModel, 'exec').mockReturnValueOnce(new Promise(resolve => resolve([])));
    const result = await authService.checkBlacklist('Bearer ' + blackListMockData.jwt);
    expect(result).toEqual(false);
    expect(blackListFindOneSpy).toHaveBeenCalledTimes(1);
    expect(blackListFindOneSpy).toBeCalledWith({jwt: blackListMockData.jwt});
    expect(blackListExecSpy).toHaveBeenCalledTimes(1);
    blackListExecSpy.mockClear();
    blackListFindOneSpy.mockClear();
  });

  it('addToBlacklist should save jwt in database', async () => {
    await authService.addToBlacklist('Bearer ' + blackListMockData.jwt);
    // Can not spy with jest here because it is an instance function not a static one, use call stack from origin mock here
    expect(BlacklistMockModel.callStack.filter(val => val === 'save').length).toEqual(1);
    expect(BlacklistMockModel.constructorParams).toEqual({jwt: blackListMockData.jwt});
  });

  it('login should return jwt', async () => {
    const signSpy = jest.spyOn(jwtMockService, 'sign').mockReturnValue(blackListMockData.jwt)
    await authService.login(userMockData);
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(signSpy).toHaveBeenCalledWith({username: userMockData.username, sub: userMockData._id});
  });
});
