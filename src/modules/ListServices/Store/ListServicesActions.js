import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { navigate } from "../../../app/Helpers";

export const SET_LIST_SERVICES = "SET_LIST_SERVICES";
export const SET_SELECTED_JOB_SERVICE = "SET_SELECTED_JOB_SERVICE";
export const SET_PAGING_LIST_SERVICE = "SET_PAGING_LIST_SERVICE";

export const setListServices = (payload) => {
  return {
    type: SET_LIST_SERVICES,
    payload,
  };
};

export const setPagingListService = (payload) => {
  return {
    type: SET_PAGING_LIST_SERVICE,
    payload,
  };
};

export const setSelectedJobService = (payload) => {
  return {
    type: SET_SELECTED_JOB_SERVICE,
    payload,
  };
};

export const getListServicesRequested = async (page, limit, keyword = "") => {
  try {
    const { data } = await Invoke.getListServices(page, limit, keyword);
    const paging = {};
    paging.page = data.callback.page;
    paging.limit = data.callback.limit;
    paging.totalPage = data.callback.totalPage;
    store.dispatch(setListServices(data.callback.data));
    store.dispatch(setPagingListService(paging));
  } catch (error) {
    console.log(error);
  }
};

export const handlePressEdit = async (values) => {
  try {
    const { data } = await Invoke.getOneServices(values.id);
    await store.dispatch(setSelectedJobService(data.callback));
    setTimeout(() => {
      navigate("detail-services");
    }, 500);
  } catch (error) {
    console.log(error);
  }
};
