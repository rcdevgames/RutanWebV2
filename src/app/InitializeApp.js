import * as AdminActions from "../modules/Admin/Store/AdminActions";
import * as RoleActions from "../modules/Roles/Store/RolesActions";
import * as MasterDataActions from "../modules/MasterData/Store/MasterDataActions";
import { setUserDetail } from "../modules/Auth/Store/AuthAction";
import Invoke from "./axios/Invoke";
import { store } from "./ConfigureStore";

const getUserRole = async () => {
  const { getState, dispatch } = store;

  const userDetail = getState().auth.userDetail;
  const listAdmin = getState().admins.listAdmin;
  const [selectedAdmin] = listAdmin.filter(
    (x) => x.username === userDetail.username
  );
  const { data } = await Invoke.getListAdminRoles(selectedAdmin.id, 1, 10);
  userDetail.role = data.callback;
  dispatch(setUserDetail(userDetail));
};

const getMenuList = async () => {};

export const initializeApp = async () => {
  await AdminActions.getListAdminRequested();
  await RoleActions.getListRolesRequested();
  await MasterDataActions.loadMenuListData();
  getUserRole();
};
