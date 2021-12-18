import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_BRANCH_LIST_DATA = "SET_BRANCH_LIST_DATA";

export const setBranchListData = (payload) => {
  return {
    type: SET_BRANCH_LIST_DATA,
    payload,
  };
};

export const getBranchListDataRequested = async () => {
  try {
    const { data } = await Invoke.getListBranch(1, 100);
    store.dispatch(setBranchListData(data.callback));
  } catch (error) {
    console.log(error);
  }
};
