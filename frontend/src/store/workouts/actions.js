import { WorkoutService } from '../services/workout_service';

export function loadWorkouts({ commit }, vm) {
  return new Promise(resolve => {
    WorkoutService.getAllStrengthWorkouts()
      .then(response => {
        vm.$log.debug('loadedExercise from api,', response.data);
        commit('saveWorkouts', response.data);
        resolve();
      })
      .catch(error => vm.$log.debug(error));
    vm.$log.debug('loadExercises action has been called!');
  });
}

export function saveWorkout({ commit }, { vm, workout }) {
  vm.$log.debug('Send following workout, ', workout);
  return new Promise((resolve, reject) => {
    WorkoutService.postWorkout(workout)
      .then(response => {
        vm.$log.debug('Successfully POST workout', response.data);
        commit('storeUserWorkout', workout);
        resolve();
      })
      .catch(error => {
        vm.$log.debug(error.error);
        reject(error);
      });
  });
}
