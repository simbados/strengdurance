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
    if (!this.categoryOptions) {
      this.categoryOptions = JSON.parse(
        JSON.stringify(this.exercisesCategories),
      );
      this.categoryOptions.push('All');
    }
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
              ? this.exercises
              : this.exercises.filter(
                  exercise => exercise.category === this.exerciseCategoryModel,
                );
          this.$log.debug('this exercisedata is, ', filteredExerciseData);
          return filteredExerciseData;
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
</style>
