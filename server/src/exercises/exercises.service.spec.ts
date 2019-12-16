import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {ExerciseService} from './exercises.service';
import {ExerciseMockModel, exerciseMockData} from '../mocks/exercise_mock';
import {HttpException, HttpStatus} from '@nestjs/common';
import {Exercise} from './interfaces/exercises';

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

        it('getExercisesByCategory should throw HttpException when category is not in the defined Array', async () => {
                try {
                        expect(await exerciseService.getExercisesByCategory('NotDefined')).rejects.toThrow();
                } catch (error) {
                        expect(error).toBeInstanceOf(HttpException);
                        expect((error as HttpException).getStatus()).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
                }
        });

        it('getAllExercises should return all stored exercises', async () => {
                const actualResult = await exerciseService.getAllExercises();
                expect(actualResult).toEqual(exerciseMockData)
        });

        it('postExercise should return the input DTO', async () => {
                const actualResult = await exerciseService.postExercise(exerciseMockData[0]);
                expect(actualResult).toEqual(exerciseMockData[0])
        });

        it('postExercise should throw Error when category of dto is not in the defined Array', async () => {
                try {
                        const errorfulMockdata = Object.assign({}, exerciseMockData[0], { ...exerciseMockData[0], category: 'NotDefined' });
                        console.log('errorfulMockData: , ', errorfulMockdata);
                        expect(await exerciseService.postExercise(errorfulMockdata)).rejects.toThrow();
                } catch (error) {
                        expect(error).toBeInstanceOf(HttpException);
                        expect((error as HttpException).getStatus()).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
                }
        });
});
