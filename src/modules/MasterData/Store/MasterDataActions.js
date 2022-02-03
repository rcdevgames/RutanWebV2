import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";

export const SET_PROVINCE_LIST_DATA = "SET_PROVINCE_LIST_DATA";
export const SET_CITY_LIST_DATA = "SET_CITY_LIST_DATA";
export const SET_MENU_LIST_DATA = "SET_MENU_LIST_DATA";

export const setProvinceListData = (payload) => {
  return {
    type: SET_PROVINCE_LIST_DATA,
    payload,
  };
};

export const setMenuListData = (payload) => {
  return {
    type: SET_MENU_LIST_DATA,
    payload,
  };
};

export const setCityListData = (payload) => {
  return {
    type: SET_CITY_LIST_DATA,
    payload,
  };
};

export const loadProvinceListData = async () => {
  try {
    const { data } = await Invoke.getProvinceList(1, 100);
    store.dispatch(setProvinceListData(data.callback.data));
  } catch (error) {
    console.log(error);
  }
};

export const loadCityListData = async (provinceId) => {
  try {
    const { data } = await Invoke.getCityList(1, 100, provinceId);
    store.dispatch(setCityListData(data.callback.data));
  } catch (error) {
    console.log(error);
  }
};

export const loadMenuListData = async () => {
  try {
    const { data } = await Invoke.getListMenu(1, 100);
    store.dispatch(setMenuListData(data.callback.data));
  } catch (error) {
    console.log(error);
  }
};
