import {
  PROCESS_GLOBAL_LOADING,
  PROCESS_FORM_GLOBAL_LOADING,
  RESET_ALL_LOADING,
  SHOW_GLOBAL_MODAL,
} from "./ComponentAction";

export const initialState = {
  isLoadingGlobal: false,
  isLoadingFormGlobal: false,
  isModalVisible: false,
};

export default function ComponentReducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  const newState = Object.assign({}, state);

  // eslint-disable-next-line default-case
  switch (action.type) {
    case PROCESS_GLOBAL_LOADING:
      newState.isLoadingGlobal = action.payload;
      return { ...newState };
    case PROCESS_FORM_GLOBAL_LOADING:
      newState.isLoadingFormGlobal = action.payload;
      return { ...newState };
    case SHOW_GLOBAL_MODAL:
      newState.isModalVisible = action.payload;
      return { ...newState };
    case RESET_ALL_LOADING:
      newState.isLoadingGlobal = false;
      newState.isLoadingFormGlobal = false;
      return { ...newState };
  }
  return state;
}
