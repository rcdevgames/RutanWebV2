import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import moment from "moment";

export const SET_SERVICE_REPAIR_LIST_DATA = "SET_MONITORING_EMPLOYEE_LIST_DATA";
export const SET_PAGING_SERVICE_REPAIR = "SET_PAGING_MONITORING_EMPLOYEE";
export const SET_FORM_STATUS = "SET_FORM_STATUS";

export const setMonitoringEmployeeListData = (payload) => {
  return {
    type: SET_SERVICE_REPAIR_LIST_DATA,
    payload,
  };
};

export const setPagingServiceRepair = (payload) => {
  return {
    type: SET_PAGING_SERVICE_REPAIR,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const getServiceRepairListDataRequested = async (
  page = 1,
  limit = 999999,
  keyword = "",
  type = "all",
  branchId = "",
  from = moment().format("YYYY-MM-DD").toString(),
  until = moment().format("YYYY-MM-DD").toString()
) => {
  const { getState } = store;
  const paging = getState().monitoringEmployee.paging;
  const { totalPage } = paging;
  try {
    const { data } = await Invoke.getReportServiceRepair(
      page,
      limit,
      from,
      until,
      keyword,
      branchId
    );
    const paging = {};
    paging.page = page;
    paging.limit = limit;
    paging.totalPage = totalPage;

    const newListMonitoringEmployee = [];

    if (data.message.length > 0) {
      data.message.map((item, index) => {
        item.data.map((itemData, indexData) => {
          newListMonitoringEmployee.push({
            ...itemData,
          });
        });
      });
    }

    store.dispatch(
      setMonitoringEmployeeListData(newListMonitoringEmployee ?? [])
    );
    store.dispatch(setPagingMonitoringEmployee(paging));
  } catch (error) {
    console.log(error);
  }
};

export const handleSearch = async (values) => {
  const { getState } = store;
  const { page, limit } = getState().monitoringEmployee;

  if (!values) {
    await getServiceRepairListDataRequested(page, limit);
    return;
  }

  const keyword = values.keyword ?? "";
  const splitBranch = values.branch ? values.branch.split("|") : "";
  const startDate = moment(values.startDate).format("YYYY-MM-DD") ?? "";
  const endDate = moment(values.endDate).format("YYYY-MM-DD") ?? "";

  const branch = values.branch ? splitBranch[0] : "";

  try {
    await getServiceRepairListDataRequested(
      page,
      limit,
      keyword,
      branch,
      startDate,
      endDate
    );
  } catch (error) {
    console.log(error);
  }
};
