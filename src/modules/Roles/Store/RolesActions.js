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
export const SET_SELECTED_ROLE_MENU = "SET_SELECTED_ROLE_MENU";

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

export const setSelectedRoleMenu = (payload) => {
  return {
    type: SET_SELECTED_ROLE_MENU,
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

export const getMenuByRolesId = async (roleId) => {
  const { data } = await Invoke.getMenuByRoleId(roleId);
  let subItem = [];
  data.callback.map((item, index) => {
    subItem.push(item.menu_id);
  });
  store.dispatch(setSelectedRoleMenu(subItem));
};

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editRolesForm", `id`, ""));
  dispatch(change("editRolesForm", `description`, ""));
};

const doAddRoleProcess = async (values, menuSelected) => {
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

const doDeleteMenuRoleProcess = async (menuId, menuListApi) => {
  const [menu] = menuListApi.filter((x) => x.menu_id === menuId);
  await Invoke.deleteMenuByMenuRoleId(menu.id);
};

const doAddMenuRoleProcess = async (menuId, roleId) => {
  const payload = {
    menu_id: menuId,
    role_id: roleId,
    view: true,
    insert: true,
    update: true,
    delete: false,
  };
  console.log("=== payload : ", payload);
  await Invoke.addMenuRole(payload);
};

const doSaveMenuRole = async (newMenuSelected) => {
  const { getState } = store;
  const currentMenuSelected = getState().roles.selectedRoleMenu;
  const selectedRoleId = getState().roles.selectedRoleId;
  const { data } = await Invoke.getMenuByRoleId(selectedRoleId);
  const menuListApi = data.callback;

  if (currentMenuSelected.length > 0) {
    await currentMenuSelected.map((item, index) => {
      doDeleteMenuRoleProcess(item, menuListApi);
    });
    setTimeout(() => {
      newMenuSelected.map((newMenu, index) => {
        doAddMenuRoleProcess(newMenu, selectedRoleId);
      });
    }, 1000);
  } else {
    newMenuSelected.map((item, index) => {
      doAddMenuRoleProcess(item, selectedRoleId);
    });
  }
};

const doEditRoleProcess = async (values, menuSelected) => {
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
    await doSaveMenuRole(menuSelected);
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

export const saveRoleRequested = async (type, values, menuSelected) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddRoleProcess(values, menuSelected);
      } else {
        doEditRoleProcess(values, menuSelected);
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
