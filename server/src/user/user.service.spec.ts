import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import UserMockModel from '../mocks/user_mock';
import {getModelToken} from '@nestjs/mongoose';
import {userMockData, userMockDto} from '../mocks/user_mock_data';
import {ExerciseService} from '../exercises/exercises.service';
import ExerciseMockService from '../mocks/exercise_service_mock';

describe('UsersService', () => {
  let userService: UserService;
  let exerciseService: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: UserMockModel,
        },
        ExerciseService,
        {
          provide: ExerciseService,
          useValue: new ExerciseMockService(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    exerciseService = module.get<ExerciseService>(ExerciseService);
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

  it('createNewUser should create new user and return it', async () => {
    const spy = jest.spyOn(exerciseService, 'postExercise').mockImplementation();
    const user = await userService.createNewUser(userMockDto);
    // Expect Number of calls to be equal to initial exercise data
    expect(spy).toBeCalledTimes(38);
    expect(UserMockModel.callStack.filter(val => val === 'save').length).toEqual(1);
    expect(user).toEqual({username: userMockData.username, _id: userMockData._id, email: userMockData.email});
  });
});
