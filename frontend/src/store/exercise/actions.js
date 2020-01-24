import { saveExercises } from './mutations';

export function loadExercises({ context }) {
  this.$axios
    .get('http://127.0.1:8000/exercises')
    .then(response => context.commit(saveExercises(response)))
    .catch(error => error);
}
