import {
  SET_IDENTIFICATIONN_LIST_DATA,
  SET_SELECTED_IDENTIFICATION_DATA,
  SET_SELECTED_IDENTIFICATION_ID,
  SET_FORM_STATUS,
  SET_PAGING_IDENTIFICATION
} from "./IdentificationActions";

export const initialState = {
  listIdentification: [],
  selectedIdentificationId: "",
  selectedIdentificationData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function identificationReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_IDENTIFICATIONN_LIST_DATA:
      newState.listIdentification = action.payload;
      return { ...newState };

    case SET_SELECTED_IDENTIFICATION_ID:
      newState.selectedIdentificationId = action.payload;
      return { ...newState };

    case SET_SELECTED_IDENTIFICATION_DATA:
      newState.selectedIdentificationData = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_PAGING_IDENTIFICATION:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
