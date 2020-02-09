import { AuthenticationService } from '../services/authentication_service';

export function login({ commit }, { user, vm }) {
  vm.$log.debug('login action has been called!');
  return new Promise((resolve, reject) => {
    AuthenticationService.login(user)
      .then(response => {
        vm.$log.debug('response from api', response);
        if (response.status == 200) {
          commit('login', { jwt: response.data.access_token, user });
          resolve();
        } else {
          reject(response.data);
        }
      })
      .catch(error => {
        vm.$log.debug(error);
        reject(error);
      });
  });
}

export function logout({ commit }, vm) {
  vm.$log.debug('logout action has been called!');
  return new Promise((resolve, reject) => {
    AuthenticationService.logout()
      .then(response => {
        vm.$log.debug('response from api', response);
        if (response.status == 200) {
          commit('logout');
          resolve();
        } else {
          reject(response.data);
        }
      })
      .catch(error => {
        vm.$log.debug(error);
        reject(error);
      });
  });
}
