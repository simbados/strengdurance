const defaultGeneralState = () => {
  return {
    jwt: '',
    username: '',
    userId: '',
    isAuthenticated: false,
  };
};

const state = defaultGeneralState();

export default state;

export { defaultGeneralState };
