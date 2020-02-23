import { ExerciseService } from '../services/exercise_service';

export function loadExercises({ commit }, vm) {
  vm.$log.debug('loadExercises action has been called!');
  return new Promise((resolve, reject) => {
    ExerciseService.getAllExercises()
      .then(response => {
        vm.$log.debug('loadedExercise from api,', response);
        commit('saveExercises', response.data);
        resolve();
      })
      .catch(error => {
        vm.$log.debug(error);
        reject('Could not fetch exercises, ' + error.message);
      });
  });
}

export function saveNewExercise({ commit }, { vm, exercise }) {
  return new Promise((resolve, reject) => {
    ExerciseService.postExercise(exercise)
      .then(response => {
        vm.$log.debug('response from server, ', response);
        commit('addExercise', exercise);
        resolve(response);
      })
      .catch(error => {
        vm.$log.debug(error);
        reject('Could not create exercise, ' + error.message);
      });
  });
}
