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
  const { getState, dispatch } = store;
  const { page, limit } = getState().unitSerialNumber.paging;
  try {
    if (!val) {
      toast.warning(
        "Wajib memilih customer untuk menampilkan data serial number",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
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

const doAddUnitSerialNumberProcess = async (values) => {
  const { dispatch, getState } = store;
  dispatch(ComponentActions.setGlobalLoading(true));
  const paging = getState().unitModels.paging;
  const unitModelId = getState().unitModels.selectedUnitModelsId;
  const customerId = values.customer.split("|");
  const { page, limit } = paging;
  try {
    const payload = {};
    payload.customer_id = customerId[0];
    payload.serial_number = values.serialNumber;
    payload.descriptions = values.description ?? "None";

    await Invoke.addUnitSerialNumber(payload, unitModelId);
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

const doEditUnitSerialNumberProcess = async (values) => {
  store.dispatch(ComponentActions.setGlobalLoading(true));
  const { dispatch, getState } = store;
  const paging = getState().unitModels.paging;
  const { page, limit } = paging;
  const unitModelId = getState().unitModels.selectedUnitModelsId;
  const unitSerialNumberId =
    getState().unitSerialNumber.selectedUnitSerialNumberId;

  try {
    const payload = {};
    payload.serial_number = values.serialNumber;
    payload.descriptions = values.descriptions ?? "None";

    await Invoke.updateUnitSerialNumber(
      payload,
      unitModelId,
      unitSerialNumberId
    );
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

const doDeleteUnitModelsProcess = async (serialNumberId) => {
  const { getState } = store;
  const paging = getState().unitModels.paging;
  const unitModelId = getState().unitModels.selectedUnitModelsId;
  const { page, limit } = paging;
  try {
    await Invoke.deleteUnitSerialNumber(unitModelId, serialNumberId);
    showToast("Data berhasil dihapus", "success");
    getUnitSerialNumber(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

export const saveUnitSerialNumberRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddUnitSerialNumberProcess(values);
      } else {
        doEditUnitSerialNumberProcess(values);
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

export const mapDetailUnitSerialNumberToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().unitSerialNumber.selectedUnitSerialNumberData;

  dispatch(
    change(
      "editUnitSerialNumberForm",
      `customer`,
      `${data.customer_id}|${data.customer_name}` ?? ""
    )
  );
  dispatch(
    change("editUnitSerialNumberForm", `serialNumber`, data.serial_number ?? "")
  );
  dispatch(
    change("editUnitSerialNumberForm", `description`, data.descriptions ?? "")
  );
};

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editUnitSerialNumberForm", `customer`, ""));
  dispatch(change("editUnitSerialNumberForm", `serialNumber`, ""));
  dispatch(change("editUnitSerialNumberForm", `description`, ""));
};
