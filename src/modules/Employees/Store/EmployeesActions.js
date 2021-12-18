import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { setGlobalLoading } from "../../App/Store/ComponentAction";

export const SET_EMPLOYEE_LIST_DATA = "SET_EMPLOYEE_LIST_DATA";
export const SET_SELECTED_EMPLOYEE_ID = "SET_SELECTED_EMPLOYEE_ID";
export const SET_SELECTED_EMPLOYEE_DATA = "SET_SELECTED_EMPLOYEE_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";

export const setEmployeeListData = (payload) => {
  return {
    type: SET_EMPLOYEE_LIST_DATA,
    payload,
  };
};

export const setSelectedEmployeeId = (payload) => {
  return {
    type: SET_SELECTED_EMPLOYEE_ID,
    payload,
  };
};

export const setSelectedEmployeeData = (payload) => {
  return {
    type: SET_SELECTED_EMPLOYEE_DATA,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
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

export const getEmployeeDataByIdRequested = async (employeeId) => {
  try {
    const { data } = await Invoke.getEmployeeById(employeeId);
    store.dispatch(setSelectedEmployeeData(data.callback));
  } catch (error) {
    console.log(error);
  }
};

export const setAutoPopulateEmployee = () => {
  const { getState, dispatch } = store;
  const selectedEmployeeData = getState().employees.selectedEmployeeData;
  dispatch(change("editEmployeeForm", "name", selectedEmployeeData.name ?? ""));
  dispatch(
    change("editEmployeeForm", "address", selectedEmployeeData.address ?? "")
  );
  dispatch(
    change(
      "editEmployeeForm",
      "province",
      selectedEmployeeData["province_name"] ?? ""
    )
  );
  dispatch(
    change("editEmployeeForm", "city", selectedEmployeeData["city_name"] ?? "")
  );
};
