import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AuthService} from './auth/auth.service';
import {UserService} from './user/user.service';
import UserMockService from './mocks/user_service_mock';
import AuthMockService from './mocks/auth_service_mock';
import {jwt} from './mocks/blacklist_mock_data';
import {userMockData, userMockDto} from './mocks/user_mock_data';

describe('AppController', () => {

  let controller: AppController;
  let userService: UserService;
  let authService: AuthService;
  const userId = 'userId';
  const request = {user: {userId: userId}};
  let spy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: UserService,
          useValue: new UserMockService(),
        },
        {
          provide: AuthService,
          useValue: new AuthMockService(),
        }
      ]
    }).compile();

    controller = module.get<AppController>(AppController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    if (spy) spy.mockClear();
  });

  describe('root', () => {
    it('app controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('login should call authService and return login params from service', async () => {
      const expectedReturnValue = {access_token: jwt};
      spy = jest.spyOn(authService, 'login').mockReturnValueOnce(new Promise(resolve => resolve(expectedReturnValue)));
      const result = await controller.login(request);
      expect(result).toEqual(expectedReturnValue);
      expect(spy).toHaveReturnedTimes(1)
      expect(spy).toHaveBeenCalledWith(request.user);
    });

    it('create should call userService and return new user', async () => {
      const expectedReturnValue = {_id: userMockData._id, username: userMockData.username, email: userMockData.email};
      spy = jest.spyOn(userService, 'createNewUser').mockReturnValueOnce(new Promise(resolve => resolve(expectedReturnValue)));
      const result = await controller.create(userMockDto);
      expect(result).toEqual(expectedReturnValue);
      expect(spy).toHaveReturnedTimes(1)
      expect(spy).toHaveBeenCalledWith(userMockDto);
    });

    it('getProfile should return user profile', async () => {
      const result = await controller.getProfile(request);
      expect(result).toEqual(request.user);
    });

    it('logout should add bearer to blacklist and return empty string', async () => {
      const bearer = 'testBearer';
      const expectedReturnValue = '';
      spy = jest.spyOn(authService, 'addToBlacklist').mockReturnValueOnce(new Promise(resolve => resolve()));
      const result = await controller.logout(bearer);
      expect(result).toEqual(expectedReturnValue);
      expect(spy).toHaveReturnedTimes(1)
      expect(spy).toHaveBeenCalledWith(bearer);
    });
  });
});
