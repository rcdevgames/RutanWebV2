import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";

export const setDashboardData = (payload) => {
  return {
    type: SET_DASHBOARD_DATA,
    payload,
  };
};

export const getDashboardProgressData = async () => {
  try {
    const { dispatch } = store;
    const { data } = await Invoke.getDashboardProgressData();
    dispatch(setDashboardData(data.callback));
  } catch (e) {
    console.log("error : ", e);
  }
};
