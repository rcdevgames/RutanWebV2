import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { change } from "redux-form";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_LIST_ADMIN = "SET_LIST_ADMIN";
export const SET_PAGING_ADMIN = "SET_PAGING_ADMIN";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_ADMIN_ID = "SET_SELECTED_ADMIN_ID";
export const SET_SELECTED_ADMIN_DATA = "SET_SELECTED_ADMIN_DATA";

export const setListAdmin = (payload) => {
  return {
    type: SET_LIST_ADMIN,
    payload,
  };
};

export const setPagingAdmin = (payload) => {
  return {
    type: SET_PAGING_ADMIN,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedAdminId = (payload) => {
  return {
    type: SET_SELECTED_ADMIN_ID,
    payload,
  };
};

export const setSelectedAdminData = (payload) => {
  return {
    type: SET_SELECTED_ADMIN_DATA,
    payload,
  };
};

export const getListAdminRequested = async (page, limit, keyword = "") => {
  try {
    const { data } = await Invoke.getListAdmin(page, limit, keyword);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setListAdmin(data.callback.data));
    store.dispatch(setPagingAdmin(paging));
  } catch (error) {
    console.log(error);
  }
};

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editAdminForm", `id`, ""));
  dispatch(change("editAdminForm", `username`, ""));
  dispatch(change("editAdminForm", `fullname`, ""));
  dispatch(change("editAdminForm", `password`, ""));
};

const doAddAdminProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().admins.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.username = values.username;
    payload.fullname = values.fullname;
    payload.password = values.password;
    await Invoke.addAdmin(payload);
    showToast("Data Berhasil Disimpan", "success");
    getListAdminRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditAdminProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().admins.paging;
  const { page, limit } = paging;

  try {
    const payload = {};
    payload.id = values.id;
    payload.username = values.username;
    payload.fullname = values.fullname;
    payload.password = values.password;
    await Invoke.updateAdmin(payload);
    showToast("Data Berhasil Disimpan", "success");
    getListAdminRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doDeleteAdminProcess = async (adminId) => {
  const { getState } = store;
  const paging = getState().admins.paging;
  const { page, limit } = paging;

  try {
    await Invoke.deleteAdminById(adminId);
    showToast("Data berhasil dihapus", "success");
    getListAdminRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

export const saveAdminRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddAdminProcess(values);
      } else {
        doEditAdminProcess(values);
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

export const mapDetailAdminToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().admins.selectedAdminData;
  dispatch(change("editAdminForm", `id`, data.id ?? ""));
  dispatch(change("editAdminForm", `username`, data.username ?? ""));
  dispatch(change("editAdminForm", `fullname`, data.fullname ?? ""));
};

export const deleteAdminRequested = async (adminId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteAdminProcess(adminId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
