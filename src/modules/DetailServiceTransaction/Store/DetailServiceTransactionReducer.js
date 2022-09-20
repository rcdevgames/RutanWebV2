import {
  SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA,
  SET_SELECTED_SERVICES_SUMMARY_DATA,
  SET_SELECTED_SERVICES_MEDIA_DATA,
  SET_SELECTED_SERVICES_DAILIES_DATA,
  SET_SELECTED_SERVICES_HISTORIES_DATA,
  SET_SELECTED_SERVICES_CHECKLIST_DATA,
  SET_SELECTED_SERVICES_REJECTED_DATA,
  SET_REJECTIONS_MODAL,
  SET_EDIT_TRANSACTION_MODAL,
  SET_EDIT_DAILIES_MODAL,
  SET_SELECTED_EDIT_DAILIES_DATA,
  SET_SELECTED_UNIT,
  RESET_DETAIL_SERVICE,
  SET_GROUPING_SELECTED_SERVICES_MEDIA_DATA,
  SET_GROUPING_SUMMARY_DATA,
  SET_SINGLE_SUMMARY_DATA,
  SET_GROUPING_CHECKLIST_DATA,
  SET_INSERT_MEDIA_MODAL,
  SET_TYPE_FORM_DAILIES,
  SET_EDIT_SUMMARY_MODAL,
} from "./DetailServiceTransactionAction";

export const initialState = {
  selectedServiceEmployeeList: [],
  selectedServiceSummary: {},
  selectedServiceMedia: [],
  groupingSelectedServiceMedia: [],
  groupingSelectedServiceSummary: [],
  singleSelectedServiceSummary: {},
  groupingSelectedServiceChecklist: [],
  selectedServiceDailies: [],
  selectedServiceHistories: [],
  selectedServiceChecklist: [],
  selectedServiceRejected: [],
  rejectionsModal: false,
  editTransactionModal: false,
  editDailiesModal: false,
  editSummaryModal: false,
  insertMediaModal: false,
  typeFormDailies: "add",
  selectedEditDailies: {},
  selectedUnit: "Seluruh Unit",
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
    case SET_GROUPING_SELECTED_SERVICES_MEDIA_DATA:
      newState.groupingSelectedServiceMedia = action.payload;
      return { ...newState };
    case SET_GROUPING_SUMMARY_DATA:
      newState.groupingSelectedServiceSummary = action.payload;
    case SET_SINGLE_SUMMARY_DATA:
      newState.singleSelectedServiceSummary = action.payload;
      return { ...newState };
    case SET_GROUPING_CHECKLIST_DATA:
      newState.groupingSelectedServiceChecklist = action.payload;
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
    case SET_SELECTED_SERVICES_REJECTED_DATA:
      newState.selectedServiceRejected = action.payload;
      return { ...newState };
    case SET_REJECTIONS_MODAL:
      newState.rejectionsModal = action.payload;
      return { ...newState };
    case SET_EDIT_TRANSACTION_MODAL:
      newState.editTransactionModal = action.payload;
      return { ...newState };
    case SET_EDIT_DAILIES_MODAL:
      newState.editDailiesModal = action.payload;
      return { ...newState };
    case SET_SELECTED_EDIT_DAILIES_DATA:
      newState.selectedEditDailies = action.payload;
      return { ...newState };
    case SET_SELECTED_UNIT:
      newState.selectedUnit = action.payload;
      return { ...newState };
    case SET_INSERT_MEDIA_MODAL:
      newState.insertMediaModal = action.payload;
      return { ...newState };
    case SET_TYPE_FORM_DAILIES:
      newState.typeFormDailies = action.payload;
      return { ...newState };
    case SET_EDIT_SUMMARY_MODAL:
      newState.editSummaryModal = action.payload;
      return { ...newState };
    case RESET_DETAIL_SERVICE:
      return initialState;
  }

  return state;
}
