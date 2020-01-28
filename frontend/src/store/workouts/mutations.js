export function saveWorkouts(state, loadedWorkouts) {
  // eslint-disable-next-line
  console.log('loaded Workouts are, ', loadedWorkouts);
  state.workouts = loadedWorkouts;
}
