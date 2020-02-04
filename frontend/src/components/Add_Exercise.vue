<template>
  <q-card class="add-exercise">
    <q-card-section class="bg-secondary">
      <h6>Add a new exercise</h6>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row">
        <q-input
          filled
          v-model="exerciseNameInputModel"
          label="Name"
          style="max-width:300px; margin-right: 2em"
        />
        <q-select
          filled
          v-model="exerciseCategoryInputModel"
          label="Category"
          :options="exercisesCategories"
          style="min-width: 12em; max-width:300px; margin-right: 2em"
        />
        <q-btn
          style="margin: 1em"
          color="secondary"
          label="Submit"
          @click="storeExercise"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'AddExercise',
  data() {
    return {
      exerciseNameInputModel: null,
      exerciseCategoryInputModel: null,
    };
  },
  computed: {
    ...mapState('exercise', ['exercisesCategories']),
  },
  methods: {
    storeExercise() {
      this.$store.dispatch('exercise/saveNewExercise', {
        vm: this,
        exercise: {
          name: this.exerciseNameInputModel,
          category: this.exerciseCategoryInputModel,
        },
      });
    },
  },
};
</script>
<style lang="sass">
.add-exercise
  width: 100%
  margin: 2em 0
h6
  margin: 0 0
  color: white
</style>
