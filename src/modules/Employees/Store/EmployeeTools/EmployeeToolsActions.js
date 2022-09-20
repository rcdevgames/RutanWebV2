import { change } from "redux-form";
import Invoke from "../../../../app/axios/Invoke";
import { store } from "../../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { setGlobalLoading } from "../../../App/Store/ComponentAction";
import * as MasterDataActions from "../../../MasterData/Store/MasterDataActions";
import { showToast } from "../../../Roles/Store/RolesActions";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import { navigate } from "../../../../app/Helpers";

export const SET_EMPLOYEE_TOOL_LIST_DATA = "SET_EMPLOYEE_TOOL_LIST_DATA";
export const SET_SELECTED_EMPLOYEE_TOOLS_ID = "SET_SELECTED_EMPLOYEE_TOOLS_ID";
export const SET_SELECTED_EMPLOYEE_TOOLS_DATA =
  "SET_SELECTED_EMPLOYEE_TOOLS_DATA";
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

export const getEmployeeToolsRequested = async (
  employeeId,
  page,
  limit,
  keyword = ""
) => {
  try {
    const { data } = await Invoke.getEmployeeTools(employeeId, page, limit);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setPagingEmployeeTools(paging));
    store.dispatch(setEmployeeToolsListData(data.callback.data));
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
  const employeeId = getState().employees.selectedEmployeeId;
  const slpitToolsId = values.tools.split("|");

  try {
    const payload = {};
    payload.employee_id = employeeId;
    payload.tool_id = slpitToolsId[0];

    await Invoke.addEmployeeTools(payload);

    showToast("Data Berhasil Disimpan", "success");
    getEmployeeToolsRequested(employeeId, page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
    setTimeout(() => {
      navigate("/employee-tools");
    }, 500);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
  }
};

const doEditEmployeeToolsProcess = async (values) => {
  const { dispatch, getState } = store;
  const employeeId = getState().employees.selectedEmployeeId;
  dispatch(ComponentActions.setGlobalLoading(true));
  const splitTools = values.tools.split("|");

  try {
    const payload = {};
    payload.id = values.id;
    payload.employee_id = employeeId;
    payload.tool_id = splitTools[0];

    // Save Employee data actions
    await Invoke.updateEmployeeTools(payload);
    showToast("Data Berhasil Disimpan", "success");
    setTimeout(() => {
      navigate("/employee-tools");
    }, 1000);
  } catch (error) {
    dispatch(ComponentActions.setGlobalLoading(false));
  }
};

const doDeleteEmployeeToolsProcess = async (employeeToolsId) => {
  const { getState } = store;
  const paging = getState().employeeTools.paging;
  const employeeId = getState().employees.selectedEmployeeId;
  const { page, limit } = paging;

  try {
    await Invoke.deleteEmployeeToolsById(employeeToolsId);
    showToast("Data berhasil dihapus", "success");
    getEmployeeToolsRequested(employeeId, page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
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
  const data = getState().employeeTools.selectedEmployeeToolsData;
  // const splitTools = data;
  const tools = `${data.tool_id}|${data.name}`;

  dispatch(change("editEmployeeToolsForm", `id`, data.id));
  dispatch(change("editEmployeeToolsForm", `tools`, tools));
};

export const resetForm = () => {
  const { dispatch } = store;
  dispatch(change("editEmployeeToolsForm", `id`, ""));
  dispatch(change("editEmployeeToolsForm", `tools`, ""));
};

export const deleteEmployeeToolsRequested = async (employeeId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteEmployeeToolsProcess(employeeId);
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
  const employeeId = getState().employees.selectedEmployeeId;

  if (!values) {
    getEmployeeToolsRequested(employeeId, page, limit, keyword);
    return;
  }

  try {
    await getEmployeeToolsRequested(employeeId, page, limit, keyword);
  } catch (error) {
    console.log(error);
  }
};
