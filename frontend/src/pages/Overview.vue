<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Overview',
  mounted() {
    if (this.exercises === undefined) {
      this.$store.dispatch('exercise/loadExercises', this).catch(error => {
        this.$q.notify({ message: error.message, color: 'red' });
      });
    }
    if (this.workouts === undefined) {
      this.$store.dispatch('workouts/loadWorkouts', this).catch(error => {
        this.$q.notify({ message: error.message, color: 'red' });
      });
    }
  },
  computed: {
    ...mapState('exercise', ['exercises']),
    ...mapState('workouts', ['workouts']),
  },
};
</script>
