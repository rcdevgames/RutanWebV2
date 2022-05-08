import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { navigate } from "../../../app/Helpers";
import { toastr } from "react-redux-toastr";
import { showToast } from "../../Roles/Store/RolesActions";
import { setGlobalLoading } from "../../App/Store/ComponentAction";
import { setRejectionsModal } from "../../DetailServiceTransaction/Store/DetailServiceTransactionAction";

export const SET_LIST_SERVICES = "SET_LIST_SERVICES";
export const SET_SELECTED_JOB_SERVICE = "SET_SELECTED_JOB_SERVICE";
export const SET_PAGING_LIST_SERVICE = "SET_PAGING_LIST_SERVICE";
export const SET_SELECTED_JOB_SERVICE_ID = "SET_SELECTED_JOB_SERVICE_ID";

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

export const setSelectedJobServiceId = (payload) => {
  return {
    type: SET_SELECTED_JOB_SERVICE_ID,
    payload,
  };
};

export const getListServicesRequested = async (
  page,
  limit,
  keyword = "",
  type = "",
  status = ""
) => {
  try {
    const { data } = await Invoke.getListServices(
      page,
      limit,
      keyword,
      type,
      status
    );
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

export const handleSearch = async (page, limit, keyword, filterValues) => {
  if (!filterValues) {
    getListServicesRequested(page, limit, keyword);
    return;
  }

  const splitTypeService = filterValues.typeService
    ? filterValues.typeService.split("|")
    : "";
  const splitStatusService = filterValues.statusService
    ? filterValues.statusService.split("|")
    : "";

  const typeService = filterValues.typeService ? splitTypeService[0] : "";
  const statusService = filterValues.statusService ? splitStatusService[0] : "";

  try {
    await getListServicesRequested(
      page,
      limit,
      keyword,
      typeService,
      statusService
    );
  } catch (error) {
    console.log(error);
  }
};

export const handlePressEdit = async (values) => {
  try {
    const { data } = await Invoke.getOneServices(values.id);
    await store.dispatch(
      setSelectedJobService({ ...data.callback, units: values.unit_models })
    );
    setTimeout(() => {
      navigate("detail-services");
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

const doDeleteJobServiceProcess = async (jobId) => {
  const { getState } = store;
  const paging = getState().services.paging;
  const { page, limit } = paging;

  try {
    await Invoke.deleteJobServiceById(jobId);
    showToast("Data berhasil dihapus", "success");
    getListServicesRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

export const deleteJobServiceRequested = async (jobId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteJobServiceProcess(jobId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};

export const handlePressActionsRequested = async (jobId, type) => {
  const { dispatch } = store;
  type = type.toLowerCase();
  let message;

  switch (type) {
    case "approved":
      message = "Apakah anda yakin ingin meng-approve data ini?";
      break;

    case "finished":
      message = "Apakah anda yakin ingin mem-finishing data ini?";
      break;

    case "rejected":
      message = "Apakah anda yakin ingin me me-reject data ini?";
      await dispatch(setRejectionsModal(true));
      break;
  }

  if (type.toLowerCase() !== "rejected") {
    const toastrConfirmOptions = {
      onOk: () => {
        doCallActionProcess(jobId, type);
      },
      okText: "Ya",
      cancelText: "Tidak",
    };

    toastr.confirm(message, toastrConfirmOptions);
  }
};

export const doCallActionProcess = async (jobId, type) => {
  const { getState, dispatch } = store;
  const paging = getState().services.paging;
  const { page, limit } = paging;
  dispatch(setGlobalLoading(true));
  try {
    if (type === "approved") {
      await Invoke.setApprovedService(jobId);
    }
    if (type === "finished") {
      await Invoke.setFinishedService(jobId);
    }
    await getListServicesRequested(page, limit);
    showToast("Data berhasil di approved", "success");
    setTimeout(() => {
      navigate("/list_service");
      dispatch(setGlobalLoading(false));
    }, 500);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    store.dispatch(setGlobalLoading(false));
    console.log("error : ", error);
  }
};
