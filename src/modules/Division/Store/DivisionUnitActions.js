import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_UNIT_FIELDS_LIST_DATA = "SET_UNIT_FIELDS_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_UNIT_FIELDS_ID = "SET_SELECTED_UNIT_FIELDS_ID";
export const SET_SELECTED_UNIT_FIELDS_DATA = "SET_SELECTED_UNIT_FIELDS_DATA";
export const SET_PAGING_UNIT_FIELDS = "SET_PAGING_UNIT_FIELDS";

export const setUnitFieldsListData = (payload) => {
  return {
    type: SET_UNIT_FIELDS_LIST_DATA,
    payload,
  };
};

export const setPagingUnitFields = (payload) => {
  return {
    type: SET_PAGING_UNIT_FIELDS,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedUnitFieldsId = (payload) => {
  return {
    type: SET_SELECTED_UNIT_FIELDS_ID,
    payload,
  };
};

export const setSelectedUnitFieldsData = (payload) => {
  return {
    type: SET_SELECTED_UNIT_FIELDS_DATA,
    payload,
  };
};

export const getUnitFieldsListDataRequested = async (
  page,
  limit,
  keyword = ""
) => {
  const { getState } = store;
  const unitId = getState().units.selectedUnitsId;
  try {
    const { data } = await Invoke.getListUnitFields(
      page,
      limit,
      unitId,
      keyword
    );
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setUnitFieldsListData(data.callback.data));
    store.dispatch(setPagingUnitFields(paging));
  } catch (error) {
    console.log(error);
  }
};

const doAddUnitFieldsProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().unitFields.paging;
  const unitId = getState().units.selectedUnitsId;
  const { page, limit } = paging;
  const splitCategoryFormId = values.formCategory.split("|");
  const splitjobFormId = values.jobForm.split("|");

  try {
    const payload = {};
    payload.unit_id = unitId;
    payload.name = values.fieldName;
    payload.descriptions = values.description ?? "None";
    payload.category_form_id = splitCategoryFormId[0] ?? "";
    payload.job_form_id = splitjobFormId[0] ?? "";

    await Invoke.addUnitFields(payload);
    showToast("Data Berhasil Disimpan", "success");
    getUnitFieldsListDataRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditUnitFieldsProcess = async (values) => {
  store.dispatch(ComponentActions.setGlobalLoading(true));
  const { dispatch, getState } = store;
  const paging = getState().unitFields.paging;
  const unitId = getState().units.selectedUnitsId;
  const { page, limit } = paging;
  const splitCategoryFormId = values.formCategory.split("|");
  const splitjobFormId = values.jobForm.split("|");
  try {
    const payload = {};
    payload.id = values.id;
    payload.unit_id = unitId;
    payload.name = values.fieldName;
    payload.descriptions = values.description ?? "None";
    payload.category_form_id = splitCategoryFormId[0] ?? "";
    payload.job_form_id = splitjobFormId[0] ?? "";

    await Invoke.updateUnitFields(payload);
    showToast("Data Berhasil Disimpan", "success");
    getUnitFieldsListDataRequested(page, limit);
    store.dispatch(ComponentActions.setGlobalLoading(false));
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    store.dispatch(ComponentActions.setGlobalLoading(false));
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doDeleteUnitFieldsProcess = async (unitFieldId) => {
  const { getState } = store;
  const paging = getState().unitFields.paging;
  const { page, limit } = paging;
  try {
    await Invoke.deleteUnitFieldsById(unitFieldId);
    showToast("Data berhasil dihapus", "success");
    getUnitFieldsListDataRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

export const saveUnitFieldsRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddUnitFieldsProcess(values);
      } else {
        doEditUnitFieldsProcess(values);
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

export const deleteUnitFieldRequested = async (unitFieldId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteUnitFieldsProcess(unitFieldId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};

export const mapDetailUnitFieldToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().unitFields.selectedUnitFieldsData;

  dispatch(change("editUnitFieldsForm", `id`, data.id ?? ""));
  dispatch(change("editUnitFieldsForm", `unitId`, data.unit_id ?? ""));
  dispatch(change("editUnitFieldsForm", `fieldName`, data.name ?? ""));
  dispatch(
    change("editUnitFieldsForm", `description`, data.descriptions ?? "")
  );
  dispatch(
    change(
      "editUnitFieldsForm",
      `jobForm`,
      `${data.job_form_id}|${data.job_form_name}` ?? ""
    )
  );
  dispatch(
    change(
      "editUnitFieldsForm",
      `formCategory`,
      `${data.category_form_id}|${data.category_form_name}` ?? ""
    )
  );
};

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(change("editUnitFieldsForm", `id`, ""));
  dispatch(change("editUnitFieldsForm", `unitId`, ""));
  dispatch(change("editUnitFieldsForm", `fieldName`, ""));
  dispatch(change("editUnitFieldsForm", `description`, ""));
  dispatch(change("editUnitFieldsForm", `jobForm`, ""));
  dispatch(change("editUnitFieldsForm", `formCategory`, ""));
};
