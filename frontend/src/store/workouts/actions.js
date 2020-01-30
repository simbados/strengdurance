import { WorkoutService } from '../services/workout_service';

export function loadWorkouts({ commit }, vm) {
  return new Promise(resolve => {
    WorkoutService.getAllStrengthWorkouts()
      .then(response => {
        vm.$log.debug('loadedExercise from api,', response);
        commit('saveWorkouts', response);
        resolve();
      })
      .catch(error => vm.$log.debug(error));
    vm.$log.debug('loadExercises action has been called!');
  });
}
