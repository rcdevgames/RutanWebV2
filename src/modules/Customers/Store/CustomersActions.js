import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_CUSTOMER_LIST_DATA = "SET_CUSTOMER_LIST_DATA";

export const setCustomerListData = (payload) => {
  return {
    type: SET_CUSTOMER_LIST_DATA,
    payload,
  };
};

export const loadCustomerListData = async () => {
  try {
    const { data } = await Invoke.getCustomerList(1, 100);
    store.dispatch(setCustomerListData(data.callback));
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerListDataByPaging = async (page, limit) => {
  try {
    const { data } = await Invoke.getCustomerList(page, limit);
    store.dispatch(setCustomerListData(data));
  } catch (error) {
    console.log(error);
  }
};
