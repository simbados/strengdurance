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

    <q-drawer v-model="leftDrawerOpen" :width="200" elevated content-class="bg-grey-2">
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false,
    };
  }
};
</script>
