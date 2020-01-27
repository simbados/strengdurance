import { ExerciseService } from '../services/exercise_service';

export function loadExercises({ commit }, vm) {
  ExerciseService.getAllExercises()
    .then(response => {
      vm.$log.debug('loadedExercise from api,', response);
      commit('saveExercises', response);
    })
    .catch(error => vm.$log.debug(error));
  vm.$log.debug('loadExercises action has been called!');
}
