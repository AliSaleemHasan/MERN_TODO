export const initialState = {
  user: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log("Action is " + action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return { user: state.user };
    default:
      return state;
  }
};

export default reducer;
