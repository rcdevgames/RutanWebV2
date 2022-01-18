import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_JOB_FORMS_LIST_DATA = "SET_JOB_FORMS_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_JOB_FORMS_ID = "SET_SELECTED_BRANCH_ID";
export const SET_SELECTED_JOB_FORMS_DATA = "SET_SELECTED_JOB_FORMS_DATA";

export const setJobFormsListData = (payload) => {
  return {
    type: SET_JOB_FORMS_LIST_DATA,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedJobFormsId = (payload) => {
  return {
    type: SET_SELECTED_JOB_FORMS_ID,
    payload,
  };
};

export const setSelectedJobFormsData = (payload) => {
  return {
    type: SET_SELECTED_JOB_FORMS_DATA,
    payload,
  };
};

// === INTERNAL FUNCTION ===
const doDeleteBranchProcess = async (jobFormsId) => {
  try {
    await Invoke.deleteJobForms(jobFormsId);
    showToast("Data berhasil dihapus", "success");
    getJobFormsListDataRequested();
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddJobFormsProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.name = values.description;
    payload.description = values.description;
    await Invoke.addJobForms(payload);
    showToast("Data Berhasil Disimpan", "success");
    getJobFormsListDataRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditJobFormsProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.description;
    payload.description = values.description;
    await Invoke.updateJobForms(payload);
    showToast("Data Berhasil Disimpan", "success");
    getJobFormsListDataRequested();
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
  dispatch(change("editJobForms", `id`, ""));
  dispatch(change("editJobForms", `description`, ""));
};

export const mapDetailJobFormsToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().jobForms.selectedJobFormsData;
  dispatch(change("editJobForms", `id`, data.id ?? ""));
  dispatch(change("editJobForms", `judul`, data.name ?? ""));
  dispatch(change("editJobForms", `description`, data.description ?? ""));
};

export const getJobFormsListDataRequested = async () => {
  try {
    const { data } = await Invoke.getListJobForm(1, 100);
    store.dispatch(setJobFormsListData(data.callback));
  } catch (error) {
    console.log(error);
  }
};

export const saveJobFormsRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddJobFormsProcess(values);
      } else {
        doEditJobFormsProcess(values);
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

export const deleteJobFormsRequested = async (branchId) => {
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
