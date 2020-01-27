<template>
  <q-page padding>
    <div class="column">
      <h4>Strength Workout</h4>
      <exercise></exercise>
      <exercise></exercise>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'add_workout',
  mounted() {
    this.$store.dispatch('exercise/loadExercises', this);
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
h4 
  text-align: center
</style>
