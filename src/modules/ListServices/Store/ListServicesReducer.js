import { SET_LIST_SERVICES } from "./ListServicesActions";

export const initialState = {
  listServices: [],
};

export default function authReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LIST_SERVICES:
      newState.listServices = action.payload;
      return { ...newState };
  }

  return state;
}
