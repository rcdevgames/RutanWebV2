import {
  SET_BRANCH_LIST_DATA,
  SET_FORM_STATUS,
  SET_PAGING_BRANCH,
  SET_SELECTED_BRANCH_ID,
  SET_SELECTED_BRANCH_DATA,
  SET_BRANCH_LIST_DATA_DROPDOWN
} from "./BranchActions";

export const initialState = {
  listBranch: [],
  listBranchDropdown: [],
  selectedBranchId: "",
  selectedBranchData: {},
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
    case SET_BRANCH_LIST_DATA:
      newState.listBranch = action.payload;
      return { ...newState };

    case SET_BRANCH_LIST_DATA_DROPDOWN:
      newState.listBranchDropdown = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_BRANCH_ID:
      newState.selectedBranchId = action.payload;
      return { ...newState };

    case SET_SELECTED_BRANCH_DATA:
      newState.selectedBranchData = action.payload;
      return { ...newState };
    case SET_PAGING_BRANCH:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}
