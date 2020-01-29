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
      <q-input
        hint="Format 8/8/8"
        hide-hint
        class="correct-addons strength"
        label="Repetitions"
        v-model="repetitions"
        type="string"
        debounce="300"
        lazy-rules
        :rules="[validateArray]"
        filled
      />
      <q-input
        class="strength correct-addons"
        label="Weight"
        v-model="weight"
        type="string"
        debounce="300"
        lazy-rules
        hint="Format 50/50/50"
        hide-hint
        :rules="[validateArray]"
        filled
      />
      <q-input
        readonly
        class="strength correct-addons"
        label="Volume"
        v-model="volume"
        type="number"
        filled
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Exercise',
  props: {
    index: Number,
  },
  data() {
    return {
      exerciseName: null,
      weightModel: null,
      repetitionModel: null,
      options: null,
      // TODO: Make sure error message is displayed if options are undefined
    };
  },
  mounted() {
    this.weightModel = this.toStringArray(
      this.workouts[this.workouts.length - 1].allExercises[this.index].weight,
    );
    this.repetitionModel = this.toStringArray(
      this.workouts[this.workouts.length - 1].allExercises[this.index]
        .repetition,
    );
    this.options = this.exercisesNames;
    this.exerciseName = this.exercisesNames[this.index];
  },
  computed: {
    ...mapState('exercise', [
      'exercisesNames',
      'exercisesCategories',
      'exercises',
    ]),
    ...mapState('workouts', ['workouts']),
    volume: function() {
      if (this.repetitionModel === null || this.weightModel === null) {
        return 0;
      }
      let calculatedVolume = 0;
      this.$log.debug(
        `repetitionModel and weightModel, ${this.repetitionModel}, ${this.weightModel}`,
      );
      const repetitionsAsNumberArr = this.toNumberArray(this.repetitionModel);
      const weightAsNumberArr = this.toNumberArray(this.weightModel);
      if (repetitionsAsNumberArr.length === weightAsNumberArr.length) {
        for (let i = 0; i < repetitionsAsNumberArr.length; i++) {
          calculatedVolume += repetitionsAsNumberArr[i] * weightAsNumberArr[i];
        }
      }
      return calculatedVolume;
    },
    weight: {
      get: function() {
        let displayedWeight = '';
        if (this.weightModel === null) {
          const weightArray = this.workouts[this.workouts.length - 1]
            .allExercises[this.index].weight;
          displayedWeight = this.toStringArray(weightArray);
        } else {
          displayedWeight = this.weightModel;
        }
        return displayedWeight;
      },
      set: function(newWeight) {
        this.weightModel = newWeight;
      },
    },
    repetitions: {
      get: function() {
        let displayedRepetitions = '';
        if (this.repetitionModel === null) {
          const repetitionArray = this.workouts[this.workouts.length - 1]
            .allExercises[this.index].repetition;
          displayedRepetitions = this.toStringArray(repetitionArray);
        } else {
          displayedRepetitions = this.repetitionModel;
        }
        return displayedRepetitions;
      },
      set: function(newRepetition) {
        this.repetitionModel = newRepetition;
      },
    },
  },
  methods: {
    toStringArray(fromNumberArray) {
      let stringArray = '';
      fromNumberArray.forEach(element => (stringArray += `${element}/`));
      // Need to cut the last slash
      stringArray = stringArray.substring(0, stringArray.length - 1);
      return stringArray;
    },

    toNumberArray(fromStringArray) {
      this.$log.debug(`from String Array is, ${fromStringArray}`);
      return fromStringArray.split('/').filter(value => {
        if(value ==='') {
          return false;
        }
        return true;
      }).map(value => {
        const parse = parseInt(value, 10);
        if (isNaN(parse)) {
          return 0;
        }
        return parse;
      });
    },

    // Add back later current model alarms too often
    /* validateVolume() { */
    /*   return new Promise(resolve => { */
    /*     if (this.volume === 0) { */
    /*       resolve( */
    /*         'Weight and Repetitions must contain equal amount of numbers', */
    /*       ); */
    /*     } */
    /*     resolve(true); */
    /*   }); */
    /* }, */

    validateArray(val) {
      return new Promise((resolve, reject) => {
        if (!val.match('[^/0-9]') || val === '') {
          resolve(true);
        } else {
          reject();
        }
      });
    },
    filterFn(val, update) {
      if (val === '') {
        this.exerciseName = null;
        update(() => {
          this.options = this.exercisesNames;
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
  margin: 0.5em
.correct-addons
  padding-top: 20px
</style>
