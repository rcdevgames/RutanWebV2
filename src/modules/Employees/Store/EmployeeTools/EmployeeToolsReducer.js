import {
  SET_EMPLOYEE_TOOL_LIST_DATA,
  SET_SELECTED_EMPLOYEE_TOOLS_ID,
  SET_SELECTED_EMPLOYEE_TOOLS_DATA,
  SET_FORM_STATUS,
  SET_PAGING_EMPLOYEE_TOOLS,
} from "./EmployeeToolsActions";

export const initialState = {
  listEmployeeTools: [],
  selectedEmployeeToolsId: "",
  selectedEmployeeToolsData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function employeesToolsReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_EMPLOYEE_TOOL_LIST_DATA:
      newState.listEmployeeTools = action.payload;
      return { ...newState };

    case SET_SELECTED_EMPLOYEE_TOOLS_ID:
      newState.selectedEmployeeToolsId = action.payload;
      return { ...newState };

    case SET_SELECTED_EMPLOYEE_TOOLS_DATA:
      newState.selectedEmployeeToolsData = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_PAGING_EMPLOYEE_TOOLS:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
