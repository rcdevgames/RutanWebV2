import {
  SET_BRANCH_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_BRANCH_ID,
  SET_SELECTED_BRANCH_DATA,
} from "./BranchActions";

export const initialState = {
  listBranch: [],
  selectedBranchId: "",
  selectedBranchData: {},
  formStatus: "add",
};

export default function branchReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_BRANCH_LIST_DATA:
      newState.listBranch = action.payload;
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
  }

  return state;
}