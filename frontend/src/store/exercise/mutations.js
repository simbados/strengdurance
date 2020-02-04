export function saveExercises(state, loadedExercises) {
  // eslint-disable-next-line
  console.log('loaded Exercises is, ', loadedExercises);
  state.exercises = loadedExercises;
  let exercisesNames = [];
  let exercisesCategories = new Set();
  loadedExercises.forEach(exercise => {
    exercisesNames.push(exercise.name);
    exercisesCategories.add(exercise.category);
  });
  state.exercisesNames = exercisesNames;
  state.exercisesCategories = Array.from(exercisesCategories);
}

export function addExercise(state, exercise) {
  state.exercisesNames.push(exercise.name);
  state.exercises.push(exercise);
}
