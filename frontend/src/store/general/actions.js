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
        reject(
          'Could not log you in, please try later again: ' + error.message,
        );
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
        reject(
          'Could not log you out, please try later again: ' + error.message,
        );
      });
  });
}

// eslint-disable-next-line
export function register({state}, {vm, newUser}) {
  vm.$log.debug('register action has been called!');
  return new Promise((resolve, reject) => {
    AuthenticationService.register(newUser)
      .then(response => {
        vm.$log.debug('response from api', response);
        if (response.status == 201) {
          resolve();
        } else {
          // eslint-disable-next-line
          console.log(response);
          reject(
            'Register has failed, please try again later, ' + response.data,
          );
        }
      })
      .catch(error => {
        const errorMessage = handleError(error);
        // eslint-disable-next-line
        console.log(error);
        vm.$log.debug(error);
        reject(errorMessage);
      });
  });
}

function handleError(error) {
  // eslint-disable-next-line
  console.log(error.response);
  if (error.response.data.message) {
    if (error.response.data.message.includes('E11000 duplicate key')) {
      if (error.response.data.message.includes('username')) {
        return 'User name is already in use';
      } else if (error.response.data.message.includes('email')) {
        return 'Email is already in use';
      }
    }
    return error.response.data.message;
  } else if (error.request) {
    return error.request;
  }
  return error.message;
}

export function reset({ commit }) {
  commit('reset');
}
