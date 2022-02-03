import {
  SET_UNIT_FIELDS_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_UNIT_FIELDS_ID,
  SET_SELECTED_UNIT_FIELDS_DATA,
  SET_PAGING_UNIT_FIELDS,
} from "./UnitFieldsActions";

export const initialState = {
  listUnitFields: [],
  selectedUnitFieldsId: "",
  selectedUnitFieldsData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function unitFieldsReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_UNIT_FIELDS_LIST_DATA:
      newState.listUnitFields = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_FIELDS_ID:
      newState.selectedUnitFieldsId = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_FIELDS_DATA:
      newState.selectedUnitFieldsData = action.payload;
      return { ...newState };
    case SET_PAGING_UNIT_FIELDS:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
