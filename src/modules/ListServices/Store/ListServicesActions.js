import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_LIST_SERVICES = "SET_LIST_SERVICES";

export const setListServices = (payload) => {
  return {
    type: SET_LIST_SERVICES,
    payload,
  };
};

export const getListServicesRequested = async () => {
  const { data } = await Invoke.getListServices(1, 10);
  store.dispatch(setListServices(data.callback));
};
