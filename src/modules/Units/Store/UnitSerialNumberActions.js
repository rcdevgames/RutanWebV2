import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { toast } from "react-toastify";

export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_UNIT_SERIAL_NUMBER_DATA = "SET_UNIT_SERIAL_NUMBER_DATA";
export const SET_SELECTED_UNIT_SERIAL_NUMBER_ID =
  "SET_SELECTED_UNIT_SERIAL_NUMBER_ID";
export const SET_PAGING_UNIT_MODEL = "SET_PAGING_UNIT_MODEL";
export const SET_SELECTED_UNIT_SERIAL_NUMBER_DATA =
  "SET_SELECTED_UNIT_SERIAL_NUMBER_DATA";

export const setUnitSerialNumberData = (payload) => {
  return {
    type: SET_UNIT_SERIAL_NUMBER_DATA,
    payload,
  };
};

export const setPagingUnitModel = (payload) => {
  return {
    type: SET_PAGING_UNIT_MODEL,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedUnitSerialNumberId = (payload) => {
  return {
    type: SET_SELECTED_UNIT_SERIAL_NUMBER_ID,
    payload,
  };
};

export const setSelectedUnitSerialNumberData = (payload) => {
  return {
    type: SET_SELECTED_UNIT_SERIAL_NUMBER_DATA,
    payload,
  };
};

export const handleSearch = (val, keyword) => {
  console.log("=== val : ", val);
  const { getState, dispatch } = store;
  const { page, limit } = getState().unitSerialNumber.paging;
  try {
    if (!val) {
      toast.warning("Wajib memilih customer untuk menampilkan data serial number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(setUnitSerialNumberData([]));
      return;
    }
    const splitCustomerId = val.customer.split("|");
    getUnitSerialNumber(page, limit, keyword, splitCustomerId[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getUnitSerialNumber = async (
  page,
  limit,
  keyword = "",
  customerId
) => {
  // If customerId is null or undefined return this
  if (!customerId) {
    store.dispatch(setUnitSerialNumberData([]));
    return;
  }

  const { getState } = store;
  const unitModelId = getState().unitModels.selectedUnitModelsId;
  try {
    const { data } = await Invoke.getUnitSerialNumber(
      page,
      limit,
      keyword,
      unitModelId,
      customerId
    );
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setUnitSerialNumberData(data.callback.data));
    store.dispatch(setPagingUnitModel(paging));
    await store.dispatch(ComponentActions.setGlobalLoading(false));
  } catch (error) {
    await store.dispatch(ComponentActions.setGlobalLoading(false));
    console.log(error);
  }
};

const doAddUnitModelsProcess = async (values) => {
  const { dispatch, getState } = store;
  dispatch(ComponentActions.setGlobalLoading(true));
  const paging = getState().unitModels.paging;
  const unitId = getState().units.selectedUnitsId;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.unit_id = unitId;
    payload.name = values.name;
    payload.descriptions = values.description ?? "None";
    payload.serial_number = values.serialNumber ?? "";
    payload.machine_no = values.machineNo ?? "";
    payload.engine_model = values.engineModel ?? "";
    payload.engine_no = values.engineNo ?? "";
    payload.chasis_no = values.chasisNo ?? "";
    payload.transmission_no = values.transmissionNo ?? "";

    await Invoke.addUnitModel(payload);
    showToast("Data Berhasil Disimpan", "success");
    getUnitSerialNumber(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
    dispatch(ComponentActions.setGlobalLoading(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    dispatch(ComponentActions.setGlobalLoading(false));

    console.log("error : ", error);
  }
};

const doEditUnitModelsProcess = async (values) => {
  store.dispatch(ComponentActions.setGlobalLoading(true));
  const { dispatch, getState } = store;
  const paging = getState().unitModels.paging;
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.id = values.id;
    payload.unit_id = values.unitId;
    payload.name = values.name;
    payload.descriptions = values.description ?? "None";
    payload.serial_number = values.serialNumber ?? "";
    payload.machine_no = values.machineNo ?? "";
    payload.engine_model = values.engineModel ?? "";
    payload.engine_no = values.engineNo ?? "";
    payload.chasis_no = values.chasisNo ?? "";
    payload.transmission_no = values.transmissionNo ?? "";

    await Invoke.updateUnitModel(payload);
    showToast("Data Berhasil Disimpan", "success");
    getUnitSerialNumber(page, limit);
    store.dispatch(ComponentActions.setGlobalLoading(false));
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    store.dispatch(ComponentActions.setGlobalLoading(false));
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doDeleteUnitModelsProcess = async (unitModelId) => {
  const { getState } = store;
  const paging = getState().unitModels.paging;
  const { page, limit } = paging;
  try {
    await Invoke.deleteUnitModelById(unitModelId);
    showToast("Data berhasil dihapus", "success");
    getUnitSerialNumber(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

export const saveUnitModelsRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddUnitModelsProcess(values);
      } else {
        doEditUnitModelsProcess(values);
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

export const deleteUnitModelRequested = async (unitModelId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteUnitModelsProcess(unitModelId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};

export const mapDetailUnitModelToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().unitModels.selectedUnitModelsData;

  dispatch(change("editUnitModelForm", `id`, data.id ?? ""));
  dispatch(change("editUnitModelForm", `unitId`, data.unit_id ?? ""));
  dispatch(change("editUnitModelForm", `name`, data.name ?? ""));
  dispatch(change("editUnitModelForm", `description`, data.descriptions ?? ""));
  dispatch(
    change("editUnitModelForm", `serialNumber`, data.serial_number ?? "")
  );
  dispatch(change("editUnitModelForm", `machineNo`, data.machine_no ?? ""));
  dispatch(change("editUnitModelForm", `engineModel`, data.engine_model ?? ""));
  dispatch(change("editUnitModelForm", `engineNo`, data.engine_no ?? ""));
  dispatch(change("editUnitModelForm", `chasisNo`, data.chasis_no ?? ""));
  dispatch(
    change("editUnitModelForm", `transmissionNo`, data.transmission_no ?? "")
  );
};

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editUnitModelForm", `id`, ""));
  dispatch(change("editUnitModelForm", `unitId`, ""));
  dispatch(change("editUnitModelForm", `name`, ""));
  dispatch(change("editUnitModelForm", `description`, ""));
  dispatch(change("editUnitModelForm", `serialNumber`, ""));
  dispatch(change("editUnitModelForm", `machineNo`, ""));
  dispatch(change("editUnitModelForm", `engineModel`, ""));
  dispatch(change("editUnitModelForm", `engineNo`, ""));
  dispatch(change("editUnitModelForm", `chasisNo`, ""));
  dispatch(change("editUnitModelForm", `transmissionNo`, ""));
};
