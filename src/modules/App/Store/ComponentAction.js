export const PROCESS_GLOBAL_LOADING = "PROCESS_GLOBAL_LOADING";
export const SHOW_MODAL = "SHOW_MODAL";

export const setGlobalLoading = (payload) => {
  return {
    type: PROCESS_GLOBAL_LOADING,
    payload,
  };
};
