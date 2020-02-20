import {Test, TestingModule} from '@nestjs/testing';
import {WorkoutController} from './workout.controller';
import {StrengthWorkoutService} from './strength_workout.service';
import {StrengthWorkout} from './interfaces/strength_workout';
import {StrengthWorkoutMockService, strengthWorkoutMockData, strengthWorkoutsBetweenDatesMock, strengthWorkoutMockDto} from '../mocks/strength_workout_mock';

describe('Workout Controller', () => {

  const userId = 'userId';
  const request = {user: {userId: userId}};

  let controller: WorkoutController;
  let service: StrengthWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutController],
      providers: [{
        provide: StrengthWorkoutService,
        useValue: new StrengthWorkoutMockService(),
      }]
    }).compile();

    controller = module.get<WorkoutController>(WorkoutController);
    service = module.get<StrengthWorkoutService>(StrengthWorkoutService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllWorkouts should return all workouts when called', async () => {
    const spy = jest.spyOn(service, 'getAllStrengthWorkouts').mockImplementation(() => {
      return new Promise<StrengthWorkout[]>((resolve) => resolve(strengthWorkoutMockData))
    });
    const actualResponse = await controller.getAllStrengthWorkouts(request);
    expect(spy).toBeCalledTimes(1);
    expect(actualResponse).toEqual(strengthWorkoutMockData);
  });

  it('getStrengthWorkoutsInTimeFrame should return all workouts in the specified timeframe', async () => {
    const spy = jest.spyOn(service, 'getStrengthWorkoutsInTimeFrame').mockImplementation(() => {
      return new Promise<StrengthWorkout[]>((resolve) => resolve(strengthWorkoutsBetweenDatesMock))
    });
    const actualResponse = await controller.getStrengthWorkoutsInTimeFrame(request, {startDate: new Date('2019-12-01'), endDate: new Date('2019-12-15')});
    expect(spy).toBeCalledTimes(1);
    expect(actualResponse).toEqual(strengthWorkoutsBetweenDatesMock);
  });

  it('createStrengthWorkout should return provided exercise when called', async () => {
    const spy = jest.spyOn(service, 'createStrengthWorkout').mockImplementation(() => {
      return new Promise<StrengthWorkout>((resolve) => resolve(strengthWorkoutMockData[0]))
    });
    const actualResponse = await controller.createStrengthWorkout(request, strengthWorkoutMockDto[0]);
    expect(spy).toBeCalledTimes(1);
    expect(actualResponse).toEqual(strengthWorkoutMockData[0]);
  });
});
