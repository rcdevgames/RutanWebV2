import * as AdminActions from "../modules/Admin/Store/AdminActions";
import * as RoleActions from "../modules/Roles/Store/RolesActions";
import * as MasterDataActions from "../modules/MasterData/Store/MasterDataActions";
import * as BranchActions from "../modules/Branch/Store/BranchActions";
import * as UnitsActions from "../modules/Units/Store/UnitsActions";
import * as MachineConfigurationActions from "../modules/MachineConfiguration/Store/MachineConfigurationActions";

export const initializeApp = async () => {
  await AdminActions.getListAdminRequested();
  await RoleActions.getListRolesRequested();
  await MasterDataActions.loadMenuListData();
  await MasterDataActions.loadProvinceListData();
  await BranchActions.getBranchListDataRequested();
  await UnitsActions.getUnitListDataRequested();
  await MachineConfigurationActions.getMachineListDataRequested();
};