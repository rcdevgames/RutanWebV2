import { SET_JOB_FORMS_LIST_DATA } from "./JobFormsActions";

export const initialState = {
  listJobForms: [],
};

export default function jobFormsReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_JOB_FORMS_LIST_DATA:
      newState.listJobForms = action.payload;
      return { ...newState };
  }

  return state;
}
