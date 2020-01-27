import { StrengthWorkout } from '../workout/interfaces/strength_workout';
import { StrengthWorkoutDto } from '../workout/dto/strength_workout.dto';
import { exerciseMockData } from './exercise_mock';

const date = new Date();

const strengthWorkoutMockDto: StrengthWorkoutDto[] = [
  {
    allExercises: [
      {
        exercise: exerciseMockData[0],
        repetition: [8, 8, 8],
        weight: [80, 80, 80],
        comment: 'This is a test comment',
      },
    ],
  },
];

const strengthWorkoutMockData: StrengthWorkout[] = [
  {
    date,
    allExercises: [
      {
        exercise: exerciseMockData[0],
        repetition: [8, 8, 8],
        weight: [80, 80, 80],
        comment: 'This is a test comment',
      },
    ],
  },
];

const strengthWorkoutsBetweenDatesMock: StrengthWorkout[] = [
  {
    date: new Date('2019-12-14'),
    allExercises: [
      {
        exercise: exerciseMockData[0],
        repetition: [8, 8, 8],
        weight: [80, 80, 80],
        comment: 'This is a test comment',
      },
    ],
  },
];

class StrengthWorkoutMockService {
  async getAllStrengthWorkouts(): Promise<StrengthWorkout[]> {
    return [];
  }

  async getStrengthWorkoutsInTimeFrame(): Promise<StrengthWorkout[]> {
    return [];
  }

  async createStrengthWorkout(): Promise<StrengthWorkout> {
    return undefined;
  }
}

class StrengthWorkoutMockModel {
  constructor(private strengthWorkout: StrengthWorkout) {}
  save() {
    return this.strengthWorkout;
  }
  static find() {
    // Return an instance of mockStrengthWorkoutModel because the exec function is called thereafter
    return this;
  }
  static where() {
    return this;
  }
  static gte() {
    return this;
  }
  static lte() {
    return this;
  }
  static exec(): Promise<any> {
    return new Promise(resolve => resolve(strengthWorkoutMockData));
  }
}

export {
  StrengthWorkoutMockModel,
  strengthWorkoutMockData,
  strengthWorkoutMockDto,
  StrengthWorkoutMockService,
  strengthWorkoutsBetweenDatesMock,
};
