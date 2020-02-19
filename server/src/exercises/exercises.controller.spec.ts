import {Test, TestingModule} from '@nestjs/testing';
import {Exercise} from './interfaces/exercises';
import {ExerciseController} from './exercises.controller';
import {ExerciseService} from './exercises.service';
import ExerciseMockService from '../mocks/exercise_service_mock';
import {exerciseMockData} from '../mocks/exercise_mock_data';

describe('Exercise Controller', () => {
  let controller: ExerciseController;
  let service: ExerciseService;
  const userId = 'userId';
  const request = {user: {userId: userId}};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [{
        provide: ExerciseService,
        useValue: new ExerciseMockService(),
      }]
    }).compile();

    controller = module.get<ExerciseController>(ExerciseController);
    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllExercises should return all exercises when called', async () => {
    const spy = jest.spyOn(service, 'getAllExercises').mockReturnValueOnce(
      new Promise<Exercise[]>((resolve) => resolve(exerciseMockData)));
    const actualResponse = await controller.getAllExercises(request);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(userId);
    expect(actualResponse).toEqual(exerciseMockData);
  })

  it('postExercise should return provided exercise when called', async () => {
    const spy = jest.spyOn(service, 'postExercise').mockReturnValueOnce(
      new Promise(resolve => resolve(exerciseMockData[0])));
    const actualResponse = await controller.postExercise(request, exerciseMockData[0]);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(exerciseMockData[0], userId);
    expect(actualResponse).toEqual(exerciseMockData[0]);
  })

  it('getExercisesByCategory should return expected exercises', async () => {
    const category = {category: 'Arms'};
    const expectedValues: Exercise[] = [exerciseMockData[0], exerciseMockData[1]]
    const spy = jest.spyOn(service, 'getExercisesByCategory').mockReturnValueOnce(
      new Promise<Exercise[]>(resolve => resolve(expectedValues)));
    const actualResponse = await controller.getExercisesByCategory(request, category);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Arms', userId);
    expect(actualResponse).toEqual(expectedValues);
  })
});
