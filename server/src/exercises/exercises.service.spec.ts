import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {ExerciseService} from './exercises.service';
import {exerciseMockModelData} from '../mocks/exercise_mock_data';
import exerciseDefaultData from './exercise_data';
import Category from '../exercises/categories';
import ExerciseMockModel from '../mocks/exercise_mock';
import {HttpException, HttpStatus} from '@nestjs/common';

const userId = 'TestUser';

describe('ExerciseService', () => {
  let exerciseService: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        {
          provide: getModelToken('Exercise'),
          useValue: ExerciseMockModel,
        },
      ],
    }).compile();

    exerciseService = module.get<ExerciseService>(ExerciseService);
    ExerciseMockModel.reset();
  });

  it('should be defined', () => {
    expect(exerciseService).toBeDefined();
  });

  it('getExercisesByCategory should call the appropriate moongose model functions', async () => {
    const category = Category[0];
    await exerciseService.getExercisesByCategory(category, userId);

    expect(ExerciseMockModel.findCount).toEqual(1);
    expect(ExerciseMockModel.execCount).toEqual(1);
    expect(ExerciseMockModel.findParams).toEqual({category, user: userId});
  });

  it('getExercisesByCategory should throw HttpException when category is not in the defined Array', async () => {
    try {
      expect(await exerciseService.getExercisesByCategory('NotDefined', userId)).rejects.toThrow();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect((error as HttpException).getStatus()).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    }
  });

  it('getAllExercises should return all stored exercises including the default exercises!', async () => {
    const actualResult = await exerciseService.getAllExercises(userId);
    expect(ExerciseMockModel.findCount).toEqual(1);
    expect(ExerciseMockModel.execCount).toEqual(1);
    expect(ExerciseMockModel.selectCount).toEqual(1);
    expect(actualResult).toEqual(expect.arrayContaining(exerciseDefaultData));
  });

  it('postExercise should call save method of mongoose model', async () => {
    await exerciseService.postExercise(exerciseMockModelData[0], userId);
    expect(ExerciseMockModel.saveCount).toEqual(1);
  });

  it('postExercise should throw Error when category of dto is not in the defined Array', async () => {
    try {
      const errorfulMockdata = Object.assign({}, exerciseMockModelData[0], {...exerciseMockModelData[0], category: 'NotDefined'});
      expect(await exerciseService.postExercise(errorfulMockdata, userId)).rejects.toThrow();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect((error as HttpException).getStatus()).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    }
  });
});
