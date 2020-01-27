<template>
  <div>
    <div class="row">
      <q-select
        class="strength"
        filled
        v-model="model"
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
      <q-input class="strength" label="Sets" v-model.number="sets" type="number" filled />
      <q-input class="strength" label="Repetitions" v-model.number="reps" type="number" filled />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

/* const stringOptions = ['Bench', 'Incline Bench', 'Row', 'Cable Row', 'Squat']; */
export default {
  name: 'Exercise',
  data() {
    return {
      model: null,
      sets: 3,
      reps: 10,
      options: this.exercisesNames,
      // TODO: Make sure error message is displayed if options are undefined
    };
  },
  mounted() {},
  computed: {
    ...mapState('exercise', ['exercisesNames', 'exercisesCategories', 'exercises']),
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
