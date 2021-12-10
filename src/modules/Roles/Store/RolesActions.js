import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_LIST_ROLES = "SET_LIST_ROLES";
export const SET_SELECTED_ROLE_ID = "SET_SELECTED_ROLE_ID";

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

export const getListRolesRequested = async () => {
  const { data } = await Invoke.getListRole(1, 100);
  store.dispatch(setListRoles(data.callback));
};

export const deleteRoleRequested = async (roleId) => {
  const { status } = await Invoke.deleteRoleById(roleId);
  console.log("=== status : ", status);
  await getListRolesRequested();
};
