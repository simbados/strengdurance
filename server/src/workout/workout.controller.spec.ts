import {Test, TestingModule} from '@nestjs/testing';
import {WorkoutController} from './workout.controller';
import {StrengthWorkoutService} from './strength_workout.service';
import {StrengthWorkout} from './interfaces/strength_workout';
import {Exercise} from '../exercises/interfaces/exercises';
import Category from '../exercises/categories';

describe('Workout Controller', () => {
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

        let controller: WorkoutController;
        let service: StrengthWorkoutService;
        class StrengthWorkoutServiceMock {
                async getAllStrengthWorkouts(): Promise<StrengthWorkout[]> {
                        return [];
                }
                async createStrengthWorkout(): Promise<StrengthWorkout> {
                        return undefined;
                }
        }
        beforeEach(async () => {
                const module: TestingModule = await Test.createTestingModule({
                        controllers: [WorkoutController],
                        providers: [{
                                provide: StrengthWorkoutService,
                                useValue: new StrengthWorkoutServiceMock(),
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
                const actualResponse = await controller.getAllStrengthWorkouts();
                expect(spy).toBeCalledTimes(1);
                expect(actualResponse).toEqual(strengthWorkoutMockData);
        })

        it('createStrengthWorkout should return provided exercise when called', async () => {
                const spy = jest.spyOn(service, 'createStrengthWorkout').mockImplementation(() => {
                        return new Promise<StrengthWorkout>((resolve) => resolve(strengthWorkoutMockData[0]))
                });
                const actualResponse = await controller.createStrengthWorkout(strengthWorkoutMockData[0]);
                expect(spy).toBeCalledTimes(1);
                expect(actualResponse).toEqual(strengthWorkoutMockData[0]);
        })
});
