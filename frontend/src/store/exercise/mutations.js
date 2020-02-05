import { Category } from '../../models/categories_english';
/* eslint-disable */
export function saveExercises(state, loadedExercises) {
  console.log('loaded Exercises is, ', loadedExercises);
  state.exercises = loadedExercises;
  let exercisesNames = [];
  loadedExercises.forEach(exercise => {
    exercisesNames.push(exercise.name);
  });
  state.exercisesNames = exercisesNames;
  state.exercisesCategories = Category;
  console.log('categories', state.exercisesCategories);
}

export function addExercise(state, exercise) {
  state.exercisesNames.push(exercise.name);
  state.exercises.push(exercise);
}
