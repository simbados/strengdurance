/* eslint-disable */
import axios from 'axios';

export class WorkoutService {
  static async getAllStrengthWorkouts() {
    const URL = `${process.env.SERVER_URL}/workouts/strength`;
    return axios.get(URL);
  }
  static async postWorkout(workout) {
    console.log('Send workout in service', workout)
    // const workoutDto = { allExercises: workout }
    const URL = `${process.env.SERVER_URL}/workouts/strength`;
    return axios.post(URL, workout);
  }
}
