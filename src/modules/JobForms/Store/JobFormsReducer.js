import {
  SET_JOB_FORMS_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_JOB_FORMS_ID,
  SET_SELECTED_JOB_FORMS_DATA,
} from "./JobFormsActions";

export const initialState = {
  listJobForms: [],
  selectedJobFormsId: "",
  selectedJobFormsData: {},
  formStatus: "add",
};

export default function jobFormsReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_JOB_FORMS_LIST_DATA:
      newState.listJobForms = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_JOB_FORMS_ID:
      newState.selectedJobFormsId = action.payload;
      return { ...newState };

    case SET_SELECTED_JOB_FORMS_DATA:
      newState.selectedJobFormsData = action.payload;
      return { ...newState };
  }

  return state;
}
