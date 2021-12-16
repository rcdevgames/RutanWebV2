import {
  SET_EMPLOYEE_LIST_DATA,
  SET_SELECTED_EMPLOYEE_ID,
  SET_SELECTED_EMPLOYEE_DATA,
} from "./EmployeesActions";

export const initialState = {
  listEmployees: [],
  selectedEmployeeId: "",
  selectedEmployeeData: {},
};

export default function employeesReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_EMPLOYEE_LIST_DATA:
      newState.listEmployees = action.payload;
      return { ...newState };

    case SET_SELECTED_EMPLOYEE_ID:
      newState.selectedEmployeeId = action.payload;
      return { ...newState };

    case SET_SELECTED_EMPLOYEE_DATA:
      newState.selectedEmployeeData = action.payload;
      return { ...newState };
  }

  return state;
}
