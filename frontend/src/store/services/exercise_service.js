import axios from 'axios';
/* eslint-disable */

export class ExerciseService {
  static getAllExercises() {
    return new Promise(resolve => {
      console.log('process env is, ', process.env);
      const URL = `${process.env.SERVER_URL}/exercises/strength`;
      axios.get(URL).then(response => {
        console.log(response.data);
        resolve(response.data);
      });
    });
  }
  static postExercise(exercise) {
    console.log('Send exercise in service', exercise)
    // const workoutDto = { allExercises: workout }
    const URL = `${process.env.SERVER_URL}/exercises/strength`;
    return axios.post(URL, exercise);
  }
}
