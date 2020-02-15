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
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'find').length).toEqual(1);
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'select').length).toEqual(1);
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'populate').length).toEqual(1);
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'exec').length).toEqual(1);
  });

  it('getStrengthWorkoutsInTimeFrame should return all strength workouts in between dates from DB', async () => {
    await service.getStrengthWorkoutsInTimeFrame(
      userId,
      new Date('2019-01-16'),
      new Date('2019-12-15'),
    );
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'find').length).toEqual(1);
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'where').length).toEqual(1);
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'gte').length).toEqual(1);
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'lte').length).toEqual(1);
    expect(StrengthWorkoutMockModel.callStack.filter(val => val === 'exec').length).toEqual(1);
  });

  it('createStrengthWorkout should return created strength workout', async () => {
    const expectedExercises = [
      {...strengthWorkoutMockDto[0].allExercises[0], exercise: testId},
    ];
    const spy = jest.spyOn(StrengthWorkoutMockModel, 'exec');
    spy.mockImplementation(() => {
      return new Promise(resolve => resolve(expectedExercises))
    });
    const actualResult = await service.createStrengthWorkout(
      userId,
      strengthWorkoutMockDto[0],
    );
    console.log('exercisemodel', ExerciseMockModel.exec());
    console.log(actualResult);
    expect(actualResult.date).toBeDefined();
    // The exercise should be swaped with the provided exercise id of the found db model
    // Because only the objectId reference is stored in the db
    expect(actualResult.allExercises).toEqual(expectedExercises);
  });
});
