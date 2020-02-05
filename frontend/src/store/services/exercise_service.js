import axios from 'axios';
/* eslint-disable */

export class ExerciseService {
  static getAllExercises() {
    const URL = `${process.env.SERVER_URL}/exercises/strength`;
    return axios.get(URL)
  }
  static postExercise(exercise) {
    console.log('Send exercise in service', exercise)
    // const workoutDto = { allExercises: workout }
    const URL = `${process.env.SERVER_URL}/exercises/strength`;
    return axios.post(URL, exercise);
  }
}
