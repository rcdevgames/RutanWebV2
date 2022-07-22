import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import moment from "moment";

export const SET_WORKING_HOURS_LIST_DATA = "SET_WORKING_HOURS_LIST_DATA";
export const SET_PAGING_MONITORING_EMPLOYEE = "SET_PAGING_MONITORING_EMPLOYEE";
export const SET_FORM_STATUS = "SET_FORM_STATUS";

export const setWorkingHoursListData = (payload) => {
  return {
    type: SET_WORKING_HOURS_LIST_DATA,
    payload,
  };
};

export const setPagingMonitoringEmployee = (payload) => {
  return {
    type: SET_PAGING_MONITORING_EMPLOYEE,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const getWorkingHoursListDataRequested = async (
  page = 1,
  limit = 999999,
  keyword = "",
  from = moment().format("YYYY-MM-DD").toString(),
  until = moment().format("YYYY-MM-DD").toString()
) => {
  const { getState } = store;
  const paging = getState().workingHours.paging;
  const { totalPage } = paging;
  try {
    const { data } = await Invoke.getWorkingHours(
      page,
      limit,
      from,
      until,
      keyword
    );
    const paging = {};
    paging.page = page;
    paging.limit = limit;
    paging.totalPage = totalPage;

    const newListWorkingHours = [];

    if (data.callback.data.length > 0) {
      data.callback.data.map((item, index) => {
        newListWorkingHours.push({
          created: moment(item.created_date).format("YYYY-MM-DD"),
          done: moment(item.done_date).format("YYYY-MM-DD"),
          ...item,
        });
      });
    }

    store.dispatch(setWorkingHoursListData(newListWorkingHours ?? []));
    store.dispatch(setPagingMonitoringEmployee(paging));
  } catch (error) {
    console.log(error);
  }
};

export const handleSearch = async (values) => {
  const { getState } = store;
  const { page, limit } = getState().monitoringEmployee.paging;

  if (!values) {
    await getWorkingHoursListDataRequested(page, limit);
    return;
  }
  const keyword = values.keyword ?? "";
  const startDate = moment(values.startDate).format("YYYY-MM-DD") ?? "";
  const endDate = moment(values.endDate).format("YYYY-MM-DD") ?? "";

  try {
    await getWorkingHoursListDataRequested(
      page,
      limit,
      keyword,
      startDate,
      endDate
    );
  } catch (error) {
    console.log(error);
  }
};
