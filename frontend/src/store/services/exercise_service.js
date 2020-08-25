import axios from 'axios';
/* eslint-disable */

export class ExerciseService {
  static async getAllExercises() {
    const URL = `${process.env.SERVER_URL}/exercises/strength`;
    return axios.get(URL)
  }

  static async postExercise(exercise) {
    console.log('Send exercise in service', exercise)
    // const workoutDto = { allExercises: workout }
    const URL = `${process.env.SERVER_URL}/exercises/strength`;
    return axios.post(URL, exercise);
  }

  static async deleteExercises(exercises) {
    console.log('delete exercises in service', exercises)
    const allAnswers = [];
    exercises.forEach(exercise => {
      const URL = `${process.env.SERVER_URL}/exercises/strength/${exercise._id}`;
      allAnswers.push(axios.delete(URL));
    })
    return Promise.all(allAnswers);
  }
}
