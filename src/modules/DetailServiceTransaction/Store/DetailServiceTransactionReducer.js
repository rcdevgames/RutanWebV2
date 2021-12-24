import { SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA } from "./DetailServiceTransactionAction";

export const initialState = {
  selectedServiceEmployeeList: [],
};

export default function detailServiceTransactionReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA:
      newState.selectedServiceEmployeeList = action.payload;
      return { ...newState };
  }

  return state;
}
