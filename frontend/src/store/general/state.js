const defaultGeneralState = () => {
  return {
    jwt: '',
    username: '',
    email: '',
    userId: '',
    isAuthenticated: false,
    errorMessage: '',
  };
};

const state = defaultGeneralState();

export default state;

export { defaultGeneralState };
