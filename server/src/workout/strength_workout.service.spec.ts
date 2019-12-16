import {Test, TestingModule} from '@nestjs/testing';
import {StrengthWorkoutService} from './strength_workout.service';
import {getModelToken} from '@nestjs/mongoose';
import {StrengthWorkoutMockModel, strengthWorkoutMockData, strengthWorkoutMockDto} from '../mocks/strength_workout_mock';
import {ExerciseMockModel, testId} from '../mocks/exercise_mock';

describe('StrengthWorkoutService', () => {
        let service: StrengthWorkoutService;

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
        });

        it('should be defined', () => {
                expect(service).toBeDefined();
        });

        it('getAllStrengthWorkouts should return all strength workouts from DB', async () => {
                const actualResult = await service.getAllStrengthWorkouts();
                expect(actualResult).toEqual(strengthWorkoutMockData);
        });

        it('createStrengthWorkout should return created strength workout', async () => {
                const actualResult = await service.createStrengthWorkout(strengthWorkoutMockDto[0]);
                console.log('actual Result is, ', actualResult);
                expect(actualResult.date).toBeDefined();
                // The exercise should be swaped with the provided exercise id of the found db model
                // Because only the objectId reference is stored in the db
                const expectedExercises = [ { exercise: testId, repetition: strengthWorkoutMockDto[0].allExercises[0].repetition } ]
                expect(actualResult.allExercises).toEqual(expectedExercises);
        });
});
