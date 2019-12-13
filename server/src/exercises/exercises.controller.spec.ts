import {Test, TestingModule} from '@nestjs/testing';
import Category from './categories';
import {Exercise} from './interfaces/exercises';
import {ExerciseController} from './exercises.controller';
import {ExerciseService} from './exercises.service';

describe('Exercise Controller', () => {
        const exerciseMockData: Exercise[] = [
                {name: 'Curls', category: Category[0]},
                {name: 'Pushdowns', category: Category[0]},
                {name: 'Bench', category: Category[0]},
        ];
        let controller: ExerciseController;
        let service: ExerciseService;
        class ExerciseMockService {
                async getAllExercises(): Promise<Exercise[]> {
                        return [];
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
                console.log(actualResponse[0].category);
                expect(spy).toBeCalledTimes(1);
                expect(actualResponse).toEqual(exerciseMockData);
        })
});
