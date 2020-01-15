<template>
  <q-page padding>
    <div class="column">
      <q-select
        class="selectWorkout"
        outlined
        v-model="model"
        :options="options"
        label="Workout type"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Add Workout",
  data() {
    return {
      model: null,
      options: ["Strength", "Endurance"]
    };
  }
};
</script>

<style lang="sass">
.column
  margin: 2em
</style>
