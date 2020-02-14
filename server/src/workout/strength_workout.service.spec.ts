import {Test, TestingModule} from '@nestjs/testing';
import {StrengthWorkoutService} from './strength_workout.service';
import {getModelToken} from '@nestjs/mongoose';
import {
  StrengthWorkoutMockModel,
  strengthWorkoutMockData,
  strengthWorkoutMockDto,
  strengthWorkoutsBetweenDatesMock,
} from '../mocks/strength_workout_mock';
import ExerciseMockModel from '../mocks/exercise_mock';
import {testId} from '../mocks/exercise_mock_data';
import {StrengthWorkout} from './interfaces/strength_workout';
import {Logger} from '@nestjs/common';

describe('StrengthWorkoutService', () => {
  let service: StrengthWorkoutService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllStrengthWorkouts should return all strength workouts from DB', async () => {
    const actualResult = await service.getAllStrengthWorkouts();
    expect(actualResult).toEqual(strengthWorkoutMockData);
  });

  it('getStrengthWorkoutsInTimeFrame should return all strength workouts in between dates from DB', async () => {
    const spy = jest
      .spyOn(StrengthWorkoutMockModel, 'exec')
      .mockImplementationOnce(() => {
        return new Promise<StrengthWorkout[]>(resolve =>
          resolve(strengthWorkoutsBetweenDatesMock),
        );
      });
    const actualResult = await service.getStrengthWorkoutsInTimeFrame(
      new Date('2019-01-16'),
      new Date('2019-12-15'),
    );
    expect(spy).toHaveBeenCalledTimes(1);
    expect(actualResult).toEqual(strengthWorkoutsBetweenDatesMock);
  });

  it('createStrengthWorkout should return created strength workout', async () => {
    const actualResult = await service.createStrengthWorkout(
      strengthWorkoutMockDto[0],
    );
    expect(actualResult.date).toBeDefined();
    // The exercise should be swaped with the provided exercise id of the found db model
    // Because only the objectId reference is stored in the db
    const expectedExercises = [
      {...strengthWorkoutMockDto[0].allExercises[0], exercise: testId},
    ];
    expect(actualResult.allExercises).toEqual(expectedExercises);
  });
});
