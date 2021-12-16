import Invoke from "../../../app/axios/Invoke";
import { toastr } from "react-redux-toastr";
import { store } from "../../../app/ConfigureStore";
import { toast } from "react-toastify";
import { change } from "redux-form";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_LIST_ROLES = "SET_LIST_ROLES";
export const SET_SELECTED_ROLE_ID = "SET_SELECTED_ROLE_ID";
export const SET_SELECTED_ROLE_DETAIL = "SET_SELECTED_ROLE_DETAIL";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const RESET_STATE = "RESET_STATE";

export const resetState = (payload) => {
  return {
    type: RESET_STATE,
    payload,
  };
};

export const setListRoles = (payload) => {
  return {
    type: SET_LIST_ROLES,
    payload,
  };
};

export const setSelectedRoleId = (payload) => {
  return {
    type: SET_SELECTED_ROLE_ID,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedRoleDetail = (payload) => {
  return {
    type: SET_SELECTED_ROLE_DETAIL,
    payload,
  };
};

const showToast = (message, type) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;

    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
  }
};

export const getListRolesRequested = async () => {
  const { data } = await Invoke.getListRole(1, 100);
  store.dispatch(setListRoles(data.callback));
};

export const mapDetailRoleToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().roles.selectedRoleDetail;
  dispatch(change("editRolesForm", `id`, data.id ?? ""));
  dispatch(change("editRolesForm", `description`, data.description ?? ""));
};

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editRolesForm", `id`, ""));
  dispatch(change("editRolesForm", `description`, ""));
};

const doAddRoleProcess = async (values) => {
  const { dispatch } = store;
  try {
    const splitDescription = values.description.split(" ");
    const payload = {};
    payload.name =
      splitDescription.length > 0
        ? values.description.replaceAll(" ", "_")
        : values.description;
    payload.description = values.description;
    await Invoke.addRole(payload);
    showToast("Data Berhasil Disimpan", "success");
    getListRolesRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditRoleProcess = async (values) => {
  const { dispatch } = store;
  try {
    const splitDescription = values.description.split(" ");
    const payload = {};
    payload.id = values.id;
    payload.name =
      splitDescription.length > 0
        ? values.description.replaceAll(" ", "_")
        : values.description;
    payload.description = values.description;
    await Invoke.updateRole(payload);
    showToast("Data Berhasil Disimpan", "success");
    getListRolesRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doDeleteRoleProcess = async (roleId) => {
  try {
    await Invoke.deleteRoleById(roleId);
    showToast("Data berhasil dihapus", "success");
    getListRolesRequested();
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

export const deleteRoleRequested = async (roleId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteRoleProcess(roleId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};

export const saveRoleRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddRoleProcess(values);
      } else {
        doEditRoleProcess(values);
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
