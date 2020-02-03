<template>
  <q-page padding>
    <div v-if="workoutToShow" class="q-pa-md">
      <q-markup-table flat bordered>
        <thead class="bg-teal">
          <tr>
            <th colspan="5">
              <div class="row no-wrap justify-start">
                <div class="text-h6 q-ml-md text-white">
                  {{ this.showDate(workoutToShow.getDate()) }}
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th class="text-left">Exercise Name</th>
            <th class="text-right">Repetitions</th>
            <th class="text-right">Weight</th>
            <th class="text-right">Volume</th>
            <th class="text-right">Comment</th>
          </tr>
        </thead>
        <tbody class="bg-grey-3">
          <tr
            v-for="(exercise, index) in workoutToShow.getExercises()"
            v-bind:key="`exercise-${index}`"
          >
            <td class="text-left">{{ exercise.exerciseDefinition.name }}</td>
            <td class="text-right">{{ exercise.getRepetitionAsString() }}</td>
            <td class="text-right">{{ exercise.getWeightAsString() }}</td>
            <td class="text-right">{{ exercise.getVolume() }}</td>
            <td class="text-right">{{ exercise.getComment() }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
import { mapState } from 'vuex';
export default {
  name: 'stenghWorkouts',
  async mounted() {
    if (this.workouts === undefined) {
      await this.$store.dispatch('workouts/loadWorkouts', this);
    }
    const deepCloneWorkout = this.workouts[
      this.workouts.length - 1
    ].deepClone();
    this.workoutToShow = deepCloneWorkout;
  },
  data() {
    return {
      workoutToShow: null,
    };
  },
  computed: {
    ...mapState('workouts', ['workouts']),
  },
  methods: {
    showDate(date) {
      this.$log.debug(date);
      return date.toLocaleDateString(this.$i18n.locale, options);
    },
  },
};
</script>
