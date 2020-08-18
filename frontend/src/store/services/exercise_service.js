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
    const URL = `${process.env.SERVER_URL}/exercises/strength`;
    exercises.forEach(exercise => {
      const exerciseToDelete = { name: exercise.name, category: exercise.category };
      axios.delete(URL, { data: exerciseToDelete });
    })
  }
}
