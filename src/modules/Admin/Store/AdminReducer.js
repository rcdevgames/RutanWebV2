import {
  SET_LIST_ADMIN,
  SET_FORM_STATUS,
  SET_PAGING_ADMIN,
  SET_SELECTED_ADMIN_ID,
  SET_SELECTED_ADMIN_DATA,
} from "./AdminActions";

export const initialState = {
  listAdmin: [],
  selectedAdminId: "",
  selectedAdminData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
  keyword: "",
};

export default function branchReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LIST_ADMIN:
      newState.listAdmin = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_ADMIN_ID:
      newState.selectedAdminId = action.payload;
      return { ...newState };

    case SET_SELECTED_ADMIN_DATA:
      newState.selectedAdminData = action.payload;
      return { ...newState };
    case SET_PAGING_ADMIN:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
