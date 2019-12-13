import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {ExerciseService} from './exercises.service';
import {Exercise} from './interfaces/exercises';
import Category from './categories';

describe('ExerciseService', () => {
        let exerciseService: ExerciseService;
        const exerciseMockData: Exercise[] = [
                {name: 'Curls', category: Category[0]},
                {name: 'Pushdowns', category: Category[2]},
                {name: 'Bench', category: Category[1]},
        ];
        const mockDto = {name: 'Curls', category: Category[0]};
        const mockExercises: Promise<Exercise[]> =
                new Promise<Exercise[]>((resolve) => {
                        resolve(exerciseMockData);
                });
        class mockExerciseModel {
                constructor(private data) {
                }
                save() {return mockDto;}
                static find(category: string) {
                        if (category == undefined) {
                                return this;
                        } else {
                                return {name: 'Bench', category: Category[1]};
                        }
                };
                static exec() {return mockExercises};
        }
        beforeEach(async () => {
                const module: TestingModule = await Test.createTestingModule({
                        providers: [
                                ExerciseService,
                                {
                                        provide: getModelToken('Exercise'),
                                        useValue: mockExerciseModel,
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
                expect(actualResult).toEqual({name: 'Bench', category: Category[1]});
        });

        it('getAllExercises should return all stored exercises', async () => {
                const actualResult = await exerciseService.getAllExercises();
                expect(actualResult).toEqual(exerciseMockData)
        });

        it('postExercise should return the input DTO', async () => {
                const actualResult = await exerciseService.postExercise(mockDto);
                expect(actualResult).toEqual(mockDto)
        });
});
