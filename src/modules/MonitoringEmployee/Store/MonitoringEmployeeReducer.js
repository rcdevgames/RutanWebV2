import {
  SET_MONITORING_EMPLOYEE_LIST_DATA,
  SET_FORM_STATUS,
  SET_PAGING_MONITORING_EMPLOYEE,
} from "./MonitoringEmployeeActions";

export const initialState = {
  listMonitoringEmployee: [],
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 1,
  },
};

export default function monitoringEmployeeReducer(
  state = initialState,
  action
) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_MONITORING_EMPLOYEE_LIST_DATA:
      newState.listMonitoringEmployee = action.payload;
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
