import {
  SET_LIST_SERVICES,
  SET_SELECTED_JOB_SERVICE,
  SET_PAGING_LIST_SERVICE,
  SET_SELECTED_JOB_SERVICE_ID,
} from "./ListServicesActions";

export const initialState = {
  listServices: [],
  selectedJobService: {},
  selectedJobServiceId: {},
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
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

    case SET_SELECTED_JOB_SERVICE_ID:
      newState.selectedJobServiceId = action.payload;
      return { ...newState };

    case SET_PAGING_LIST_SERVICE:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
