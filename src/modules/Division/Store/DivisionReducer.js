import {
  SET_DIVISION_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_DIVISION_ID,
  SET_SELECTED_DIVISION_DATA,
  SET_PAGING_DIVISION
} from "./DivisionActions";

export const initialState = {
  listDivision: [],
  selectedDivisionId: "",
  selectedDivisionData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function divisionReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_DIVISION_LIST_DATA:
      newState.listDivision = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_DIVISION_ID:
      newState.selectedDivisionId = action.payload;
      return { ...newState };

    case SET_SELECTED_DIVISION_DATA:
      newState.selectedDivisionData = action.payload;
      return { ...newState };
    case SET_PAGING_DIVISION:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
