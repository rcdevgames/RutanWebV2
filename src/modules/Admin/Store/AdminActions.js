import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_LIST_ADMIN = "SET_LIST_ADMIN";

export const setListAdmin = (payload) => {
  return {
    type: SET_LIST_ADMIN,
    payload,
  };
};

export const getListAdminRequested = async () => {
  const { data } = await Invoke.getListAdmin(1, 10);
  store.dispatch(setListAdmin(data.callback.data));
};
