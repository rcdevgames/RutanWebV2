import { SET_EMPLOYEE_LIST_DATA } from "./EmployeesActions";

export const initialState = {
  listEmployees: [],
};

export default function employeesReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_EMPLOYEE_LIST_DATA:
      newState.listEmployees = action.payload;
      return { ...newState };
  }

  return state;
}
