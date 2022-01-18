import { change, reset } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { showToast } from "../../Roles/Store/RolesActions";
import { SelectStatus } from "../../../app/Helpers";

export const SET_IDENTIFICATIONN_LIST_DATA = "SET_IDENTIFICATIONN_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_IDENTIFICATION_ID = "SET_SELECTED_IDENTIFICATION_ID";
export const SET_SELECTED_IDENTIFICATION_DATA =
  "SET_SELECTED_IDENTIFICATION_DATA";

export const setIdentificationListData = (payload) => {
  return {
    type: SET_IDENTIFICATIONN_LIST_DATA,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedIdentificationId = (payload) => {
  return {
    type: SET_SELECTED_IDENTIFICATION_ID,
    payload,
  };
};

export const setSelectedIdentificationData = (payload) => {
  return {
    type: SET_SELECTED_IDENTIFICATION_DATA,
    payload,
  };
};

export const getIdentificationListRequested = async () => {
  const { getState, dispatch } = store;
  try {
    const branches = getState().branch.listBranch;
    const { data } = await Invoke.getIdentificationList(1, 100);
    const identificationList = data.callback;

    const newIdentificationList = [];

    if (identificationList.length > 0) {
      identificationList.map((item, index) => {
        const [defaultBranch] = branches.filter((x) => x.id === item.branch_id);

        item.branch_name = defaultBranch.name;
        newIdentificationList.push(item);
      });
    }

    dispatch(setIdentificationListData(newIdentificationList));
  } catch (error) {
    console.log(error);
  }
};

// === INTERNAL FUNCTION ===
const doDeleteIdentificationProcess = async (branchId) => {
  try {
    await Invoke.deleteBranchById(branchId);
    showToast("Data berhasil dihapus", "success");
    getIdentificationListRequested();
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddIdentificationProcess = async (values) => {
  const { dispatch } = store;
  try {
    const splitCustomer = values.customer.split("|");
    const splitBranch = values.branch.split("|");
    const splitLocation = values.location.split("|");
    const splitMilling = values.milling.split("|");
    const splitType = values.type.split("|");

    const payload = {};
    payload.customer_id = splitCustomer[0];
    payload.branch_id = splitBranch[0];
    payload.location = splitLocation[0];
    payload.type = splitType[0];
    payload.status = SelectStatus[0].value;
    payload.milling = splitMilling[0];

    await Invoke.addIdentification(payload);
    showToast("Data Berhasil Disimpan", "success");
    getIdentificationListRequested();
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditIdentificationProcess = async (values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.id = values.id;
    payload.name = values.description;
    payload.description = values.description;
    await Invoke.updateBranch(payload);
    showToast("Data Berhasil Disimpan", "success");
    getIdentificationListRequested();
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
  dispatch(reset("editIdentificationhForm"));
};

export const mapDetailBranchToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().identification.setSelectedIdentificationData;
  dispatch(change("editIdentificationForm", `id`, data.id ?? ""));
  dispatch(change("editIdentificationForm", `description`, data.name ?? ""));
};

export const saveIdentificationRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddIdentificationProcess(values);
      } else {
        doEditIdentificationProcess(values);
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
