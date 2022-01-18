import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_UNIT_LIST_DATA = "SET_UNIT_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_UNIT_ID = "SET_SELECTED_UNIT_ID";
export const SET_SELECTED_UNIT_DATA = "SET_SELECTED_UNIT_DATA";

export const setUnitListData = (payload) => {
  return {
    type: SET_UNIT_LIST_DATA,
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
    type: SET_SELECTED_UNIT_ID,
    payload,
  };
};

export const setSelectedBranchData = (payload) => {
  return {
    type: SET_SELECTED_UNIT_DATA,
    payload,
  };
};

// === INTERNAL FUNCTION ===
const doDeleteBranchProcess = async (branchId) => {
  try {
    await Invoke.deleteBranchById(branchId);
    showToast("Data berhasil dihapus", "success");
    getUnitListDataRequested();
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddBranchProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.name = values.description;
    payload.description = values.description;
    await Invoke.addBranch(payload);
    showToast("Data Berhasil Disimpan", "success");
    getUnitListDataRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditBranchProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.description;
    payload.description = values.description;
    await Invoke.updateBranch(payload);
    showToast("Data Berhasil Disimpan", "success");
    getUnitListDataRequested();
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

export const getUnitListDataRequested = async () => {
  try {
    const { data } = await Invoke.getUnitList(1, 100);
    store.dispatch(setUnitListData(data.callback));
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
