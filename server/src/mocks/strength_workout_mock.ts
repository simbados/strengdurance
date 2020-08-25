import {StrengthWorkout} from '../workout/interfaces/strength_workout';
import {StrengthWorkoutDto} from '../workout/dto/strength_workout.dto';
import {exerciseMockModelData, exerciseMockData} from './exercise_mock_data';
import {userMockData} from './user_mock_data';
import {strengthWorkoutDbModel} from './dbModel_mock_data';

const date = new Date();

const strengthWorkoutMockDto: StrengthWorkoutDto[] = [
  {
    allExercises: [
      {
        exerciseDefinition: {name: exerciseMockModelData[0].name, category: exerciseMockModelData[0].category},
        repetition: [8, 8, 8],
        weight: [80, 80, 80],
        comment: 'This is a test comment',
      },
    ],
  },
];

const strengthWorkoutMockData: StrengthWorkout[] = [
  {
    _id: 12,
    user: userMockData,
    date,
    allExercises: [
      {
        _id: 1,
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
    _id: 12,
    user: userMockData,
    date: new Date('2019-12-14'),
    allExercises: [
      {
        _id: 1,
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
  constructor() {}
  static callStack = [];
  save() {
    StrengthWorkoutMockModel.callStack.push('save');
    return strengthWorkoutDbModel;
  }
  static find() {
    this.callStack.push('find');
    // Return an instance of mockStrengthWorkoutModel because the exec function is called thereafter
    return this;
  }
  static where() {
    this.callStack.push('where');
    return this;
  }
  static select() {
    this.callStack.push('select');
    return this;
  }
  static populate() {
    this.callStack.push('populate');
    return this;
  }
  static gte() {
    this.callStack.push('gte');
    return this;
  }
  static lte() {
    this.callStack.push('lte');
    return this;
  }
  static exec(): Promise<any> {
    this.callStack.push('exec');
    return new Promise(resolve => resolve(strengthWorkoutMockData));
  }
  static reset() {
    this.callStack = [];
  }
}

export {
  StrengthWorkoutMockModel,
  strengthWorkoutMockData,
  strengthWorkoutMockDto,
  StrengthWorkoutMockService,
  strengthWorkoutsBetweenDatesMock,
};
