const defaultGeneralState = () => {
  return {
    username: '',
    email: '',
    userId: '',
    isAuthenticated: !!localStorage.getItem('user-token'),
    errorMessage: '',
  };
};

const state = defaultGeneralState();

export default state;

export { defaultGeneralState };
