import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_BRANCH_LIST_DATA = "SET_BRANCH_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_BRANCH_ID = "SET_SELECTED_BRANCH_ID";
export const SET_SELECTED_BRANCH_DATA = "SET_SELECTED_BRANCH_DATA";
export const SET_PAGING_BRANCH = "SET_PAGING_BRANCH";
export const SET_BRANCH_LIST_DATA_DROPDOWN = "SET_BRANCH_LIST_DATA_DROPDOWN";

export const setBranchListData = (payload) => {
  return {
    type: SET_BRANCH_LIST_DATA,
    payload,
  };
};

export const setBranchListDataDropdown = (payload) => {
  return {
    type: SET_BRANCH_LIST_DATA_DROPDOWN,
    payload,
  };
};

export const setPagingBranch = (payload) => {
  return {
    type: SET_PAGING_BRANCH,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedBranchId = (payload) => {
  return {
    type: SET_SELECTED_BRANCH_ID,
    payload,
  };
};

export const setSelectedBranchData = (payload) => {
  return {
    type: SET_SELECTED_BRANCH_DATA,
    payload,
  };
};

// === INTERNAL FUNCTION ===
const doDeleteBranchProcess = async (branchId) => {
  const { getState } = store;
  const paging = getState().branch.paging;
  const { page, limit } = paging;

  try {
    await Invoke.deleteBranchById(branchId);
    showToast("Data berhasil dihapus", "success");
    getBranchListDataRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddBranchProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().branch.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.name = values.description;
    payload.description = values.description;
    await Invoke.addBranch(payload);
    showToast("Data Berhasil Disimpan", "success");
    getBranchListDataRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditBranchProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().branch.paging;
  const { page, limit } = paging;

  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.description;
    payload.description = values.description;
    await Invoke.updateBranch(payload);
    showToast("Data Berhasil Disimpan", "success");
    getBranchListDataRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};
// === INTERNAL FUNCTION ===

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editBranchForm", `id`, ""));
  dispatch(change("editBranchForm", `description`, ""));
};

export const mapDetailBranchToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().branch.selectedBranchData;
  dispatch(change("editBranchForm", `id`, data.id ?? ""));
  dispatch(change("editBranchForm", `description`, data.name ?? ""));
};

export const getBranchListDataRequested = async (
  page,
  limit,
  keyword = "",
  isDropdown = false
) => {
  try {
    const { data } = await Invoke.getListBranch(page, limit, keyword);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    if (isDropdown) {
      store.dispatch(setBranchListDataDropdown(data.callback.data));
    } else {
      store.dispatch(setBranchListData(data.callback.data));
    }
    store.dispatch(setPagingBranch(paging));
  } catch (error) {
    console.log(error);
  }
};

export const saveBranchRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddBranchProcess(values);
      } else {
        doEditBranchProcess(values);
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

export const deleteBranchRequested = async (branchId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteBranchProcess(branchId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
