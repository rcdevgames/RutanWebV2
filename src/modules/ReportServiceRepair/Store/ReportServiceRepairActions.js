import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import moment from "moment";

export const SET_SERVICE_REPAIR_LIST_DATA = "SET_MONITORING_EMPLOYEE_LIST_DATA";
export const SET_PAGING_SERVICE_REPAIR = "SET_PAGING_MONITORING_EMPLOYEE";
export const SET_FORM_STATUS = "SET_FORM_STATUS";

export const setServiceRepairListData = (payload) => {
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
  branchId = "",
  from = moment().format("YYYY-MM-DD").toString(),
  until = moment().format("YYYY-MM-DD").toString()
) => {
  const { getState } = store;
  const paging = getState().serviceRepair.paging;
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

    const newListServiceRepair = [];

    if (data.callback.length > 0) {
      data.callback.map((item, index) => {
        newListServiceRepair.push({
          ...item,
        });
      });
    }

    store.dispatch(setServiceRepairListData(newListServiceRepair ?? []));
    store.dispatch(setPagingServiceRepair(paging));
  } catch (error) {
    console.log(error);
  }
};

export const handleSearch = async (values, isBlock) => {
  const { getState } = store;
  const { page, limit } = getState().serviceRepair.paging;
  const defaultBranch = getState().auth.userDetail.branchId;

  if (!values) {
  }

  if (!values) {
    if (isBlock) {
      await getServiceRepairListDataRequested(
        page,
        limit,
        "",
        "all",
        defaultBranch
      );
      return;
    } else {
      await getServiceRepairListDataRequested(page, limit);
      return;
    }
  }

  const keyword = values.keyword ?? "";
  const splitBranch = values.branch ? values.branch.split("|") : "";
  const startDate = moment(values.startDate).format("YYYY-MM-DD") ?? "";
  const endDate = moment(values.endDate).format("YYYY-MM-DD") ?? "";

  const specificBranch = values.branch ? splitBranch[0] : "";
  const branch = isBlock ? defaultBranch : specificBranch;

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
