import { change } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";

export const SET_UNIT_JOB_FORMS_LIST_DATA = "SET_UNIT_JOB_FORMS_LIST_DATA";
export const SET_PAGING_UNIT_JOB_FORMS = "SET_PAGING_UNIT_JOB_FORMS";

export const setUnitJobFormsListData = (payload) => {
  return {
    type: SET_UNIT_JOB_FORMS_LIST_DATA,
    payload,
  };
};

export const setPagingUnitJobForms = (payload) => {
  return {
    type: SET_PAGING_UNIT_JOB_FORMS,
    payload,
  };
};

export const getUnitJobFormsListDataRequested = async (jobFormId = "") => {
  const { getState } = store;
  const unitId = getState().units.selectedUnitsId;
  try {
    // Get data unit jobforms from API
    const { data } = await Invoke.getListUnitJobForms(unitId, jobFormId);

    // Store data to reducer
    store.dispatch(setUnitJobFormsListData(data.callback));
  } catch (error) {
    console.log(error);
  }
};
