export const initialState = {
  user: null,
  searchResult: [],
};
export const actionTypes = {
  SET_USER: "SET_USER",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case action.SET_SEARCH_RESULT:
      return {
        ...state,
        searchResault: action.result,
      };
    default:
      return state;
  }
};

export default reducer;
