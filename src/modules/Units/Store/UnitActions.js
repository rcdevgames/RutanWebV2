import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_LIST_UNIT = "SET_LIST_UNIT";

export const setListUnit = (payload) => {
  return {
    type: SET_LIST_UNIT,
    payload,
  };
};

export const getListUnitRequested = async () => {
  const { data } = await Invoke.getUnitList(1, 10);
  store.dispatch(setListUnit(data.callback));
};
