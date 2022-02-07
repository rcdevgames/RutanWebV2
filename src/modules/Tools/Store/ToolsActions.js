import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_TOOLS_LIST_DATA = "SET_TOOLS_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_TOOLS_ID = "SET_SELECTED_TOOLS_ID";
export const SET_SELECTED_TOOLS_DATA = "SET_SELECTED_TOOLS_DATA";
export const SET_PAGING_TOOLS = "SET_PAGING_TOOLS";

export const setToolsListData = (payload) => {
  return {
    type: SET_TOOLS_LIST_DATA,
    payload,
  };
};

export const setPagingTools = (payload) => {
  return {
    type: SET_PAGING_TOOLS,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedToolsId = (payload) => {
  return {
    type: SET_SELECTED_TOOLS_ID,
    payload,
  };
};

export const setSelectedToolsData = (payload) => {
  return {
    type: SET_SELECTED_TOOLS_DATA,
    payload,
  };
};

// === INTERNAL FUNCTION ===
const doDeleteToolsProcess = async (toolsId) => {
  const { getState } = store;
  const paging = getState().tools.paging;
  const { page, limit } = paging;
  try {
    await Invoke.deleteTool(toolsId);
    showToast("Data berhasil dihapus", "success");
    getToolsListDataRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddToolsProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().tools.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.name = values.name;
    payload.description = values.description ?? "None";
    await Invoke.addTool(payload);
    showToast("Data Berhasil Disimpan", "success");
    getToolsListDataRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditToolsProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().tools.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.name;
    payload.description = values.description ?? "None";
    await Invoke.updateTool(payload);
    showToast("Data Berhasil Disimpan", "success");
    getToolsListDataRequested(page, limit);
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
  dispatch(change("editToolsForm", `id`, ""));
  dispatch(change("editToolsForm", `name`, ""));
  dispatch(change("editToolsForm", `description`, ""));
};

export const mapDetailToolsToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().tools.selectedToolsData;
  dispatch(change("editToolsForm", `id`, data.id ?? ""));
  dispatch(change("editToolsForm", `name`, data.name ?? ""));
  dispatch(change("editToolsForm", `description`, data.description ?? ""));
};

export const getToolsListDataRequested = async (page, limit, keyword = "") => {
  try {
    const { data } = await Invoke.getListTools(page, limit, keyword);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setToolsListData(data.callback.data));
    store.dispatch(setPagingTools(paging));
  } catch (error) {
    console.log(error);
  }
};

export const saveToolsRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddToolsProcess(values);
      } else {
        doEditToolsProcess(values);
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

export const deleteToolsRequested = async (branchId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteToolsProcess(branchId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
