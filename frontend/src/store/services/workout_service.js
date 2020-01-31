import axios from 'axios';
/* eslint-disable */

export class WorkoutService {
  static getAllStrengthWorkouts() {
    const URL = `${process.env.SERVER_URL}/workouts/strength`;
    return axios.get(URL);
  }
  static postWorkout(workout) {
    const workoutDto = { allExercises: workout }
    const URL = `${process.env.SERVER_URL}/workouts/strength`;
    return axios.post(URL, workoutDto);
  }
}
