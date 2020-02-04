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
      this.$store.dispatch('exercise/loadExercises', this);
    }
    if (this.workouts === undefined) {
      this.$store.dispatch('workouts/loadWorkouts', this);
    }
  },
};
</script>
