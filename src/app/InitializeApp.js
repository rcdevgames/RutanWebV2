import * as AdminActions from "../modules/Admin/Store/AdminActions";
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
  console.log("=== role : ", data.callback);
  dispatch(setUserDetail(userDetail));
};

export const initializeApp = async () => {
  await AdminActions.getListAdminRequested();
  getUserRole();
};
