export const newSearch = (search) => {
  return {
    type: "NEW_SEARCH",
    payload: search,
  };
};
export const resetSearch = (search) => {
  return {
    type: "RESET_SEARCH",
    payload: search,
  };
};
