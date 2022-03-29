import {
  SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA,
  SET_SELECTED_SERVICES_SUMMARY_DATA,
  SET_SELECTED_SERVICES_MEDIA_DATA,
  SET_SELECTED_SERVICES_DAILIES_DATA,
  SET_SELECTED_SERVICES_HISTORIES_DATA,
  SET_SELECTED_SERVICES_CHECKLIST_DATA,
} from "./DetailServiceTransactionAction";

export const initialState = {
  selectedServiceEmployeeList: [],
  selectedServiceSummary: {},
  selectedServiceMedia: [],
  selectedServiceDailies: [],
  selectedServiceHistories: [],
  selectedServiceChecklist: [],
};

export default function detailServiceTransactionReducer(
  state = initialState,
  action
) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA:
      newState.selectedServiceEmployeeList = action.payload;
      return { ...newState };
    case SET_SELECTED_SERVICES_SUMMARY_DATA:
      newState.selectedServiceSummary = action.payload;
      return { ...newState };
    case SET_SELECTED_SERVICES_MEDIA_DATA:
      newState.selectedServiceMedia = action.payload;
      return { ...newState };
    case SET_SELECTED_SERVICES_DAILIES_DATA:
      newState.selectedServiceDailies = action.payload;
      return { ...newState };
    case SET_SELECTED_SERVICES_HISTORIES_DATA:
      newState.selectedServiceHistories = action.payload;
      return { ...newState };
    case SET_SELECTED_SERVICES_CHECKLIST_DATA:
      newState.selectedServiceChecklist = action.payload;
      return { ...newState };
  }

  return state;
}
