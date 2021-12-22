import {
  SET_LIST_SERVICES,
  SET_SELECTED_JOB_SERVICE,
} from "./ListServicesActions";

export const initialState = {
  listServices: [],
  selectedJobService: {},
};

export default function listServiceReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LIST_SERVICES:
      newState.listServices = action.payload;
      return { ...newState };

    case SET_SELECTED_JOB_SERVICE:
      newState.selectedJobService = action.payload;
      return { ...newState };
  }

  return state;
}
