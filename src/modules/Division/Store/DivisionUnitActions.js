import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_DIVISION_UNIT_LIST_DATA = "SET_DIVISION_UNIT_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_DIVISION_UNIT_ID = "SET_SELECTED_DIVISION_UNIT_ID";
export const SET_SELECTED_DIVISION_UNIT_DATA =
  "SET_SELECTED_DIVISION_UNIT_DATA";
export const SET_PAGING_DIVISION_UNIT = "SET_PAGING_DIVISION_UNIT";

export const setDivisionUnitListData = (payload) => {
  return {
    type: SET_DIVISION_UNIT_LIST_DATA,
    payload,
  };
};

export const setPagingDivisionUnit = (payload) => {
  return {
    type: SET_PAGING_DIVISION_UNIT,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedDivisonUnitId = (payload) => {
  return {
    type: SET_SELECTED_DIVISION_UNIT_ID,
    payload,
  };
};

export const setSelectedDivisionUnitData = (payload) => {
  return {
    type: SET_SELECTED_DIVISION_UNIT_DATA,
    payload,
  };
};

export const getDivisionUnitListRequested = async (
  page,
  limit,
  keyword = ""
) => {
  const { getState } = store;
  const divisionId = getState().division.selectedDivisionId;
  try {
    const { data } = await Invoke.getDivisionUnitList(
      divisionId,
      page,
      limit,
      keyword
    );
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setDivisionUnitListData(data.callback.data));
    store.dispatch(setPagingDivisionUnit(paging));
  } catch (error) {
    console.log(error);
  }
};

const doAddDivisionUnitProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().divisionUnit.paging;
  const divisionId = getState().division.selectedDivisionId;
  const { page, limit } = paging;
  const splitUnitId = values.unit.split("|");

  try {
    const payload = {};
    payload.unit_id = splitUnitId[0];
    payload.division_id = divisionId;

    await Invoke.addDivisionUnit(payload);
    showToast("Data Berhasil Disimpan", "success");
    getDivisionUnitListRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doEditDivisionUnitProcess = async (values) => {
  store.dispatch(ComponentActions.setGlobalLoading(true));
  const { dispatch, getState } = store;
  const paging = getState().divisionUnit.paging;
  const unitId = getState().division.selectedUnitsId;
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
    getDivisionUnitListRequested(page, limit);
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
    getDivisionUnitListRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

export const saveDivisionUnitRequested = async (type, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (type === "add") {
        doAddDivisionUnitProcess(values);
      } else {
        doEditDivisionUnitProcess(values);
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
