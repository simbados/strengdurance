import {Exercise} from '../exercises/interfaces/exercises'

export default class ExerciseMockService {
  async getAllExercises(): Promise<Exercise[]> {
    return [];
  }
  async getExercisesByCategory(): Promise<Exercise[]> {
    return [];
  }
  async postExercise(): Promise<Exercise> {
    return undefined;
  }
  async deleteStrengthExercise(): Promise<Exercise> {
    return undefined;
  }
}
