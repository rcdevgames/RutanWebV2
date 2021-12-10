import { SET_LIST_UNIT } from "./UnitModelActions";

export const initialState = {
  listUnitModel: [],
};

export default function unitModelReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LIST_UNIT:
      newState.listUnitModel = action.payload;
      return { ...newState };
  }

  return state;
}
