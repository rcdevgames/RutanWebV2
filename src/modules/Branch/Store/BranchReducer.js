import {
  SET_BRANCH_LIST_DATA,
} from "./BranchActions";

export const initialState = {
  listBranch: [],
  selectedBranchId: "",
  selectedBranchData: {},
};

export default function branchReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_BRANCH_LIST_DATA:
      newState.listBranch = action.payload;
      return { ...newState };
  }

  return state;
}
