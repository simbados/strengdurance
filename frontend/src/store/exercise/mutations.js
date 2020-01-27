export function saveExercises(state, loadedExercises) {
  // eslint-disable-next-line
  console.log('loaded Exercises is, ', loadedExercises);
  state.exercises = loadedExercises;
  let exercisesNames = [];
  let exercisesCategories = [];
  loadedExercises.forEach(exercise => {
    exercisesNames.push(exercise.name);
    exercisesCategories.push(exercise.category);
  });

  state.exercisesNames = exercisesNames;
  state.exercisesCategories = exercisesCategories;
}
