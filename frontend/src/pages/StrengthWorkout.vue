<template>
  <q-page padding>
    <div class="column items-center">
      <h4>Strength Workout</h4>
    </div>
    <div class="q-pa-md">
      <q-select
        style="max-width: 200px; margin-bottom: 2em"
        v-model="displaySelectionModel"
        :options="displayOptions"
        label="Range"
      />
      <div v-if="workoutsToShow">
        <div
          v-for="(workout, index) in workoutsToShow"
          v-bind:key="`workout-${index}`"
        >
          <q-markup-table class="workout-table" flat bordered>
            <thead class="bg-secondary">
              <tr>
                <th colspan="5">
                  <div class="row no-wrap justify-start">
                    <div class="text-h6 q-ml-md text-white">
                      {{ showDate(workout.getDate()) }}
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
                v-for="(exercise, index) in workout.getExercises()"
                v-bind:key="`exercise-${index}`"
              >
                <td class="text-left">
                  {{ exercise.getExerciseDefinition().name }}
                </td>
                <td class="text-right">
                  {{ exercise.getRepetitionAsString() }}
                </td>
                <td class="text-right">{{ exercise.getWeightAsString() }}</td>
                <td class="text-right">{{ exercise.getVolume() }}</td>
                <td class="text-right">{{ exercise.getComment() }}</td>
              </tr>
              <tr>
                <td class="text-left text-bold">
                  Total volume: {{ workout.getTotalVolume() }}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
const languageDisplayOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
import { mapState } from 'vuex';
import { Utils } from '../utils';
export default {
  name: 'stenghWorkouts',
  async mounted() {
    if (this.workouts === undefined) {
      await this.$store.dispatch('workouts/loadWorkouts', this);
    }
    /* const lastWorkout = this.workouts[this.workouts.length - 1]; */
    /* this.workoutsToShow.push(lastWorkout); */
  },
  data() {
    return {
      /* workoutsToShow: [], */
      displayOptions: ['This week', 'Last week', 'Last month', 'All'],
      displaySelectionModel: 'This week',
    };
  },
  computed: {
    ...mapState('workouts', ['workouts']),
    workoutsToShow() {
      if (this.workouts) {
        const now = new Date();
        const daysOfWeek = now.getDay();
        // For displaying the workouts from the right starting postition
        // we want to know how many days we are currently away from the last Monday
        const offset = daysOfWeek === 0 ? 6 : daysOfWeek - 1;
        const lastMonday = Utils.calculateNewDate(now, 0 - offset);
        if (this.displaySelectionModel === 'This week') {
          // We want to subtract the days so we pass a negative to calculateNewDate
          const lastMondayMidnight = Utils.setToMidnight(lastMonday);
          this.$log.debug(lastMondayMidnight);
          return this.workouts
            .filter(value => value.getDate() > lastMondayMidnight)
            .slice()
            .reverse();
        } else if (this.displaySelectionModel === 'Last week') {
          const mondayAWeekAgo = Utils.calculateNewDate(now, 0 - (offset + 7));
          const mondayAWeekAgoMidnight = Utils.setToMidnight(mondayAWeekAgo);
          this.$log.debug(mondayAWeekAgoMidnight, lastMonday);
          return this.workouts
            .filter(
              value =>
                value.getDate() > mondayAWeekAgoMidnight &&
                value.getDate() < lastMonday,
            )
            .slice()
            .reverse();
        } else if (this.displaySelectionModel === 'Last month') {
          const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          this.$log.debug(firstOfMonth);
          return this.workouts
            .filter(value => value.getDate() > firstOfMonth)
            .slice()
            .reverse();
        } else {
          return this.workouts.slice().reverse();
        }
      }
      return [];
    },
  },
  methods: {
    showDate(date) {
      this.$log.debug(date);
      return date.toLocaleDateString(this.$i18n.locale, languageDisplayOptions);
    },
  },
};
</script>
<style lang="sass" scoped>
.workout-table
  margin: 2em 0
</style>
