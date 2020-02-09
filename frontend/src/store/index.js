import Vue from 'vue';
import Vuex from 'vuex';

import exercise from './exercise/index';
import workouts from './workouts/index';
import general from './general/index';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
let store = null;
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      exercise,
      workouts,
      general,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });
  store = Store;
  return Store;
}

export { store };
