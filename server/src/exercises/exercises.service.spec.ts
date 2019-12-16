import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {ExerciseService} from './exercises.service';
import {ExerciseMockModel, exerciseMockData} from '../mocks/exercise_mock';

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
                console.log('exercise Service is: ');
        });

        it('should be defined', () => {
                expect(exerciseService).toBeDefined();
        });

        it('getExercisesByCategory should return only the data with the correct category', async () => {
                const actualResult = await exerciseService.getExercisesByCategory('Chest');
                expect(actualResult).toEqual(exerciseMockData[2]);
        });

        it('getAllExercises should return all stored exercises', async () => {
                const actualResult = await exerciseService.getAllExercises();
                expect(actualResult).toEqual(exerciseMockData)
        });

        it('postExercise should return the input DTO', async () => {
                const actualResult = await exerciseService.postExercise(exerciseMockData[0]);
                expect(actualResult).toEqual(exerciseMockData[0])
        });
});
