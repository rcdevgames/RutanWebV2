import { SET_ENUM_UNIT_MODEL } from "./ExternalServiceActions";

export const initialState = {
  enumUnitModel: [],
};

export default function externalServiceReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_ENUM_UNIT_MODEL:
      newState.enumUnitModel = action.payload;
      return { ...newState };
  }

  return state;
}
