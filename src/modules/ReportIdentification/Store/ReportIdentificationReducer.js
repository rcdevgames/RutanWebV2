/* eslint-disable default-case */
import {
  SET_REPORT_IDENTIFICATION_LIST_DATA,
  SET_FORM_STATUS,
  SET_PAGING_REPORT_IDENTIFICATION,
} from "./ReportIdentificationActions";

export const initialState = {
  listReportIdentification: [],
  formStatus: "add",
  paging: {
    page: 1,
    limit: 999999999,
    totalPage: 1,
  },
};

export default function reportIdentificationReducer(
  state = initialState,
  action
) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_REPORT_IDENTIFICATION_LIST_DATA:
      newState.listReportIdentification = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_PAGING_REPORT_IDENTIFICATION:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
