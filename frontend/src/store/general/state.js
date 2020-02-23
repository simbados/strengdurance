const defaultGeneralState = () => {
  return {
    jwt: '',
    username: '',
    userId: '',
    isAuthenticated: false,
    errorMessage: '',
  };
};

const state = defaultGeneralState();

export default state;

export { defaultGeneralState };
