import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {ExerciseService} from './exercises.service';
import {Exercise} from './interfaces/exercises';
import {Category} from './categories';

describe('ExerciseService', () => {
        let exerciseService: ExerciseService;
        const exerciseMockData: Exercise[] = [
                {name: 'Curls', category: Category.Arms},
                {name: 'Pushdowns', category: Category.Arms},
                {name: 'Bench', category: Category.Chest},
        ];
        const mockDto = {name: 'Curls', category: Category.Arms};
        const mockExercises: Promise<Exercise[]> =
                new Promise<Exercise[]>((resolve, reject) => {
                        resolve(exerciseMockData);
                });
        class mockExerciseModel {
                constructor(private data) {
                }
                save() { return mockDto;}
                static find() {return mockExerciseModel};
                static exec() { return mockExercises };
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

        it('getAllExercises should return all stored exercises', async () => {
                const actualResult = await exerciseService.getAllExercises();
                expect(actualResult).toEqual(exerciseMockData)
        });

        it('postExercise should return the input DTO', async () => {
                const actualResult = await exerciseService.postExercise(mockDto);
                expect(actualResult).toEqual(mockDto)
        });
});
