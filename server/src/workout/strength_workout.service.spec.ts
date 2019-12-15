import {Test, TestingModule} from '@nestjs/testing';
import {StrengthWorkoutService} from './strength_workout.service';
import {getModelToken} from '@nestjs/mongoose';
import {Exercise} from '../exercises/interfaces/exercises';
import Category from '../exercises/categories';
import {StrengthWorkout} from './interfaces/strength_workout';
// TODO: Implement
describe('StrengthWorkoutService', () => {
        let service: StrengthWorkoutService;

        const exerciseMockData: Exercise[] = [
                {name: 'Curls', category: Category[0]},
                {name: 'Pushdowns', category: Category[0]},
                {name: 'Bench', category: Category[2]},
        ];
        const date = new Date();

        const strengthWorkoutMockData: StrengthWorkout[] = [
                {
                        date,
                        allExercises: [
                                {exercise: exerciseMockData[0], repetition: [8, 8, 8]}
                        ],
                },
        ];

        class mockStrengthWorkoutModel {
                constructor(private data) {
                }
                save() {return strengthWorkoutMockData[0];}
                static find() {
                        // Return an insance of mockStrengthWorkoutModel because the exec function is called thereafter
                        return this;
                };
                static exec() {return strengthWorkoutMockData};
        }

        beforeEach(async () => {
                const module: TestingModule = await Test.createTestingModule({
                        providers: [
                                StrengthWorkoutService,
                                {
                                        provide: getModelToken('StrengthWorkout'),
                                        useValue: mockStrengthWorkoutModel,
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

        it('createStrengthWorkout should return created strength workout', async () => {
               const actualResult = await service.createStrengthWorkout(strengthWorkoutMockData[0]);
               expect(actualResult).toEqual(strengthWorkoutMockData[0]);
        });
});
