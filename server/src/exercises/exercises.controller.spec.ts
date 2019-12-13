import {Test, TestingModule} from '@nestjs/testing';
import Category from './categories';
import {Exercise} from './interfaces/exercises';
import {ExerciseController} from './exercises.controller';
import {ExerciseService} from './exercises.service';

describe('Exercise Controller', () => {
        const exerciseMockData: Exercise[] = [
                {name: 'Curls', category: Category[0]},
                {name: 'Pushdowns', category: Category[0]},
                {name: 'Bench', category: Category[2]},
        ];
        let controller: ExerciseController;
        let service: ExerciseService;
        class ExerciseMockService {
                async getAllExercises(): Promise<Exercise[]> {
                        return [];
                }
                async getExercisesByCategory(): Promise<Exercise[]> {
                        return [];
                }
                async postExercise(): Promise<Exercise> {
                        return undefined;
                }
        }
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
                const spy = jest.spyOn(service, 'getAllExercises').mockImplementation(() => {
                        return new Promise<Exercise[]>((resolve) => resolve(exerciseMockData))
                });
                const actualResponse = await controller.getAllExercises();
                expect(spy).toBeCalledTimes(1);
                expect(actualResponse).toEqual(exerciseMockData);
        })

        it('postExercise should return provided exercise when called', async () => {
                const spy = jest.spyOn(service, 'postExercise').mockImplementation(() => {
                        return new Promise<Exercise>((resolve) => resolve(exerciseMockData[0]))
                });
                const actualResponse = await controller.postExercise(exerciseMockData[0]);
                expect(spy).toBeCalledTimes(1);
                expect(actualResponse).toEqual(exerciseMockData[0]);
        })

        it('getExercisesByCategory should return expected exercises', async () => {
                const expectedValues: Exercise[] = [exerciseMockData[0], exerciseMockData[1]]
                const spy = jest.spyOn(service, 'getExercisesByCategory').mockImplementation(() => {
                        return new Promise<Exercise[]>((resolve) => resolve(expectedValues))
                });
                const actualResponse = await controller.getExercisesByCategory('Arms');
                expect(spy).toBeCalledTimes(1);
                expect(actualResponse).toEqual(expectedValues);
        })
});
