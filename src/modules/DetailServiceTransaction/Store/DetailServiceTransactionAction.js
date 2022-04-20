import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { navigate } from "../../../app/Helpers";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA =
  "SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA";

export const SET_SELECTED_SERVICES_SUMMARY_DATA =
  "SET_SELECTED_SERVICES_SUMMARY_DATA";

export const SET_SELECTED_SERVICES_MEDIA_DATA =
  "SET_SELECTED_SERVICES_MEDIA_DATA";

export const SET_SELECTED_SERVICES_DAILIES_DATA =
  "SET_SELECTED_SERVICES_DAILIES_DATA";

export const SET_SELECTED_SERVICES_HISTORIES_DATA =
  "SET_SELECTED_SERVICES_HISTORIES_DATA";

export const SET_SELECTED_SERVICES_CHECKLIST_DATA =
  "SET_SELECTED_SERVICES_CHECKLIST_DATA";

export const SET_SELECTED_SERVICES_REJECTED_DATA =
  "SET_SELECTED_SERVICES_REJECTED_DATA";

export const setSelectedServicesEmployeeListData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA,
    payload,
  };
};

export const setSelectedServicesChecklisttData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_CHECKLIST_DATA,
    payload,
  };
};

export const setSelectedSummaryData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_SUMMARY_DATA,
    payload,
  };
};

export const setSelectedServiceMediaData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_MEDIA_DATA,
    payload,
  };
};

export const setSelectedServiceDailiesData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_DAILIES_DATA,
    payload,
  };
};

export const setSelectedServiceHistoriesData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_HISTORIES_DATA,
    payload,
  };
};

export const setSelectedServiceRejectedData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_REJECTED_DATA,
    payload,
  };
};

export const getJobServiceEmployeeList = async (jobId) => {
  const { dispatch } = store;
  const { data } = await Invoke.getServicesEmployee(jobId, 1, 100);
  const serviceEmployeeList = data.callback.data;

  const results = Promise.all(
    serviceEmployeeList.map(async (item, index) => {
      let subIitem = {};
      subIitem.active = item.active;
      subIitem.employee_service_id = item.id;
      const employee = await Invoke.getEmployeeById(item.employee_id);
      subIitem = { ...subIitem, ...employee.data.callback };
      return subIitem;
    })
  );
  dispatch(setSelectedServicesEmployeeListData(await results));
};

export const getJobServiceSummary = async (jobId, unitId = "") => {
  const { dispatch } = store;
  try {
    const { data } = await Invoke.getJobServiceSummary(jobId, unitId);
    dispatch(setSelectedSummaryData(data.callback));
  } catch (error) {
    dispatch(setSelectedSummaryData([]));
  }
};

export const getJobServiceMedia = async (jobId, unitId = "") => {
  const { dispatch } = store;
  try {
    const { data } = await Invoke.getJobServiceMedia(jobId, unitId);
    dispatch(setSelectedServiceMediaData(data.callback.data));
  } catch (error) {
    dispatch(setSelectedServiceMediaData([]));
  }
};

export const getJobServiceDailies = async (jobId, unitId = "") => {
  const { dispatch } = store;
  try {
    const { data } = await Invoke.getJobServiceDailies(jobId, unitId);
    dispatch(setSelectedServiceDailiesData(data.callback.data));
  } catch (error) {
    dispatch(setSelectedServiceDailiesData([]));
  }
};

export const getJobServiceHistories = async (jobId, keyword = "") => {
  const { dispatch } = store;
  const { data } = await Invoke.getJobServiceHistories(jobId, 1, 100, keyword);
  dispatch(setSelectedServiceHistoriesData(data.callback.logs));
};

export const getJobServiceRejections = async (jobId) => {
  const { dispatch } = store;
  const { data } = await Invoke.getRejectedData(jobId);
  dispatch(setSelectedServiceRejectedData(data.callback));
};

export const getChecklistData = async (jobId) => {
  const { dispatch } = store;
  const { data } = await Invoke.getChecklistData(jobId);
  dispatch(setSelectedServicesChecklisttData(data.callback.data));
};

export const handleAddNewEmployeeService = async (jobId, employeeId) => {
  const { dispatch } = store;
  try {
    dispatch(ComponentActions.setGlobalLoading(true));
    const payload = {};
    payload.employee_id = employeeId;
    payload.active = "true";
    await Invoke.addNewEmployeeService(jobId, payload);
    setTimeout(() => {
      dispatch(ComponentActions.setGlobalModal(false));
      dispatch(ComponentActions.setGlobalLoading(false));
      getJobServiceEmployeeList(jobId);
    }, 500);
  } catch (error) {
    dispatch(ComponentActions.setGlobalLoading(false));
  }
};

export const setStatusEmployee = async (
  jobId,
  employeeServiceId,
  employeeId,
  isActive
) => {
  const payload = {};
  payload.id = employeeServiceId;
  payload.employee_id = employeeId;
  payload.active = isActive;
  await Invoke.setStatusEmployeeService(jobId, payload);
  setTimeout(() => {
    getJobServiceEmployeeList(jobId);
  }, 500);
};

export const generatePDF = () => {};
