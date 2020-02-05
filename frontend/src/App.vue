<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
};
</script>
