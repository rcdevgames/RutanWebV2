import { SET_LIST_ADMIN } from "./AdminActions";

export const initialState = {
  listAdmin: [],
};

export default function adminReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LIST_ADMIN:
      newState.listAdmin = action.payload;
      return { ...newState };
  }

  return state;
}
