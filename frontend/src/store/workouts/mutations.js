import { WorkoutModelBuilder } from '../../models/workoutModel';
import {ExerciseModelBuilder} from '../../models/exerciseModel';
/* eslint-disable */

export function saveWorkouts(state, loadedWorkouts) {
  console.log('loaded Workouts are, ', loadedWorkouts);
  const workoutModelBuilder = new WorkoutModelBuilder();
  const exerciseModelBuilder = new ExerciseModelBuilder();
  let workoutsModel = [];
  // Refactor into own mapper
  for (let i = 0; i < loadedWorkouts.length; i++) {
    const date = loadedWorkouts[i].date;
    const exercises = [];
    loadedWorkouts[i].allExercises.forEach(element => {
      const exerciseModel = exerciseModelBuilder
      .setWeight(element.weight)
      .setRepetition(element.repetition)
      .setExerciseDefinition(element.exercise)
      .setComment(element.comment)
      .build();
      exercises.push(exerciseModel);
    });
    console.log('exercises after filling ', exercises);
    const workout = workoutModelBuilder.setDate(date).setExercises(exercises).build();
    console.log('workouts after filling ', workout);
    workoutsModel.push(workout);
  }
  console.log('saved Workouts are, ', workoutsModel);
  state.workouts = workoutsModel;
}

export function storeUserWorkout(state, workoutToStore) {
  // eslint-disable-next-line
  console.log('workout to store from user is, ', workoutToStore);
  state.workouts = state.workouts.push(workoutToStore);
}
