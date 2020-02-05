<template>
  <div>
    <div class="row no-wrap items-center">
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
        class="strength"
        label="Volume"
        v-model="volume"
        type="number"
        filled
      />
      <q-input
        class="strength"
        label="Comment"
        v-model="comment"
        type="string"
        filled
      />
      <q-btn
        style="width: 4em; height: 4em ;margin: 1em"
        round
        color="primary"
        icon="remove"
        @click="removeExercise"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ExerciseModel, ExerciseModelBuilder } from '../models/exerciseModel';
export default {
  name: 'Exercise',
  props: {
    exercise: ExerciseModel,
    index: Number,
    emitValues: Boolean,
  },
  data() {
    return {
      exerciseName: null,
      exerciseDefinition: null,
      weightModel: null,
      repetitionModel: null,
      options: null,
      comment: null,
      // TODO: Make sure error message is displayed if options are undefined
    };
  },
  mounted() {
    this.$log.debug('exercises in Exercise, ', this.exercise);
    this.weightModel = this.toStringArray(this.exercise.getWeight());
    this.repetitionModel = this.toStringArray(this.exercise.getRepetition());
    this.comment = this.exercise.getComment();
    this.options = this.exercisesNames;
    this.exerciseDefinition = this.exercise.getExerciseDefinition();
    this.exerciseName = this.exerciseDefinition.name;
  },
  computed: {
    ...mapState('exercise', [
      'exercisesNames',
      'exercisesCategories',
      'exercises',
    ]),
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
        return this.weightModel;
      },
      set: function(newWeight) {
        this.weightModel = newWeight;
      },
    },
    repetitions: {
      get: function() {
        return this.repetitionModel;
      },
      set: function(newRepetition) {
        this.repetitionModel = newRepetition;
      },
    },
  },
  methods: {
    removeExercise() {
      this.$emit('removeExercise', this.index);
    },
    toStringArray(fromNumberArray) {
      let stringArray = '';
      fromNumberArray.forEach(element => (stringArray += `${element}/`));
      // Need to cut the last slash
      stringArray = stringArray.substring(0, stringArray.length - 1);
      return stringArray;
    },

    toNumberArray(fromStringArray) {
      this.$log.debug(`from String Array is, ${fromStringArray}`);
      return fromStringArray
        .split('/')
        .filter(value => {
          if (value === '' || value.match('[^0-9]')) {
            return false;
          }
          return true;
        })
        .map(value => {
          const parse = parseInt(value, 10);
          if (isNaN(parse)) {
            return 0;
          }
          return parse;
        });
    },

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

  watch: {
    emitValues: function() {
      if (this.emitValues) {
        this.$log.debug('Emit values', this.exercises);
        const exerciseModelBuilder = new ExerciseModelBuilder();
        const exerciseDefinition = this.exercises.find(
          value => value.name === this.exerciseName,
        );
        const exerciseCategory = exerciseDefinition
          ? exerciseDefinition.category
          : '';
        const exercise = exerciseModelBuilder
          .setExerciseDefinition({
            name: this.exerciseName,
            category: exerciseCategory,
          })
          .setRepetition(this.toNumberArray(this.repetitionModel))
          .setWeight(this.toNumberArray(this.weightModel))
          .setComment(this.comment)
          .build();
        this.$log.debug('Emit the following exercise, ', exercise);
        this.$emit('saveExercise', { exercise, index: this.index });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.strength
  width: 10em
  margin: 0.5em
.correct-addons
  padding-top: 20px
</style>
