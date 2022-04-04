import { change } from "redux-form";
import Invoke from "../../../../app/axios/Invoke";
import { store } from "../../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { setGlobalLoading } from "../../../App/Store/ComponentAction";
import * as MasterDataActions from "../../../MasterData/Store/MasterDataActions";
import { showToast } from "../../../Roles/Store/RolesActions";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import { navigate } from "../../../../app/Helpers";

export const SET_EMPLOYEE_TOOL_LIST_DATA = "SET_EMPLOYEE_LIST_DATA";
export const SET_SELECTED_EMPLOYEE_TOOLS_ID = "SET_SELECTED_EMPLOYEE_ID";
export const SET_SELECTED_EMPLOYEE_TOOLS_DATA = "SET_SELECTED_EMPLOYEE_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_ROLE_EMPLOYEE = "SET_SELECTED_ROLE_EMPLOYEE";
export const SET_PAGING_EMPLOYEE_TOOLS = "SET_PAGING_EMPLOYEE_TOOLS";

export const setEmployeeToolsListData = (payload) => {
  return {
    type: SET_EMPLOYEE_TOOL_LIST_DATA,
    payload,
  };
};

export const setSelectedEmployeeToolsId = (payload) => {
  return {
    type: SET_SELECTED_EMPLOYEE_TOOLS_ID,
    payload,
  };
};

export const setSelectedEmployeeToolsData = (payload) => {
  return {
    type: SET_SELECTED_EMPLOYEE_TOOLS_DATA,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setPagingEmployeeTools = (payload) => {
  return {
    type: SET_PAGING_EMPLOYEE_TOOLS,
    payload,
  };
};

export const loadEmployeeListData = async (
  page,
  limit,
  keyword = "",
  roleId = "",
  branchId = "",
  divisionId = ""
) => {
  try {
    const { data } = await Invoke.getEmployeeList(
      page,
      limit,
      keyword,
      roleId,
      branchId,
      divisionId
    );
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setEmployeeToolsListData(data.callback.data));
    store.dispatch(setPagingEmployeeTools(paging));
    store.dispatch(setGlobalLoading(false));
  } catch (error) {
    store.dispatch(setGlobalLoading(false));
    console.log(error);
  }
};

export const getEmployeeToolsRequested = (employeeId, page, limit) => {
  try {
    const { data } = Invoke.getEmployeeTools(employeeId, page, limit);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setPagingEmployeeTools(paging));
  } catch (error) {
    console.log("error : ", error);
  }
};

export const getEmployeeDataByIdRequested = async (employeeId) => {
  try {
    const { data } = await Invoke.getEmployeeById(employeeId);
    store.dispatch(setSelectedEmployeeToolsData(data.callback));
  } catch (error) {
    console.log(error);
  }
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

const doAddEmployeeToolsProcess = async (values) => {
  const { dispatch, getState } = store;
  dispatch(ComponentActions.setGlobalModal(true));
  const { page, limit } = getState().employees.paging;
  const branchId = values.branch.split("|");
  const provinceId = values.province.split("|");
  const cityId = values.city.split("|");

  try {
    const payload = {};
    payload.nik = values.nik;
    payload.password = values.password;
    payload.name = values.name;
    payload.branch_id = branchId[0] ?? "";
    payload.province_id = provinceId[0] ?? "";
    payload.city_id = cityId[0] ?? "";
    payload.phone = values.phone;
    payload.address = values.address;
    payload.photo = values.imageUrl;

    await Invoke.addEmployee(payload);

    showToast("Data Berhasil Disimpan", "success");
    loadEmployeeListData(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
    setTimeout(() => {
      navigate("/employees");
    }, 500);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
  }
};

const doEditEmployeeToolsProcess = async (values) => {
  const { dispatch } = store;
  dispatch(ComponentActions.setGlobalLoading(true));
  const branchId = values.branch.split("|");
  const provinceId = values.province.split("|");
  const cityId = values.city.split("|");

  try {
    const payload = {};
    payload.id = values.id;
    payload.nik = values.nik;
    payload.password = values.password;
    payload.name = values.name;
    payload.branch_id = branchId[0] ?? "";
    payload.province_id = provinceId[0] ?? "";
    payload.city_id = cityId[0] ?? "";
    payload.phone = values.phone;
    payload.address = values.address;
    payload.photo = values.imageUrl ?? "";
    // Save Employee - roles actions
    if (values.selectedRoles.length > 0) {
      await doSaveEmployeeRole(values.selectedRoles, "delete-and-add");
    } else {
      await doSaveEmployeeRole(values.selectedRoles, "delete-all");
    }
    // Save Employee data actions
    await Invoke.updateEmployee(payload);
    showToast("Data Berhasil Disimpan", "success");
    setTimeout(() => {
      navigate("/employees");
    }, 1000);
  } catch (error) {
    dispatch(ComponentActions.setGlobalLoading(false));
  }
};

const doAddEmployeeRoleProcess = async (newRoleId, employeeId) => {
  const payload = {
    employee_id: employeeId,
    role_id: newRoleId,
  };
  await Invoke.addEmployeeRole(payload);
};

const doDeleteAllEmployeeRoleProcess = async (roleListApi) => {
  roleListApi.data.map(async (item, index) => {
    await Invoke.deleteEmployeeRole(item.id);
  });
};

const doDeleteEmployeeProcess = async (employeeId) => {
  const { getState } = store;
  const paging = getState().employees.paging;
  const { page, limit } = paging;

  try {
    await Invoke.deleteEmployeeById(employeeId);
    showToast("Data berhasil dihapus", "success");
    loadEmployeeListData(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doSaveEmployeeRole = async (newRoleSelected, type) => {
  const { getState } = store;
  try {
    const currentRoleSelected = getState().employees.selectedRoleEmployee;
    const selectedEmployeeId = getState().employees.selectedEmployeeId;
    const { data } = await Invoke.getEmployeeRoles(selectedEmployeeId, 1, 100);
    const roleListApi = data.callback;

    if (type === "delete-all") {
      await currentRoleSelected.map(async (item, index) => {
        await doDeleteAllEmployeeRoleProcess(roleListApi);
      });
    } else if (type === "add") {
      await newRoleSelected.map(async (item, index) => {
        await doAddEmployeeRoleProcess(item, selectedEmployeeId);
      });
    } else {
      // Check if the user is has been have roles or not
      if (currentRoleSelected.length > 0) {
        await doDeleteAllEmployeeRoleProcess(roleListApi);
        await newRoleSelected.map(async (item, index) => {
          await doAddEmployeeRoleProcess(item, selectedEmployeeId);
        });
      } else {
        await newRoleSelected.map(async (item, index) => {
          await doAddEmployeeRoleProcess(item, selectedEmployeeId);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveEmployeeToolsRequested = async (formStatus, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (formStatus === "add") {
        doAddEmployeeToolsProcess(values);
      } else {
        doEditEmployeeToolsProcess(values);
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

export const mapDetailEmployeeToolsToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().employeeTools.selectedEmployeeToolsData
  // const splitTools = data;
  const tools = `${data.tool_id}|${data.name}`;

  dispatch(change("editEmployeeToolsForm", `id`, data.id));
  dispatch(change("editEmployeeToolsForm", `tools`, tools));
};

export const resetForm = () => {
  const { dispatch } = store;
  dispatch(MasterDataActions.setCityListData([]));
  dispatch(change("editEmployeeToolsForm", `id`, ""));
  dispatch(change("editEmployeeToolsForm", `tools`, ""));
};

export const deleteEmployeeToolsRequested = async (employeeId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteEmployeeProcess(employeeId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};

export const handleSearch = async (keyword, values) => {
  const { getState } = store;
  const { page, limit } = getState().employees.paging;

  if (!values) {
    await loadEmployeeListData(page, limit, keyword);
    return;
  }

  const splitRole = values.role ? values.role.split("|") : "";
  const splitBranch = values.branch ? values.branch.split("|") : "";
  const splitDivision = values.division ? values.division.split("|") : "";

  const roleId = values.role ? splitRole[0] : "";
  const branchId = values.branch ? splitBranch[0] : "";
  const divisionId = values.division ? splitDivision[0] : "";

  try {
    await loadEmployeeListData(
      page,
      limit,
      keyword,
      roleId,
      branchId,
      divisionId
    );
  } catch (error) {
    console.log(error);
  }
};
