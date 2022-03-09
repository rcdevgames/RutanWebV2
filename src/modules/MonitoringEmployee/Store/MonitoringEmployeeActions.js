import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import moment from "moment";
import { getIndex } from "../../../app/Helpers";

export const SET_MONITORING_EMPLOYEE_LIST_DATA =
  "SET_MONITORING_EMPLOYEE_LIST_DATA";
export const SET_PAGING_MONITORING_EMPLOYEE = "SET_PAGING_MONITORING_EMPLOYEE";
export const SET_FORM_STATUS = "SET_FORM_STATUS";

export const setMonitoringEmployeeListData = (payload) => {
  return {
    type: SET_MONITORING_EMPLOYEE_LIST_DATA,
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

export const getMonitoringEmployeeListDataRequested = async (
  page,
  limit,
  keyword = "",
  type = "all",
  from = moment().format("YYYY-MM-DD").toString(),
  until = moment().format("YYYY-MM-DD").toString()
) => {
  const { getState } = store;
  const paging = getState().monitoringEmployee.paging;
  const { totalPage } = paging;
  try {
    const { data } = await Invoke.getReportMonitoringEmployee(
      page,
      limit,
      from,
      until,
      type,
      keyword
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
            no: getIndex(page, limit)[indexData],
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
