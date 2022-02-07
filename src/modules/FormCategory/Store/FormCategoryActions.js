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
export const SET_PAGING_FORM_CATEGORY = "SET_PAGING_FORM_CATEGORY";

export const setFormCategoryListData = (payload) => {
  return {
    type: SET_FORM_CATEGORY_LIST_DATA,
    payload,
  };
};

export const setPagingFormCategory = (payload) => {
  return {
    type: SET_PAGING_FORM_CATEGORY,
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
  const { getState } = store;
  const paging = getState().branch.paging;
  const { page, limit } = paging;
  try {
    await Invoke.deleteFormCategory(categoryFormId);
    showToast("Data berhasil dihapus", "success");
    getFormCatgeoryListDataRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddFormCategoryProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().branch.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.name = values.name;
    payload.description = "none";
    await Invoke.addFormCategory(payload);
    showToast("Data Berhasil Disimpan", "success");
    getFormCatgeoryListDataRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditFormCategoryProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().branch.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.name;
    payload.description = values.description ?? "Nones";
    await Invoke.updateFormCategory(payload);
    showToast("Data Berhasil Disimpan", "success");
    getFormCatgeoryListDataRequested(page, limit);
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

export const getFormCatgeoryListDataRequested = async (
  page,
  limit,
  keyword = ""
) => {
  try {
    const { data } = await Invoke.getFormCategory(page, limit, keyword);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setFormCategoryListData(data.callback.data));
    store.dispatch(setPagingFormCategory(paging));
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
