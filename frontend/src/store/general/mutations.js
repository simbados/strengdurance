export function login(state, userData) {
  state.jwt = userData.jwt;
  state.username = userData.user.username;
  state.isAuthenticated = true;
}

export function logout(state) {
  state.jwt = '';
  state.username = '';
  state.isAuthenticated = false;
}
