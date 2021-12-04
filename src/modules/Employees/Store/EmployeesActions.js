import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { setGlobalLoading } from "../../App/Store/ComponentAction";

export const SET_EMPLOYEE_LIST_DATA = "SET_EMPLOYEE_LIST_DATA";

export const setEmployeeListData = (payload) => {
  return {
    type: SET_EMPLOYEE_LIST_DATA,
    payload,
  };
};

export const loadEmployeeListData = async () => {
  try {
    const { data } = await Invoke.getEmployeeList(1, 100);
    store.dispatch(setEmployeeListData(data.callback));
    store.dispatch(setGlobalLoading(false));
  } catch (error) {
    store.dispatch(setGlobalLoading(false));
    console.log(error);
  }
};

export const getCustomerListDataByPaging = async (page, limit) => {
  try {
    const { data } = await Invoke.getEmployeeList(page, limit);
    store.dispatch(setEmployeeListData(data));
  } catch (error) {
    console.log(error);
  }
};
