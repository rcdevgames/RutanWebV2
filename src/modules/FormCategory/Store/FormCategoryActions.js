import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_FORM_CATEGORY_LIST_DATA = "SET_FORM_CATEGORY_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_FORM_CATEGORY_ID = "SET_SELECTED_BRANCH_ID";
export const SET_SELECTED_FORM_CATEGORY_DATA = "SET_SELECTED_BRANCH_DATA";

export const setFormCategoryListData = (payload) => {
  return {
    type: SET_FORM_CATEGORY_LIST_DATA,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedFormCategoryId = (payload) => {
  return {
    type: SET_SELECTED_FORM_CATEGORY_ID,
    payload,
  };
};

export const setSelectedFormCategoryData = (payload) => {
  return {
    type: SET_SELECTED_FORM_CATEGORY_DATA,
    payload,
  };
};

// === INTERNAL FUNCTION ===
const doDeleteFormCategoryProcess = async (categoryFormId) => {
  try {
    await Invoke.deleteFormCategory(categoryFormId);
    showToast("Data berhasil dihapus", "success");
    getFormCatgeoryListDataRequested();
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddFormCategoryProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.name = values.name;
    payload.description = "none";
    await Invoke.addFormCategory(payload);
    showToast("Data Berhasil Disimpan", "success");
    getFormCatgeoryListDataRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditFormCategoryProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.name;
    payload.description = values.description ?? "Nones";
    await Invoke.updateFormCategory(payload);
    showToast("Data Berhasil Disimpan", "success");
    getFormCatgeoryListDataRequested();
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
  dispatch(change("editFormCategory", `id`, ""));
  dispatch(change("editFormCategory", `description`, ""));
};

export const mapDetailCategoryToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().formCategory.selectedFormCategoryData;
  dispatch(change("editFormCategory", `id`, data.id ?? ""));
  dispatch(change("editFormCategory", `name`, data.name ?? ""));
};

export const getFormCatgeoryListDataRequested = async () => {
  try {
    const { data } = await Invoke.getFormCategory(1, 100);
    store.dispatch(setFormCategoryListData(data.callback));
  } catch (error) {
    console.log(error);
  }
};

export const saveFormCategoryRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddFormCategoryProcess(values);
      } else {
        doEditFormCategoryProcess(values);
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

export const deleteFormCategoryRequested = async (formCategoryId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteFormCategoryProcess(formCategoryId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
