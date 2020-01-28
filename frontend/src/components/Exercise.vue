<template>
  <div>
    <div class="row">
      <q-select
        class="strength"
        filled
        v-model="exerciseName"
        use-input
        input-debounce="0"
        label="Exercise"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input class="strength" label="Repetitions" v-model.number="reps" type="number" filled />
      <q-input class="strength" label="Weight" v-model="weight" type="string" filled />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

/* const stringOptions = ['Bench', 'Incline Bench', 'Row', 'Cable Row', 'Squat']; */
export default {
  name: 'Exercise',
  props: {
    index: Number,
  },
  data() {
    return {
      exerciseName: null,
      weightModel: null,
      reps: 3,
      options: this.exercisesNames,
      // TODO: Make sure error message is displayed if options are undefined
    };
  },
  mounted() {
    this.exerciseName = this.exercisesNames[this.index];
  },
  computed: {
    ...mapState('exercise', [
      'exercisesNames',
      'exercisesCategories',
      'exercises',
    ]),
    ...mapState('workouts', ['workouts']),
    weight: {
      get: function() {
        let displayedWeight = '';
        if (this.weightModel === null) {
          const weightArr = this.workouts[this.workouts.length - 1]
            .allExercises[this.index].weight;
          weightArr.forEach(element => (displayedWeight += `${element}/`));
          // Need to cut the last slash
          displayedWeight = displayedWeight.substring(
            0,
            displayedWeight.length - 1,
          );
        } else {
          displayedWeight = this.weightModel;
        }
        return displayedWeight;
      },
      set: function(newWeight) {
        this.weightModel = newWeight;
        this.$log.debug('weightModel after set');
      },
    },
  },
  methods: {
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.options = this.exercisesNames;

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.exercisesNames.filter(
          v => v.toLowerCase().indexOf(needle) > -1,
        );
      });
    },
  },
};
</script>
<style lang="sass" scoped>

.strength
  margin: 1em

</style>
