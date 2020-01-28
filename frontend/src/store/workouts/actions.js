import { WorkoutService } from '../services/workout_service';

export function loadWorkouts({ commit }, vm) {
  WorkoutService.getAllStrengthWorkouts()
    .then(response => {
      vm.$log.debug('loadedExercise from api,', response);
      commit('saveWorkouts', response);
    })
    .catch(error => vm.$log.debug(error));
  vm.$log.debug('loadExercises action has been called!');
}
