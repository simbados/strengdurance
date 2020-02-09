import axios from 'axios';
import { store } from '../store/index';
export default async ({ Vue }) => {
  Vue.prototype.$axios = axios;
};

axios.interceptors.request.use(
  config => {
    /* eslint-disable */
    console.log('store is', store);
    let token = store.state.general.jwt;
    console.log('token is', token);

    if (token !== null && token !== '') {
      console.log('sending header');
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  },
);
