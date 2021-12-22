import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { setGlobalLoading } from "../../App/Store/ComponentAction";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { navigate } from "../../../app/Helpers";

export const SET_EMPLOYEE_LIST_DATA = "SET_EMPLOYEE_LIST_DATA";
export const SET_SELECTED_EMPLOYEE_ID = "SET_SELECTED_EMPLOYEE_ID";
export const SET_SELECTED_EMPLOYEE_DATA = "SET_SELECTED_EMPLOYEE_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_ROLE_EMPLOYEE = "SET_SELECTED_ROLE_EMPLOYEE";

export const setEmployeeListData = (payload) => {
  return {
    type: SET_EMPLOYEE_LIST_DATA,
    payload,
  };
};

export const setSelectedEmployeeId = (payload) => {
  return {
    type: SET_SELECTED_EMPLOYEE_ID,
    payload,
  };
};

export const setSelectedEmployeeData = (payload) => {
  return {
    type: SET_SELECTED_EMPLOYEE_DATA,
    payload,
  };
};

export const setSelectedRoleEmployee = (payload) => {
  return {
    type: SET_SELECTED_ROLE_EMPLOYEE,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const loadEmployeeListData = async () => {
  try {
    const { data } = await Invoke.getEmployeeList(1, 100);
    store.dispatch(setEmployeeListData(data.callback));
    store.dispatch(setGlobalLoading(false));
  } catch (error) {
    store.dispatch(setGlobalLoading(false));
    console.log(error);
  }
};

export const getEmployeeDataByIdRequested = async (employeeId) => {
  try {
    const { data } = await Invoke.getEmployeeById(employeeId);
    store.dispatch(setSelectedEmployeeData(data.callback));
  } catch (error) {
    console.log(error);
  }
};

export const getRolesByEmployeeId = async (employeeId) => {
  const { data } = await Invoke.getEmployeeRoles(employeeId);
  let subItem = [];
  data.callback.map((item, index) => {
    subItem.push(item.role_id);
  });
  console.log("=== subItem : ", subItem);
  store.dispatch(setSelectedRoleEmployee(subItem));
};

export const setAutoPopulateEmployee = async () => {
  const { getState, dispatch } = store;
  const selectedEmployeeData = getState().employees.selectedEmployeeData;
  const listBranch = getState().branch.listBranch;
  const [defaultBranch] = listBranch.filter(
    (x) => x.id === selectedEmployeeData.branch_id
  );
  await MasterDataActions.loadCityListData(selectedEmployeeData.province_id);

  dispatch(change("editEmployeeForm", "id", selectedEmployeeData.id ?? ""));
  dispatch(change("editEmployeeForm", "name", selectedEmployeeData.name ?? ""));
  dispatch(
    change("editEmployeeForm", "address", selectedEmployeeData.address ?? "")
  );
  dispatch(
    change("editEmployeeForm", "phone", selectedEmployeeData.phone ?? "")
  );
  dispatch(
    change(
      "editEmployeeForm",
      "branch",
      `${selectedEmployeeData.branch_id}|${defaultBranch.name}` ?? ""
    )
  );
  dispatch(
    change(
      "editEmployeeForm",
      "province",
      selectedEmployeeData["province_name"] ?? ""
    )
  );
  dispatch(
    change(
      "editEmployeeForm",
      "city",
      `${selectedEmployeeData.city_id}|${selectedEmployeeData.city_name}` ?? ""
    )
  );
};

const doAddEmployeeProcess = async (values, menuSelected) => {
  const { dispatch } = store;
  try {
    // const splitDescription = values.description.split(" ");
    // const payload = {};
    // payload.name =
    //   splitDescription.length > 0
    //     ? values.description.replaceAll(" ", "_")
    //     : values.description;
    // payload.description = values.description;
    // await Invoke.addRole(payload);
    // showToast("Data Berhasil Disimpan", "success");
    // getListRolesRequested();
    // dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
  }
};

const doEditEmployeeProcess = async (values, roleSelected) => {
  await doSaveEmployeeRole(roleSelected);
  showToast("Data Berhasil Disimpan", "success");
  setTimeout(() => {
    navigate("/employees");
  }, 1000);
};

const doAddEmployeeRoleProcess = async (newRoleId, employeeId) => {
  const payload = {
    employee_id: employeeId,
    role_id: newRoleId,
  };
  await Invoke.addEmployeeRole(payload);
};

const doDeleteEmployeeRoleProcess = async (roleId, roleListApi) => {
  const [employeeRole] = roleListApi.filter((x) => x.role_id === roleId);
  await Invoke.deleteEmployeeRole(employeeRole.id);
};

const doSaveEmployeeRole = async (newRoleSelected) => {
  const { getState } = store;
  const currentRoleSelected = getState().employees.selectedRoleEmployee;
  const selectedEmployeeId = getState().employees.selectedEmployeeId;
  const { data } = await Invoke.getEmployeeRoles(selectedEmployeeId, 1, 100);
  const roleListApi = data.callback;

  if (currentRoleSelected.length > 0) {
    currentRoleSelected.map(async (item, index) => {
      await doDeleteEmployeeRoleProcess(item, roleListApi);
    });
    setTimeout(() => {
      newRoleSelected.map(async (newRole, index) => {
        await doAddEmployeeRoleProcess(newRole, selectedEmployeeId);
      });
    }, 1000);
  } else {
    newRoleSelected.map(async (item, index) => {
      await doAddEmployeeRoleProcess(item, selectedEmployeeId);
    });
  }
};

export const saveEmployeeRequested = async (
  formStatus,
  values,
  roleSelected
) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (formStatus === "add") {
        doAddEmployeeProcess(values, roleSelected);
      } else {
        doEditEmployeeProcess(values, roleSelected);
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
