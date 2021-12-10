import { SET_LIST_UNIT } from "./UnitActions";

export const initialState = {
  listUnit: [],
};

export default function unitReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LIST_UNIT:
      newState.listUnit = action.payload;
      return { ...newState };
  }

  return state;
}
