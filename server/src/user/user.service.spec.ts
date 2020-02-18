import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import UserMockModel from '../mocks/user_mock';
import {getModelToken} from '@nestjs/mongoose';
import {userMockData, userMockDto} from '../mocks/user_mock_data';

describe('UsersService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: UserMockModel,
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('hashPassword should return hashed Pw', async () => {
    const hashedPw = await userService.hashPassword('test');
    // Can only be checked for the initial characters, because the hashing is salted
    expect(hashedPw).toContain('$2b$10$');
  });

  it('findOne should call find on model', async () => {
    await userService.findOne('test');
    expect(UserMockModel.callStack.filter(val => val === 'find').length).toEqual(1);
    expect(UserMockModel.callStack.filter(val => val === 'exec').length).toEqual(1);
  });

  it('createNewUser should create new user', async () => {
    await userService.createNewUser(userMockDto);
    expect(UserMockModel.callStack.filter(val => val === 'find').length).toEqual(1);
    expect(UserMockModel.callStack.filter(val => val === 'exec').length).toEqual(1);
  });
});
