import {
  SET_UNIT_MODEL_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_UNIT_MODEL_ID,
  SET_SELECTED_UNIT_MODEL_DATA,
  SET_PAGING_UNIT_MODEL,
} from "./UnitSerialNumberActions";

export const initialState = {
  listUnitModels: [],
  selectedUnitModelsId: "",
  selectedUnitModelsData: {},
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
    case SET_UNIT_MODEL_LIST_DATA:
      newState.listUnitModels = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_MODEL_ID:
      newState.selectedUnitModelsId = action.payload;
      return { ...newState };

    case SET_SELECTED_UNIT_MODEL_DATA:
      newState.selectedUnitModelsData = action.payload;
      return { ...newState };
    case SET_PAGING_UNIT_MODEL:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
