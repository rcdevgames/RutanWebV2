import {
  SET_UNIT_SERIAL_NUMBER_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_UNIT_SERIAL_NUMBER_ID,
  SET_SELECTED_UNIT_SERIAL_NUMBER_DATA,
  SET_PAGING_UNIT_MODEL,
} from "./UnitSerialNumberActions";

export const initialState = {
  listUnitSerialNumber: [],
  selectedUnitSerialNumberId: "",
  selectedUnitSerialNumberData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function unitSerialNumberReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_UNIT_SERIAL_NUMBER_DATA:
      newState.listUnitSerialNumber = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_SERIAL_NUMBER_ID:
      newState.selectedUnitSerialNumberId = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_SERIAL_NUMBER_DATA:
      newState.selectedUnitSerialNumberData = action.payload;
      return { ...newState };
    case SET_PAGING_UNIT_MODEL:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
