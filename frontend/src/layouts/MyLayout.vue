<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Strengdurance</q-toolbar-title>
        <q-btn to="/addWorkout" flat round dense icon="add" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      elevated
      content-class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            exact
            clickable
            v-ripple
            @click="activeItem = 'Overview'"
            to="/"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Overview
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            @click="activeItem = 'StrengthWorkout'"
            to="/strengthworkout"
          >
            <q-item-section avatar>
              <q-icon name="fitness_center" />
            </q-item-section>

            <q-item-section>
              Strength Workouts
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            @click="activeItem = 'EnduranceWorkout'"
            to="/enduranceworkout"
          >
            <q-item-section avatar>
              <q-icon name="directions_run" />
            </q-item-section>

            <q-item-section>
              Endurance Workouts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data() {
    return {
      activeItem: 'Overview',
      leftDrawerOpen: false,
    };
  },
};
</script>
