import { SET_CUSTOMER_LIST_DATA } from "./CustomersActions";

export const initialState = {
  listCustomers: [],
};

export default function authReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CUSTOMER_LIST_DATA:
      newState.listCustomers = action.payload;
      return { ...newState };
  }

  return state;
}
