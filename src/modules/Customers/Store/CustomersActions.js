import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { setGlobalLoading } from "../../App/Store/ComponentAction";

export const SET_CUSTOMER_LIST_DATA = "SET_CUSTOMER_LIST_DATA";
export const SET_PAGING_CUSTOMER = "SET_PAGING_CUSTOMER";

export const setCustomerListData = (payload) => {
  return {
    type: SET_CUSTOMER_LIST_DATA,
    payload,
  };
};

export const setPagingCustomer = (payload) => {
  return {
    type: SET_PAGING_CUSTOMER,
    payload,
  };
};

export const loadCustomerListData = async () => {
  try {
    const { data } = await Invoke.getCustomerList(1, 100);
    store.dispatch(setCustomerListData(data.callback.data));
    store.dispatch(setGlobalLoading(false));
  } catch (error) {
    store.dispatch(setGlobalLoading(false));
    console.log(error);
  }
};

export const getCustomerListDataByPaging = async (page, limit, keyword) => {
  try {
    const { data } = await Invoke.getCustomerList(page, limit, keyword);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setCustomerListData(data.callback.data));
    store.dispatch(setPagingCustomer(paging));
  } catch (error) {
    console.log(error);
  }
};
