import * as AdminActions from "../modules/Admin/Store/AdminActions";
import * as RoleActions from "../modules/Roles/Store/RolesActions";
import * as MasterDataActions from "../modules/MasterData/Store/MasterDataActions";

export const initializeApp = async () => {
  await AdminActions.getListAdminRequested();
  await RoleActions.getListRolesRequested();
  await MasterDataActions.loadMenuListData();
};
