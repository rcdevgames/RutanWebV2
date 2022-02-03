import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_MACHINE_LIST_DATA = "SET_MACHINE_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_MACHINE_ID = "SET_SELECTED_MACHINE_ID";
export const SET_SELECTED_MACHINE_DATA = "SET_SELECTED_MACHINE_DATA";

export const setMachineListData = (payload) => {
  return {
    type: SET_MACHINE_LIST_DATA,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedMachineId = (payload) => {
  return {
    type: SET_SELECTED_MACHINE_ID,
    payload,
  };
};

export const setSelectedMachineData = (payload) => {
  return {
    type: SET_SELECTED_MACHINE_DATA,
    payload,
  };
};

// === INTERNAL FUNCTION ===
const doDeleteMachineProcess = async (machineId) => {
  try {
    await Invoke.deleteEngine(machineId);
    showToast("Data berhasil dihapus", "success");
    getMachineListDataRequested();
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddMachineProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.name = values.name;
    payload.description = values.description;
    await Invoke.addEngine(payload);
    showToast("Data Berhasil Disimpan", "success");
    getMachineListDataRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditMachineProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.name;
    payload.description = values.description;
    await Invoke.updateEngine(payload);
    showToast("Data Berhasil Disimpan", "success");
    getMachineListDataRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};
// === INTERNAL FUNCTION ===

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editMachineConfigurationForm", `name`, ""));
  dispatch(change("editMachineConfigurationForm", `description`, ""));
};

export const mapDetailMachineToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().machineConfiguration.selectedMachineData;
  dispatch(change("editMachineConfigurationForm", `id`, data.id ?? ""));
  dispatch(change("editMachineConfigurationForm", `name`, data.name ?? ""));
  dispatch(
    change(
      "editMachineConfigurationForm",
      `description`,
      data.description ?? ""
    )
  );
};

export const getMachineListDataRequested = async () => {
  try {
    const { data } = await Invoke.getListEngine(1, 100);
    store.dispatch(setMachineListData(data.callback.data));
  } catch (error) {
    console.log(error);
  }
};

export const saveMachineRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddMachineProcess(values);
      } else {
        doEditMachineProcess(values);
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

export const deleteMachineRequested = async (machineId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteMachineProcess(machineId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
