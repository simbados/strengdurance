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
        const errorMessage = handleError(error);
        vm.$log.debug(error);
        reject(errorMessage);
      });
  });
}

// eslint-disable-next-line no-unused-vars
export function deleteExercises({ commit }, { vm, exercises }) {
  vm.$log.debug('delete exercises in action.js', exercises);
  return ExerciseService.deleteExercises(exercises);
}

function handleError(error) {
  if (error.response.data.message) {
    if (error.response.data.message.includes('E11000 duplicate key')) {
      return 'Exercise name is already in use';
    }
    return error.response.data.message;
  } else if (error.request) {
    return error.request;
  }
  return error.message;
}
