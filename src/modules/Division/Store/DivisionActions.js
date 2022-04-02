import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_DIVISION_LIST_DATA = "SET_DIVISION_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_DIVISION_ID = "SET_SELECTED_DIVISION_ID";
export const SET_SELECTED_DIVISION_DATA = "SET_SELECTED_DIVISION_DATA";
export const SET_PAGING_DIVISION = "SET_PAGING_DIVISION";

export const setDivisionListData = (payload) => {
  return {
    type: SET_DIVISION_LIST_DATA,
    payload,
  };
};

export const setPagingDivision = (payload) => {
  return {
    type: SET_PAGING_DIVISION,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedDivisionId = (payload) => {
  return {
    type: SET_SELECTED_DIVISION_ID,
    payload,
  };
};

export const setSelectedDivisionData = (payload) => {
  return {
    type: SET_SELECTED_DIVISION_DATA,
    payload,
  };
};

// === INTERNAL FUNCTION ===
const doDeleteUnitProcess = async (unitId) => {
  const { getState } = store;
  const paging = getState().units.paging;
  const { page, limit } = paging;
  try {
    await Invoke.deleteUnitById(unitId);
    showToast("Data berhasil dihapus", "success");
    getDivisionListDataRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddUnitProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().units.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.name = values.name;
    payload.description = values.description;
    payload.photo = values.imageUrl;
    await Invoke.addUnit(payload);
    showToast("Data Berhasil Disimpan", "success");
    getDivisionListDataRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditUnitProcess = async (values) => {
  store.dispatch(ComponentActions.setGlobalLoading(true));
  const { dispatch, getState } = store;
  const paging = getState().units.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.name;
    payload.photo = values.imageUrl;
    payload.description = values.description;
    await Invoke.updateUnit(payload);
    showToast("Data Berhasil Disimpan", "success");
    getDivisionListDataRequested(page, limit);
    store.dispatch(ComponentActions.setGlobalLoading(false));
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    store.dispatch(ComponentActions.setGlobalLoading(false));
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};
// === INTERNAL FUNCTION ===

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editUnitForm", `id`, ""));
  dispatch(change("editUnitForm", `name`, ""));
  dispatch(change("editUnitForm", `description`, ""));
  dispatch(change("editUnitForm", `imageUrl`, ""));
};

export const mapDetailUnitToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().units.selectedUnitsData;

  dispatch(change("editUnitForm", `id`, data.id ?? ""));
  dispatch(change("editUnitForm", `name`, data.name ?? ""));
  dispatch(change("editUnitForm", `description`, data.description ?? ""));
  dispatch(change("editUnitForm", `imageUrl`, data.photo ?? ""));
};

export const getDivisionListDataRequested = async (
  page,
  limit,
  keyword = ""
) => {
  try {
    const { data } = await Invoke.getDivisionList(page, limit, keyword);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setDivisionListData(data.callback.data));
    store.dispatch(setPagingDivision(paging));
  } catch (error) {
    console.log(error);
  }
};

export const saveUnitRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddUnitProcess(values);
      } else {
        doEditUnitProcess(values);
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

export const deleteUnitRequested = async (unitId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteUnitProcess(unitId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
