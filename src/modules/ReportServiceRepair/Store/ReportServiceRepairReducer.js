import {
  SET_SERVICE_REPAIR_LIST_DATA,
  SET_FORM_STATUS,
  SET_PAGING_SERVICE_REPAIR,
} from "./ReportServiceRepairActions";

export const initialState = {
  listServiceRepair: [],
  formStatus: "add",
  paging: {
    page: 1,
    limit: 999999999,
    totalPage: 1,
  },
};

export default function reportServiceRepairReducer(
  state = initialState,
  action
) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_SERVICE_REPAIR_LIST_DATA:
      newState.listServiceRepair = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_PAGING_SERVICE_REPAIR:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
