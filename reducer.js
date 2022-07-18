const initialstate = { user: null, athenticated: false };
const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, authenticated: true };
    case "IS_AUTHENTICATED":
      return { ...state, authenticated: action.payload };
    default:
      return state;
  }
};
export default authReducer;
