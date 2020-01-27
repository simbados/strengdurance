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
import { mapState } from 'vuex';
export default {
  name: 'add_workout',
  mounted() {
    if (this.exercises === undefined) {
      this.$store.dispatch('exercise/loadExercises', this);
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState('exercise', ['exercises']),
  },
};
</script>

<style lang="sass" scoped>
h4 
  text-align: center
</style>
