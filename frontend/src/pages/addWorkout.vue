<template>
  <q-page padding>
    <div class="column items-center">
      <h4>Strength Workout</h4>
      <q-toggle v-model="showLastWorkout" label="Show last workout" />
      <div v-if="workouts && showLastWorkout">
        <div v-for="(exercise, index) in oldWorkout" v-bind:key="`exercise-${index}`">
          <exercise
            :index="index"
            :exercise="exercise"
            :emitValues="emitOldWorkoutValues"
            v-on:saveExercise="saveExercise"
          ></exercise>
          <q-separator />
        </div>
      </div>
      <div v-else>
        <div v-for="(exercise, index) in newWorkout" v-bind:key="`exercise-${index}$-{index}`">
          <exercise
            :index="index"
            :exercise="exercise"
            :emitValues="emitNewWorkoutValues"
            v-on:saveExercise="saveExercise"
          ></exercise>
          <q-separator spaced />
        </div>
      </div>
      <q-btn style="margin: 1em" round color="primary" icon="add" @click="addNewWorkout" />
      <q-separator style="height: 1px" />
      <q-btn style="margin: 2em" color="primary" label="Submit" @click="setEmitValuesTrue" />
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
const emptyWorkout = {
  exercise: { name: '' },
  repetition: [],
  weight: [],
  comment: '',
};
export default {
  name: 'add_workout',
  data() {
    return {
      oldWorkout: [],
      newWorkout: [],
      emitNewWorkoutValues: false,
      emitOldWorkoutValues: false,
      showLastWorkout: true,
      workoutToStore: [],
      errorMessage: '',
    };
  },
  mounted() {
    if (this.exercises === undefined) {
      this.$store.dispatch('exercise/loadExercises', this);
    }
    if (this.workouts === undefined) {
      this.$store.dispatch('workouts/loadWorkouts', this).then(() => {
        this.oldWorkout = JSON.parse(
          JSON.stringify(this.workouts[this.workouts.length - 1].allExercises),
        );
      });
    }
    // Necessary to create a deep copy
    this.newWorkout = [
      emptyWorkout,
      emptyWorkout,
      emptyWorkout,
      emptyWorkout,
      emptyWorkout,
    ];
  },
  methods: {
    // eslint-disable-next-line
    saveExercise: function({ exercise, index }) {
      this.$log.debug(`Index is ${index}`);
      this.$log.debug('saveExercise is called');
      this.$log.debug(exercise);

      if (this.workouts !== null && this.showLastWorkout) {
        if (index === this.oldWorkout.length - 1) {
          if(this.validateWorkout(this.oldWorkout)) {
            this.$q.notify({message: this.errorMessage, color: 'red'});
            }
        }
      }
    },
    validateWorkout: function(workout) {
      const errorMessage =
        'You did not fill all the required fields, please fill exercise Name, Repetition and Weight';
      let validated = true;
      for (let i = 0; i < workout.length; i++) {
        const currentWorkout = this.workout[i];
        if (
          currentWorkout.exercise.name === '' ||
          currentWorkout.exercise.name === null
        ) {
          this.errorMessage = errorMessage;
          validated = false;
          break;
        }
        if (
          currentWorkout.repetition.length === 0 ||
          currentWorkout.repetition === null
        ) {
          this.errorMessage = errorMessage;
          validated = false;
          break;
        }
        if (
          currentWorkout.weight.length === 0 ||
          currentWorkout.weight === null
        ) {
          this.errorMessage = errorMessage;
          validated = false;
          break;
        }
      }
      return validated;
    },
    setEmitValuesTrue: function() {
      if (this.workouts !== null && this.showLastWorkout) {
        this.emitOldWorkoutValues = true;
      } else {
        this.emitNewWorkoutValues = true;
      }
    },
    addNewWorkout: function() {
      if (this.workouts !== null && this.showLastWorkout) {
        this.oldWorkout.push(emptyWorkout);
      } else {
        this.newWorkout.push(emptyWorkout);
      }
    },
  },
  computed: {
    ...mapState('exercise', ['exercises']),
    ...mapState('workouts', ['workouts']),
  },
};
</script>

<style lang="sass" scoped>
</style>
