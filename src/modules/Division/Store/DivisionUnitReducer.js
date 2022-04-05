import {
  SET_DIVISION_UNIT_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_DIVISION_UNIT_ID,
  SET_SELECTED_DIVISION_UNIT_DATA,
  SET_PAGING_DIVISION_UNIT,
} from "./DivisionUnitActions";

export const initialState = {
  listDivisionUnit: [],
  selectedDivisionUnitId: "",
  selectedDivisionUnitData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function divisionUnitReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_DIVISION_UNIT_LIST_DATA:
      newState.listDivisionUnit = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_DIVISION_UNIT_ID:
      newState.selectedDivisionUnitId = action.payload;
      return { ...newState };

    case SET_SELECTED_DIVISION_UNIT_DATA:
      newState.selectedDivisionUnitData = action.payload;
      return { ...newState };
    case SET_PAGING_DIVISION_UNIT:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
