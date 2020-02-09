import axios from 'axios';
/* eslint-disable */

export class AuthenticationService {
  static login(user) {
    console.log('Try to login with user', user.username)
    const URL = `${process.env.SERVER_URL}/auth/login`;
    return axios.post(URL, user);
  }
  static logout() {
    console.log('Try to login with user')
    const URL = `${process.env.SERVER_URL}/auth/logout`;
    return axios.post(URL);
  }
}
