<template>
  <q-layout style="background: #f0f0f0" view="hHh Lpr lFf">
    <div v-if="isAuthenticated">
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
          <q-btn @click="logout" flat label="Logout" />
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
            <q-item
              clickable
              v-ripple
              @click="activeItem = 'Exercises'"
              to="/exercises"
            >
              <q-item-section avatar>
                <q-icon name="post_add" />
              </q-item-section>

              <q-item-section>
                Exercises
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </div>
    <div v-else>
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>Strengdurance</q-toolbar-title>
          <q-space />
          <q-btn to="/login" flat label="Login" />
          <q-btn to="/register" flat label="Register" />
        </q-toolbar>
      </q-header>
    </div>
    <q-page-container>
      <q-banner v-if="showOffline" class="text-black bg-info">
        You have lost connection to the internet. This app is offline. Please
        turn on your wifi.
      </q-banner>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'MyLayout',

  data() {
    return {
      onLine: navigator.onLine,
      showOffline: !navigator.onLine,
      activeItem: 'Overview',
      leftDrawerOpen: false,
    };
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  computed: {
    ...mapState('general', ['isAuthenticated', 'errorMessage']),
  },
  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === 'online';
    },
    logout() {
      this.$store
        .dispatch('general/logout', this)
        .then(() => {
          this.$router.replace({ path: '/login' });
          this.$store.dispatch('general/reset');
        })
        .catch(error => this.$q.notify({ message: error, color: 'red' }));
    },
  },
  watch: {
    onLine(value) {
      this.showOffline = !value;
    },
  },
};
</script>
