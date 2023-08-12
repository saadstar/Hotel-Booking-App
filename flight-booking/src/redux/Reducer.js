const initialState = {
  city: "",
  date: [],
  options: {
    room: "",
    adult: "",
    children:""
  },
};

export const Reducer = (state = initialState,action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return initialState;
    default:
      return state;
  }
};
