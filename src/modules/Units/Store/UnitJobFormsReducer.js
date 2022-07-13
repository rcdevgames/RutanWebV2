import {
  SET_UNIT_JOB_FORMS_LIST_DATA,
  SET_PAGING_UNIT_JOB_FORMS,
} from "./UnitJobFormActions";

export const initialState = {
  listUnitJobForms: [],
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function unitJobFormsReducer(state = initialState, action) {
  const newState = Object.assign({}, state);

  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_UNIT_JOB_FORMS_LIST_DATA:
      newState.listUnitJobForms = action.payload;
      return { ...newState };

    case SET_PAGING_UNIT_JOB_FORMS:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
