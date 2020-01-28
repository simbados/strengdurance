<template>
  <q-page padding>
    <div class="column">
      <h4>Strength Workout</h4>
      <div v-if="workouts">
        <div
          v-for="(exercises, index) in workouts[workouts.length-1].allExercises"
          v-bind:key="`exercises-${index}`"
        >
          <exercise :index="index"></exercise>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'add_workout',
  mounted() {
    if (this.exercises === undefined) {
      this.$store.dispatch('exercise/loadExercises', this);
    }
    if (this.workouts === undefined) {
      this.$store.dispatch('workouts/loadWorkouts', this);
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState('exercise', ['exercises']),
    ...mapState('workouts', ['workouts']),
  },
};
</script>

<style lang="sass" scoped>
h4 
  text-align: center
</style>
