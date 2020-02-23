import { WorkoutService } from '../services/workout_service';
import { WorkoutModelBuilder } from '../../models/workoutModel';

export function loadWorkouts({ commit }, vm) {
  return new Promise((resolve, reject) => {
    WorkoutService.getAllStrengthWorkouts()
      .then(response => {
        vm.$log.debug('loadedExercise from api,', response.data);
        commit('saveWorkouts', response.data);
        resolve();
      })
      .catch(error => {
        vm.$log.debug('Error while loading workouts', error.message);
        reject('Could not fetch workouts, ' + error.message);
      });
    vm.$log.debug('loadExercises action has been called!');
  });
}

export function saveWorkout({ commit }, { vm, workout }) {
  vm.$log.debug('Send following workout, ', workout);
  const workoutAsObject = { allExercises: workout };
  return new Promise((resolve, reject) => {
    WorkoutService.postWorkout(workoutAsObject)
      .then(response => {
        vm.$log.debug('Successfully POST workout', response.data);
        const workoutModel = new WorkoutModelBuilder()
          .setDate(response.data.date)
          .setExercises(workout)
          .build();
        commit('storeUserWorkout', workoutModel);
        resolve();
      })
      .catch(error => {
        vm.$log.debug(error);
        reject('Could not save workout, ' + error.message);
      });
  });
}
