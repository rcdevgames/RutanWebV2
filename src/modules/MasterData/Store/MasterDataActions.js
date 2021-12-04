import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_PROVINCE_LIST_DATA = "SET_PROVINCE_LIST_DATA";

export const setProvinceListData = (payload) => {
  return {
    type: SET_PROVINCE_LIST_DATA,
    payload,
  };
};

export const loadProvinceListData = async () => {
  try {
    const { data } = await Invoke.getProvinceList(1, 100);
    store.dispatch(setProvinceListData(data.callback));
  } catch (error) {
    console.log(error);
  }
};