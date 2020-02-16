import { store } from '../index';
import { defaultGeneralState } from '../general/state';
import { defaultExerciseState } from '../exercise/state';
import { defaultWorkoutsState } from '../workouts/state';

export function login(state, userData) {
  state.jwt = userData.jwt;
  state.username = userData.user.username;
  state.isAuthenticated = true;
}

export function logout(state) {
  state.jwt = '';
  state.username = '';
  state.isAuthenticated = false;
}

export function reset() {
  //eslint-disable-next-line
  console.log('reset called');
  store.state.general = defaultGeneralState();
  store.state.exercise = defaultExerciseState();
  store.state.workouts = defaultWorkoutsState();
}
