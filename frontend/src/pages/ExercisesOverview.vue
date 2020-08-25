<template>
  <q-page padding>
    <div class="q-pa-md">
      <div v-if="exerciseData">
        <q-table
          title="Exercises"
          :data="exerciseData"
          :columns="columns"
          row-key="name"
          :pagination.sync="pagination"
          :visible-columns="visibleColumns"
          :rows-per-page-options="rowsAllowedArray"
          selection="multiple"
          :selected.sync="selected"
          :loading="loading"
        >
          <template v-slot:top>
            <q-icon name="fitness_center" size="3em" left />

            <q-space />

            <q-select
              outlined
              dense
              options-dense
              v-model="exerciseCategoryModel"
              label="Category"
              :options="categoryOptions"
              options-cover
              style="min-width: 150px"
            />
          </template>
          <template v-slot:bottom-row>
            <q-btn
              class="delete-button"
              icon="delete"
              @click="deleteSelection"
              name="delete"
              size="1.5em"
              flat
              round
              dense
            />
          </template>
          <template v-slot:no-data="">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <q-icon size="2em" name="sentiment_dissatisfied" />
              <span>
                There is no data to display, add an exercises or try later
                again.
              </span>
            </div>
          </template>
        </q-table>
      </div>
      <add-exercise></add-exercise>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      selected: [],
      pagination: {
        rowsPerPage: 15,
      },
      rowsAllowedArray: [5, 10, 15, 20, 25, 50, 0],
      categoryOptions: null,
      exerciseCategoryModel: 'All',
      visibleColumns: ['exerciseName', 'exerciseCategory'],
      columns: [
        {
          name: 'exerciseName',
          required: true,
          label: 'Exercise Name',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'exerciseCategory',
          align: 'center',
          label: 'Category',
          field: 'category',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    if (!this.categoryOptions && this.exercisesCategories) {
      this.categoryOptions = JSON.parse(
        JSON.stringify(this.exercisesCategories),
      );
      this.categoryOptions.push('All');
    }
  },
  methods: {
    deleteSelection() {
      if (this.selected.length > 0) {
        this.loading = true;
        this.$log.debug(this.selected);
        this.$store
          .dispatch('exercise/deleteExercises', {
            vm: this,
            exercises: this.selected,
          })
          .catch(error => {
            this.loading = false;
            this.$q.notify({ message: error, color: 'red' });
          })
          .then(async () => {
            this.loading = false;
            await this.$store.dispatch('exercise/loadExercises', this);
            const successMessage = 'Successfully deleted the exercises';
            this.$q.notify({ message: successMessage, color: 'green' });
          });
      }
    },
  },
  computed: {
    ...mapState('exercise', [
      'exercisesNames',
      'exercisesCategories',
      'exercises',
    ]),
    exerciseData: {
      get: function() {
        if (this.exercises) {
          const filteredExerciseData =
            this.exerciseCategoryModel === 'All'
              ? [...this.exercises]
              : [
                  ...this.exercises.filter(
                    exercise =>
                      exercise.category === this.exerciseCategoryModel,
                  ),
                ];
          this.$log.debug('this exercisedata is, ', filteredExerciseData);
          return filteredExerciseData.sort((a, b) => {
            let aUpper = a.name.toUpperCase();
            let bUpper = b.name.toUpperCase();
            if (aUpper < bUpper) {
              return -1;
            }
            if (aUpper > bUpper) {
              return 1;
            }
            return 0;
          });
        }
        return [];
      },
      set: function(newValue) {
        this.$log.debug('New value');
        return newValue;
      },
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
.delete-button
  margin-left: 0.5em
</style>
