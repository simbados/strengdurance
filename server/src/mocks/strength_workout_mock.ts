import {StrengthWorkout} from "../workout/interfaces/strength_workout";
import {StrengthWorkoutDto} from "../workout/dto/strength_workout.dto";
import {exerciseMockData} from "./exercise_mock";

const date = new Date();

const strengthWorkoutMockDto: StrengthWorkoutDto[] = [
        {
                allExercises: [
                        {exercise: exerciseMockData[0], repetition: [8, 8, 8]}
                ],
        },
];

const strengthWorkoutMockData: StrengthWorkout[] = [
        {
                date,
                allExercises: [
                        {exercise: exerciseMockData[0], repetition: [8, 8, 8]}
                ],
        },
];

class StrengthWorkoutMockService {
        async getAllStrengthWorkouts(): Promise<StrengthWorkout[]> {
                return [];
        }
        async createStrengthWorkout(): Promise<StrengthWorkout> {
                return undefined;
        }
}

class StrengthWorkoutMockModel {
        constructor(private strengthWorkout: StrengthWorkout) {
        }
        save() {return this.strengthWorkout;}
        static find() {
                // Return an instance of mockStrengthWorkoutModel because the exec function is called thereafter
                return this;
        };
        static exec() {return strengthWorkoutMockData};
}

export {StrengthWorkoutMockModel, strengthWorkoutMockData, strengthWorkoutMockDto, StrengthWorkoutMockService}
