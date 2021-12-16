import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_JOB_FORMS_LIST_DATA = "SET_JOB_FORMS_LIST_DATA";

export const setJobFormsListData = (payload) => {
  return {
    type: SET_JOB_FORMS_LIST_DATA,
    payload,
  };
};

export const getJobFormsListRequested = async () => {
  try {
    const { data } = await Invoke.getListJobForm(1, 100);
    store.dispatch(setJobFormsListData(data.callback));
  } catch (error) {
    console.log(error);
  }
};
