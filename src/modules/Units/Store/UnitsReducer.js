import {
  SET_UNIT_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_UNIT_ID,
  SET_SELECTED_UNIT_DATA,
} from "./UnitsActions";

export const initialState = {
  listUnits: [],
  selectedUnitsId: "",
  selectedUnitsData: {},
  formStatus: "add",
};

export default function unitsReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_UNIT_LIST_DATA:
      newState.listUnits = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_ID:
      newState.selectedUnitsId = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_DATA:
      newState.selectedUnitsData = action.payload;
      return { ...newState };
  }

  return state;
}
