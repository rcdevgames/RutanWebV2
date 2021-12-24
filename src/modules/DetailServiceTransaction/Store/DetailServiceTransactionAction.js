import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA =
  "SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA";

export const setSelectedServicesEmployeeListData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA,
    payload,
  };
};

export const getJobServiceEmployeeList = async (jobId) => {
  const { dispatch } = store;
  const { data } = await Invoke.getServicesEmployee(jobId, 1, 100);
  const serviceEmployeeList = data.callback;

  const results = Promise.all(
    serviceEmployeeList.map(async (item, index) => {
      let subIitem = {};
      subIitem.active = item.active;
      const employee = await Invoke.getEmployeeById(item.employee_id);
      subIitem = { ...subIitem, ...employee.data.callback };
      return subIitem;
    })
  );
  dispatch(setSelectedServicesEmployeeListData(await results));
};

export const handleAddNewEmployeeService = async (jobId, employeeId) => {
  const payload = {};
  payload.employee_id = employeeId;
  payload.active = "true";
  await Invoke.addNewEmployeeService(jobId, payload);
};

export const handleNonActiveEmployeeService = async (jobId, employeeId) => {
    const payload = {};
    payload.employee_id = employeeId;
    payload.active = "true";
    await Invoke.addNewEmployeeService(jobId, payload);
  };
