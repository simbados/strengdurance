import { Exercise } from '../exercises/interfaces/exercises';
import Category from '../exercises/categories';

const testId: string = 'testId';

const exerciseMockData: Exercise[] = [
  { name: 'Curls', category: Category[0] },
  { name: 'Pushdowns', category: Category[0] },
  { name: 'Bench', category: Category[2] },
];

const mockExercises: Promise<Exercise[]> = new Promise<Exercise[]>(resolve => {
  resolve(exerciseMockData);
});

class ExerciseMockService {
  async getAllExercises(): Promise<Exercise[]> {
    return [];
  }
  async getExercisesByCategory(): Promise<Exercise[]> {
    return [];
  }
  async postExercise(): Promise<Exercise> {
    return undefined;
  }
}

// Very generic mock model, should be replaced with easy to maintain solution.
// Maybe just provide functions and then let jest handle the mock implementation.
class ExerciseMockModel {
  static _id: string = undefined;
  constructor(private exercise: Exercise) {}
  save() {
    return this.exercise;
  }
  static find(data, searchParams) {
    if (data === undefined) {
      return this;
    } else if (searchParams === undefined) {
      return exerciseMockData[2];
    } else {
      this._id = testId;
      return this;
    }
  }
  static select() {
    return this;
  }
  static findOne() {
    this._id = testId;
    return this;
  }
  static exec() {
    return this._id === undefined ? mockExercises : { _id: this._id };
  }
}

export { ExerciseMockService, ExerciseMockModel, exerciseMockData, testId };
