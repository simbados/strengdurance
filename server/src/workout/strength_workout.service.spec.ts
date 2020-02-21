import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import ExerciseMockModel from '../mocks/exercise_mock';
import { exerciseMockModelData, testId } from '../mocks/exercise_mock_data';
import {
  strengthWorkoutMockDto,
  StrengthWorkoutMockModel,
  strengthWorkoutMockData,
} from '../mocks/strength_workout_mock';
import { StrengthWorkoutService } from './strength_workout.service';

describe('StrengthWorkoutService', () => {
  let service: StrengthWorkoutService;

  const userId = 'TestUser';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StrengthWorkoutService,
        {
          provide: getModelToken('Exercise'),
          useValue: ExerciseMockModel,
        },
        {
          provide: getModelToken('StrengthWorkout'),
          useValue: StrengthWorkoutMockModel,
        },
      ],
    }).compile();

    service = module.get<StrengthWorkoutService>(StrengthWorkoutService);
    StrengthWorkoutMockModel.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllStrengthWorkouts should return all strength workouts from DB', async () => {
    await service.getAllStrengthWorkouts(userId);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'find').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'select').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'populate')
        .length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'exec').length,
    ).toEqual(1);
  });

  it('getStrengthWorkoutsInTimeFrame should return all strength workouts in between dates from DB', async () => {
    await service.getStrengthWorkoutsInTimeFrame(
      userId,
      new Date('2019-01-16'),
      new Date('2019-12-15'),
    );
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'find').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'select').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'populate')
        .length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'where').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'gte').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'lte').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'exec').length,
    ).toEqual(1);
  });

  it('createStrengthWorkout should return created strength workout', async () => {
    const exerciseSpy = jest.spyOn(ExerciseMockModel, 'exec');
    exerciseSpy.mockImplementation(() => {
      return new Promise(resolve =>
        resolve({ ...exerciseMockModelData[0], _id: testId }),
      );
    });
    const actualResult = await service.createStrengthWorkout(
      userId,
      strengthWorkoutMockDto[0],
    );
    // The exercise should be swaped with the provided exercise id of the found db model
    // Because only the objectId reference is stored in the db
    // The _id and other unnecessary fields are also returned from the mock as it should
    // only provide the assurance that the correct data is returned
    expect(actualResult).toEqual(strengthWorkoutMockData);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'find').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'select').length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'populate')
        .length,
    ).toEqual(1);
    expect(
      StrengthWorkoutMockModel.callStack.filter(val => val === 'exec').length,
    ).toEqual(1);
  });
});
