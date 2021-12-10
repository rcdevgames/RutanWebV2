import { store } from "../../../app/ConfigureStore";

export const PROCESS_GLOBAL_LOADING = "PROCESS_GLOBAL_LOADING";
export const PROCESS_FORM_GLOBAL_LOADING = "PROCESS_FORM_GLOBAL_LOADING";
export const SHOW_GLOBAL_MODAL = "SHOW_GLOBAL_MODAL";
export const RESET_ALL_LOADING = "RESET_ALL_LOADING";

export const setGlobalLoading = (payload) => {
  return {
    type: PROCESS_GLOBAL_LOADING,
    payload,
  };
};

export const setGlobalModal = (payload) => {
  return {
    type: SHOW_GLOBAL_MODAL,
    payload,
  };
};

export const setGlobalFormLoading = (payload) => {
  return {
    type: PROCESS_FORM_GLOBAL_LOADING,
    payload,
  };
};

export const resetAllProcessLoading = () => {
  return {
    type: PROCESS_FORM_GLOBAL_LOADING,
  };
};

export const resetAllGlobalLoadingProcess = () => {
  const { dispatch } = store;
  dispatch(resetAllProcessLoading());
};
