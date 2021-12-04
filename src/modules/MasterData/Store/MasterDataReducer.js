import { SET_PROVINCE_LIST_DATA } from "./MasterDataActions";

export const initialState = {
  listProvince: [],
};

export default function masterDataReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_PROVINCE_LIST_DATA:
      newState.listProvince = action.payload;
      return { ...newState };
  }

  return state;
}
