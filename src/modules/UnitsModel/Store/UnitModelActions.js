import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_LIST_UNIT_MODEL = "SET_LIST_UNIT_MODEL";

export const setListUnitModel = (payload) => {
  return {
    type: SET_LIST_UNIT_MODEL,
    payload,
  };
};

export const getListUnitModelRequested = async (unitId) => {
  const { data } = await Invoke.getListUnitModel(1, 10, unitId);
  store.dispatch(setListUnitModel(data.callback));
};
