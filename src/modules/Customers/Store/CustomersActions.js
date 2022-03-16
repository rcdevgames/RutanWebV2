import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { setGlobalLoading } from "../../App/Store/ComponentAction";
import { toastr } from "react-redux-toastr";
import { change } from "redux-form";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_CUSTOMER_LIST_DATA = "SET_CUSTOMER_LIST_DATA";
export const SET_PAGING_CUSTOMER = "SET_PAGING_CUSTOMER";
export const SET_SELECTED_CUSTOMER_DATA = "SET_SELECTED_CUSTOMER_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_CUSTOMER_ID = "SET_SELECTED_CUSTOMER_ID";

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

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedCustomerData = (payload) => {
  return {
    type: SET_SELECTED_CUSTOMER_DATA,
    payload,
  };
};

export const setSelectedCustomerId = (payload) => {
  return {
    type: SET_SELECTED_CUSTOMER_ID,
    payload,
  };
};

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editCustomerForm", `id`, ""));
  dispatch(change("editCustomerForm", `description`, ""));
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

export const getCustomerListDataByPaging = async (
  page,
  limit,
  keyword = ""
) => {
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

const doDeleteCustomerProcess = async (customerId) => {
  const { getState } = store;
  const paging = getState().branch.paging;
  const { page, limit } = paging;

  try {
    await Invoke.deleteCustomerById(customerId);
    showToast("Data berhasil dihapus", "success");
    getCustomerListDataByPaging(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddCustomerProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().customers.paging;
  const { page, limit } = paging;
  const provinceId = values.province.split("|");
  const cityId = values.city.split("|");
  const branchId = values.branch.split("|");

  try {
    const payload = {};
    payload.username = values.username;
    payload.password = values.password;
    payload.name = values.name;
    payload.branch_id = branchId[0] ?? "";
    payload.province_id = provinceId[0] ?? "";
    payload.city_id = cityId[0] ?? "";
    payload.phone = values.phone ?? "";
    payload.work_hour = values.workHour ?? "";
    payload.pic = values.pic;
    payload.pic_phone = values.picPhone;
    payload.address = values.address;

    await Invoke.addCustomer(payload);
    showToast("Data Berhasil Disimpan", "success");
    getCustomerListDataByPaging(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

export const saveCustomerRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddCustomerProcess(values);
      } else {
        // doEditBranchProcess(values);
      }
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menyimpan Data Ini?",
    toastrConfirmOptions
  );
};

export const mapDetailCustomerToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().customers.selectedCustomerData;
  dispatch(change("editCustomerForm", `id`, data.id ?? ""));
  dispatch(change("editCustomerForm", `description`, data.name ?? ""));
};

export const deleteCustomerRequested = async (customerId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteCustomerProcess(customerId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
