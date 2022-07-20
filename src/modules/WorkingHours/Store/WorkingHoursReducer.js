import {
  SET_WORKING_HOURS_LIST_DATA,
  SET_FORM_STATUS,
  SET_PAGING_MONITORING_EMPLOYEE,
} from "./WorkingHoursActions";

export const initialState = {
  listWorkingHours: [],
  formStatus: "add",
  paging: {
    page: 1,
    limit: 999999999,
    totalPage: 1,
  },
};

export default function workingHoursReducer(
  state = initialState,
  action
) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_WORKING_HOURS_LIST_DATA:
      newState.listWorkingHours = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_PAGING_MONITORING_EMPLOYEE:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
