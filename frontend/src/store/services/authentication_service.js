import axios from 'axios';
/* eslint-disable */

export class AuthenticationService {
  static async login(user) {
    console.log('Try to login with user', user.username)
    const URL = `${process.env.SERVER_URL}/auth/login`;
    return axios.post(URL, user);
  }
  static async logout() {
    console.log('Try to logout with user')
    const URL = `${process.env.SERVER_URL}/auth/logout`;
    return axios.post(URL);
  }
  static async register(newUser) {
    console.log('Try to register user')
    const URL = `${process.env.SERVER_URL}/auth/register`;
    return axios.post(URL, newUser);
  }
}
