import Exercise from '../components/Exercise.vue';
import AddExercise from '../components/Add_Exercise.vue';

export default async ({ Vue }) => {
  Vue.component('exercise', Exercise);
  Vue.component('add-exercise', AddExercise);
};
