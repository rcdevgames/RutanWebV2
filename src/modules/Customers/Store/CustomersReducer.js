import {
  SET_CUSTOMER_LIST_DATA,
  SET_PAGING_CUSTOMER,
  SET_FORM_STATUS,
  SET_SELECTED_CUSTOMER_DATA,
  SET_SELECTED_CUSTOMER_ID,
} from "./CustomersActions";

export const initialState = {
  listCustomers: [],
  formStatus: "add",
  selectedCustomerData: {},
  selectedCustomerId: "",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
  keyword: "",
};

export default function authReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CUSTOMER_LIST_DATA:
      newState.listCustomers = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_PAGING_CUSTOMER:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };

    case SET_SELECTED_CUSTOMER_DATA:
      newState.selectedCustomerData = action.payload;
      return { ...newState };

    case SET_SELECTED_CUSTOMER_ID:
      newState.selectedCustomerId = action.payload;
      return { ...newState };
  }

  return state;
}
