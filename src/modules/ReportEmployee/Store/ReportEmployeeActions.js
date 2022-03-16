import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import moment from "moment";

export const SET_REPORT_EMPLOYEE_LIST_DATA = "SET_REPORT_EMPLOYEE_LIST_DATA";
export const SET_PAGING_REPORT_EMPLOYEE = "SET_PAGING_REPORT_EMPLOYEE";
export const SET_FORM_STATUS = "SET_FORM_STATUS";

export const setReportEmployeeListData = (payload) => {
  return {
    type: SET_REPORT_EMPLOYEE_LIST_DATA,
    payload,
  };
};

export const setPagingReportEmployee = (payload) => {
  return {
    type: SET_PAGING_REPORT_EMPLOYEE,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const getReportEmployeeDataRequested = async (
  page = 1,
  limit = 999999,
  keyword = "",
  type = "all",
  branchId = "",
  from = moment().format("YYYY-MM-DD").toString(),
  until = moment().format("YYYY-MM-DD").toString()
) => {
  const { getState } = store;
  const paging = getState().reportEmployee.paging;
  const { totalPage } = paging;
  try {
    const { data } = await Invoke.getReportEmployee(
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

    const newReportEmployee = [];

    if (data.message.length > 0) {
      data.message.map((item, index) => {
        item.data.map((itemData, indexData) => {
          newReportEmployee.push({
            ...itemData,
          });
        });
      });
    }

    store.dispatch(setReportEmployeeListData(newReportEmployee ?? []));
    store.dispatch(setPagingReportEmployee(paging));
  } catch (error) {
    console.log(error);
  }
};

export const handleSearch = async (values) => {
  const { getState } = store;
  const { page, limit } = getState().reportEmployee;

  if (!values) {
    await getReportEmployeeDataRequested(page, limit);
    return;
  }

  const keyword = values.keyword ?? "";
  const splitBranch = values.branch ? values.branch.split("|") : "";
  const startDate = moment(values.startDate).format("YYYY-MM-DD") ?? "";
  const endDate = moment(values.endDate).format("YYYY-MM-DD") ?? "";

  const branch = values.branch ? splitBranch[0] : "";

  try {
    await getReportEmployeeDataRequested(
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
