import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { navigate } from "../../../app/Helpers";
import { toastr } from "react-redux-toastr";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { showToast } from "../../Roles/Store/RolesActions";
import { change } from "redux-form";
import moment from "moment";
import { setSelectedJobService } from "../../ListServices/Store/ListServicesActions";
import fileDownload from "js-file-download";

export const SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA =
  "SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA";

export const SET_GROUPING_SELECTED_SERVICES_MEDIA_DATA =
  "SET_GROUPING_SELECTED_SERVICES_MEDIA_DATA";

export const SET_GROUPING_SUMMARY_DATA = "SET_GROUPING_SUMMARY_DATA";

export const SET_SINGLE_SUMMARY_DATA = "SET_SINGLE_SUMMARY_DATA";

export const SET_GROUPING_CHECKLIST_DATA = "SET_GROUPING_CHECKLIST_DATA";

export const SET_SELECTED_SERVICES_SUMMARY_DATA =
  "SET_SELECTED_SERVICES_SUMMARY_DATA";

export const SET_SELECTED_SERVICES_MEDIA_DATA =
  "SET_SELECTED_SERVICES_MEDIA_DATA";

export const SET_SELECTED_SERVICES_DAILIES_DATA =
  "SET_SELECTED_SERVICES_DAILIES_DATA";

export const SET_SELECTED_SERVICES_HISTORIES_DATA =
  "SET_SELECTED_SERVICES_HISTORIES_DATA";

export const SET_SELECTED_SERVICES_CHECKLIST_DATA =
  "SET_SELECTED_SERVICES_CHECKLIST_DATA";

export const SET_SELECTED_SERVICES_REJECTED_DATA =
  "SET_SELECTED_SERVICES_REJECTED_DATA";

export const SET_EDIT_TRANSACTION_MODAL = "SET_EDIT_TRANSACTION_MODAL";

export const SET_REJECTIONS_MODAL = "SET_REJECTIONS_MODAL";

export const SET_EDIT_DAILIES_MODAL = "SET_EDIT_DAILIES_MODAL";

export const SET_SELECTED_EDIT_DAILIES_DATA = "SET_SELECTED_EDIT_DAILIES_DATA";

export const SET_SELECTED_UNIT = "SET_SELECTED_UNIT";

export const RESET_DETAIL_SERVICE = "RESET_DETAIL_SERVICE";

export const SET_INSERT_MEDIA_MODAL = "SET_INSERT_MEDIA_MODAL";

export const SET_TYPE_FORM_DAILIES = "SET_TYPE_FORM_DAILIES";

export const SET_EDIT_SUMMARY_MODAL = "SET_EDIT_SUMMARY_MODAL";

export const setRejectionsModal = (payload) => {
  return {
    type: SET_REJECTIONS_MODAL,
    payload,
  };
};

export const resetDetailService = () => {
  return {
    type: RESET_DETAIL_SERVICE,
  };
};

export const setSelectedUnit = (payload) => {
  return {
    type: SET_SELECTED_UNIT,
    payload,
  };
};

export const setEditTransactionModal = (payload) => {
  return {
    type: SET_EDIT_TRANSACTION_MODAL,
    payload,
  };
};

export const setGroupingSelectedServicesMediaData = (payload) => {
  return {
    type: SET_GROUPING_SELECTED_SERVICES_MEDIA_DATA,
    payload,
  };
};

export const setGroupingSummaryData = (payload) => {
  return {
    type: SET_GROUPING_SUMMARY_DATA,
    payload,
  };
};

export const setSingleSummaryData = (payload) => {
  return {
    type: SET_SINGLE_SUMMARY_DATA,
    payload,
  };
};

export const setGroupingChecklistData = (payload) => {
  return {
    type: SET_GROUPING_CHECKLIST_DATA,
    payload,
  };
};

export const setEditDailiesModal = (payload) => {
  return {
    type: SET_EDIT_DAILIES_MODAL,
    payload,
  };
};

export const setEditSummaryModal = (payload) => {
  return {
    type: SET_EDIT_SUMMARY_MODAL,
    payload,
  };
};

export const setInsertMediaModal = (payload) => {
  return {
    type: SET_INSERT_MEDIA_MODAL,
    payload,
  };
};

export const setSelectedServicesEmployeeListData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_EMPLOYEE_LIST_DATA,
    payload,
  };
};

export const setSelectedServicesChecklisttData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_CHECKLIST_DATA,
    payload,
  };
};

export const setSelectedSummaryData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_SUMMARY_DATA,
    payload,
  };
};

export const setSelectedServiceMediaData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_MEDIA_DATA,
    payload,
  };
};

export const setSelectedServiceDailiesData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_DAILIES_DATA,
    payload,
  };
};

export const setSelectedServiceHistoriesData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_HISTORIES_DATA,
    payload,
  };
};

export const setSelectedServiceRejectedData = (payload) => {
  return {
    type: SET_SELECTED_SERVICES_REJECTED_DATA,
    payload,
  };
};

export const setSelectedEditDailiesData = (payload) => {
  return {
    type: SET_SELECTED_EDIT_DAILIES_DATA,
    payload,
  };
};

export const setTypeFormDailies = (payload) => {
  return {
    type: SET_TYPE_FORM_DAILIES,
    payload,
  };
};

export const getJobServiceEmployeeList = async (jobId) => {
  const { dispatch } = store;
  const { data } = await Invoke.getServicesEmployee(jobId, 1, 100);
  const serviceEmployeeList = data.callback.data;

  const results = Promise.all(
    serviceEmployeeList.map(async (item, index) => {
      let subIitem = {};
      subIitem.active = item.active;
      subIitem.employee_service_id = item.id;
      const employee = await Invoke.getEmployeeById(item.employee_id);
      subIitem = { ...subIitem, ...employee.data.callback };
      return subIitem;
    })
  );
  dispatch(setSelectedServicesEmployeeListData(await results));
};

export const getJobServiceSummary = async (jobId, unitId = "") => {
  const { dispatch } = store;
  try {
    const { data } = await Invoke.getJobServiceSummary(jobId, unitId);
    dispatch(setSelectedSummaryData(data.callback));
  } catch (error) {
    dispatch(setSelectedSummaryData({}));
  }
};

export const getJobServiceMedia = async (jobId, unitId = "") => {
  const { dispatch } = store;
  try {
    const { data } = await Invoke.getJobServiceMedia(jobId, unitId);
    dispatch(setSelectedServiceMediaData(data.callback.data));
  } catch (error) {
    dispatch(setSelectedServiceMediaData([]));
  }
};

export const getJobServiceDailies = async (jobId, unitId = "") => {
  const { dispatch } = store;
  try {
    const { data } = await Invoke.getJobServiceDailies(jobId, unitId);
    dispatch(
      setSelectedServiceDailiesData(data.callback.data || data.callback)
    );
  } catch (error) {
    dispatch(setSelectedServiceDailiesData([]));
  }
};

export const getJobServiceHistories = async (jobId, keyword = "") => {
  const { dispatch } = store;
  const { data } = await Invoke.getJobServiceHistories(jobId, 1, 100, keyword);
  dispatch(setSelectedServiceHistoriesData(data.callback.logs));
};

export const getJobServiceRejections = async (jobId) => {
  const { dispatch } = store;
  const { data } = await Invoke.getRejectedData(jobId);
  dispatch(setSelectedServiceRejectedData(data.callback));
};

export const getChecklistData = async (unitModelId) => {
  const { dispatch } = store;
  try {
    const { data } = await Invoke.getChecklistData(unitModelId);
    dispatch(setSelectedServicesChecklisttData(data.callback));
  } catch (e) {
    console.log(e);
    dispatch(setSelectedServicesChecklisttData([]));
  }
};

export const handleAddNewEmployeeService = async (jobId, employeeId) => {
  const { dispatch } = store;
  try {
    dispatch(ComponentActions.setGlobalLoading(true));
    const payload = {};
    payload.employee_id = employeeId;
    payload.active = "true";
    await Invoke.addNewEmployeeService(jobId, payload);
    setTimeout(() => {
      dispatch(ComponentActions.setGlobalModal(false));
      dispatch(ComponentActions.setGlobalLoading(false));
      getJobServiceEmployeeList(jobId);
    }, 500);
  } catch (error) {
    dispatch(ComponentActions.setGlobalLoading(false));
  }
};

export const setStatusEmployee = async (
  jobId,
  employeeServiceId,
  employeeId,
  isActive
) => {
  const payload = {};
  payload.id = employeeServiceId;
  payload.employee_id = employeeId;
  payload.active = isActive;
  await Invoke.setStatusEmployeeService(jobId, payload);
  setTimeout(() => {
    getJobServiceEmployeeList(jobId);
  }, 500);
};

const doRejectServiceProcess = async (jobId, values) => {
  const { dispatch } = store;
  try {
    const payload = {};
    payload.reason = values.reason;
    await Invoke.setRejectedService(jobId, payload);
    showToast("Berhasil melakukan reject", "success");
    navigate("/list_service");
    dispatch(setRejectionsModal(false));
  } catch (error) {
    showToast("Proses reject gagal, silahkan coba lagi", "error");
    dispatch(setRejectionsModal(false));
  }
};

const doEditServiceProcess = async (values) => {
  const { dispatch } = store;

  const warranty = values.warranty.split("|");
  const warrantyYears = values.warrantyYears.split("|");
  const warrantyMonths = values.warrantyMonths.split("|");

  const payload = {};
  payload.id = values.id;
  payload.start = moment(values.startDate).format("YYYY-MM-DD");
  payload.due = moment(values.dueDate).format("YYYY-MM-DD");
  payload.job_perform = values.jobPerform;
  payload.warranty = warranty[0];
  payload.warranty_month = warrantyMonths[0] ?? 0;
  payload.warranty_year = warrantyYears[0] ?? 0;

  try {
    await Invoke.updateJobService(payload);
    showToast("Data berhasil disimpan", "success");

    const { data } = await Invoke.getOneServices(values.id);
    await store.dispatch(
      setSelectedJobService({ ...data.callback, units: values.unit_models })
    );
    dispatch(setEditTransactionModal(false));
  } catch (error) {
    showToast("Proses reject gagal, silahkan coba lagi", "error");
    dispatch(setEditTransactionModal(false));
  }
};

export const handlePressEditRequested = async (values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doEditServiceProcess(values);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm("Apakah anda yakin menyimpan data ini?", toastrConfirmOptions);
};

export const handlePressRejectedRequested = async (jobId, values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doRejectServiceProcess(jobId, values);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah anda yakin ingin me me-reject data ini?",
    toastrConfirmOptions
  );
};

const doEditDailiesProcess = async (values) => {
  const { dispatch, getState } = store;
  const dataService = getState().services.selectedJobService;
  const typeForm = getState().detailService.typeFormDailies;

  const payload = {};
  const insertPayload = {};
  const splitActivity = values.activityType.split("|") ?? "";
  const timeStart = values.timeStartEnd[0]
    ? moment(values.timeStartEnd[0]).format("HH:mm:ss")
    : moment().format("HH:mm:ss");
  const timeEnd = values.timeStartEnd[1]
    ? moment(values.timeStartEnd[1]).format("HH:mm:ss")
    : moment().format("HH:mm:ss");

  const dailyStart = `${moment(values.startDate).format(
    "YYYY-MM-DD"
  )} ${timeStart}`;

  const dailyEnd = `${moment(values.endDate).format("YYYY-MM-DD")} ${timeEnd}`;

  payload.id = values.id;
  payload.title = values.title ?? "";
  payload.daily_start = dailyStart;
  payload.daily_end = dailyEnd;
  payload.description = values.description ?? "";

  insertPayload.title = values.title ?? "";
  insertPayload.daily_start = dailyEnd;
  insertPayload.daily_end = dailyStart;
  insertPayload.description = values.description ?? "";
  insertPayload.type = splitActivity[0] ?? "none";

  try {
    if (typeForm === "add") {
      await Invoke.addJobServiceDaily(insertPayload, dataService.id);
    } else {
      await Invoke.updateJobServiceDailies(payload);
    }

    showToast("Berhasil menyimpan data", "success");
    await getJobServiceDailies(dataService.id);
    dispatch(setEditDailiesModal(false));
  } catch (error) {
    showToast("Proses manyimpan gagal, silahkan coba lagi", "error");
    dispatch(setEditTransactionModal(false));
  }
};

const doEditSummaryProcess = async (values) => {
  const { dispatch, getState } = store;
  const dataService = getState().services.selectedJobService;

  const payload = {};

  payload.summary = values.summary ?? "";

  if (dataService.is_external) {
    try {
      await Invoke.updateSummary(payload, dataService.id, values.unitId);
      showToast("Berhasil menyimpan data", "success");
      dispatch(setEditSummaryModal(false));
      // Call function to referesh summary unit group
      getUnitSummary((res) => {});
    } catch (error) {
      showToast("Proses manyimpan gagal, silahkan coba lagi", "error");
      dispatch(setEditSummaryModal(false));
    }
  } else {
    try {
      await Invoke.updateSummary(payload, dataService.id, null);
      showToast("Berhasil menyimpan data", "success");
      dispatch(setEditSummaryModal(false));
      // Call function to referesh summary unit single
      getUnitSummary((res) => {});
    } catch (error) {
      showToast("Proses manyimpan gagal, silahkan coba lagi", "error");
      dispatch(setEditSummaryModal(false));
    }
  }
};

const doAddSummaryProcess = async (values) => {
  const { dispatch, getState } = store;
  const dataService = getState().services.selectedJobService;

  const payload = {};

  payload.summary = values.summary ?? "";

  try {
    await Invoke.updateSummary(payload, dataService.id, null);
    showToast("Berhasil menyimpan data", "success");
    dispatch(setEditSummaryModal(false));
    // Call function to referesh summary unit group
    getUnitSummary((res) => {});
  } catch (error) {
    showToast("Proses manyimpan gagal, silahkan coba lagi", "error");
    dispatch(setEditSummaryModal(false));
  }
};

export const handlePressEditDailiesRequested = async (values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doEditDailiesProcess(values);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah anda yakin ingin menyimpan data ini?",
    toastrConfirmOptions
  );
};

export const handlePressEditSummaryRequested = async (values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      if (values.type === "NEW") {
        doAddSummaryProcess(values);
      } else {
        doEditSummaryProcess(values);
      }
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah anda yakin ingin menyimpan data ini?",
    toastrConfirmOptions
  );
};

const doInsertMedia = async (values) => {
  const { dispatch, getState } = store;
  const dataService = getState().services.selectedJobService;

  dispatch(ComponentActions.setGlobalLoading(true));

  const payload = {};

  const splitUnit = values.unit ? values.unit.split("|") : "";
  const unitId = splitUnit[0] ?? "";

  payload.title = values.title ?? "";
  payload.description = values.description ?? "";
  payload.type = "image";
  payload.base64 = values.imageUrl ?? "";

  const media = { media: [payload] };
  try {
    if (dataService.is_external) {
      await Invoke.addJobServiceMedia(media, dataService.id, unitId);
    } else {
      await Invoke.addJobServiceMedia(media, dataService.id);
    }
    showToast("Berhasil menyimpan data", "success");
    await getUnitMedia((callback) => {});
    dispatch(setInsertMediaModal(false));
    dispatch(ComponentActions.setGlobalLoading(false));
  } catch (error) {
    showToast("Proses manyimpan gagal, silahkan coba lagi", "error");
    dispatch(setInsertMediaModal(false));
    dispatch(ComponentActions.setGlobalLoading(false));
  }
};

export const handlePressInsertMediaRequested = async (values) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doInsertMedia(values);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah anda yakin ingin menyimpan data ini?",
    toastrConfirmOptions
  );
};

export const mapDetailTransactionToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().services.selectedJobService;
  dispatch(change("editTransactionForm", `id`, data.id ?? ""));
  dispatch(
    change("editTransactionForm", `startDate`, moment(data.start) ?? "")
  );
  dispatch(change("editTransactionForm", `endDate`, moment(data.end) ?? ""));
  dispatch(change("editTransactionForm", `jobPerform`, data.job_perform ?? ""));
  dispatch(
    change(
      "editTransactionForm",
      `warranty`,
      `${data.warranty}|${data.warranty ? "Warranty" : "No Warranty"}`
    )
  );
  dispatch(
    change(
      "editTransactionForm",
      `warrantyMonths`,
      `${data.warranty_month}|${data.warranty_month} bulan` ?? "0"
    )
  );
  dispatch(
    change("editTransactionForm", `warrantyYears`, data.warranty_year ?? "")
  );
};

export const mapDailiesToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().detailService.selectedEditDailies;
  dispatch(change("editDailiesForm", `id`, data.id ?? ""));
  dispatch(change("editDailiesForm", `startDate`, moment(data.mulai) ?? ""));
  dispatch(change("editDailiesForm", `endDate`, moment(data.selesai) ?? ""));
  dispatch(change("editDailiesForm", `title`, data.title ?? ""));
  dispatch(change("editDailiesForm", `description`, data.deskripsi ?? ""));
  dispatch(
    change("editDailiesForm", `activityType`, `${data.type}|${data.type}` ?? "")
  );
  dispatch(
    change(
      "editDailiesForm",
      `timeStartEnd`,
      [moment(data.mulai), moment(data.selesai)] ?? ""
    )
  );
};

export const downloadTransactionPdf = async () => {
  const { dispatch, getState } = store;
  const jobId = getState().services.selectedJobService.id;
  dispatch(ComponentActions.setGlobalLoading(true));

  try {
    const { data: dataTransactionPdf } = await Invoke.getTransactionPdfUrl(
      jobId
    );
    const downloadUrl = dataTransactionPdf.callback.pdf.url.replace(
      "103.158.192.161:3000",
      ""
    );
    const { data } = await Invoke.downloadPdfFromUrl(downloadUrl);
    dispatch(ComponentActions.setGlobalLoading(false));
    fileDownload(data, `${dataTransactionPdf.callback.pdf.filename}.pdf`);
  } catch (error) {
    dispatch(ComponentActions.setGlobalLoading(false));
    showToast("Gagal mengunduh report!", "error");
  }
};

export const resetFormModalImage = async () => {
  const { dispatch } = store;
  dispatch(change("editMediaForm", `imageUrl`, null));
  dispatch(change("editMediaForm", `title`, ""));
  dispatch(change("editMediaForm", `description`, ""));
  dispatch(change("editMediaForm", `unit`, ""));
};

export const getUnitSummary = async (callback) => {
  const { dispatch, getState } = store;
  const dataService = getState().services.selectedJobService;

  // setIsCompleteLoadedSummary(false);
  const groupingSummaryList = [];
  const singleSummary = {};
  let sequence = 0;

  const setDispatch = (responseStatus) => {
    if (sequence === dataService.units.length) {
      if (responseStatus === "error") {
        setTimeout(() => {
          if (dataService.is_external) {
            dispatch(setGroupingSummaryData(groupingSummaryList));
          } else {
            dispatch(setSingleSummaryData(singleSummary));
          }

          callback(true);
        }, 1000);
      } else {
        setTimeout(() => {
          if (dataService.is_external) {
            dispatch(setGroupingSummaryData(groupingSummaryList));
          } else {
            dispatch(setSingleSummaryData(singleSummary));
          }

          callback(true);
        }, 1000);
      }
    }
  };

  if (!dataService.is_external) {
    await Invoke.getJobServiceSummary(dataService.id, null)
      .then((dataSummary) => {
        singleSummary.id = dataService.id;
        singleSummary.summary = dataSummary.data.callback.summary;

        setDispatch(dataSummary.status);
      })
      .catch((err) => {
        singleSummary.id = dataService.id;
        singleSummary.summary = "";

        setDispatch("error");
        callback(true);
        console.log(err);
      });
  }

  if (dataService.units.length > 0) {
    await dataService.units.map(async (item, index) => {
      await Invoke.getJobServiceSummary(dataService.id, item.id)
        .then((dataSummary) => {
          groupingSummaryList.push({
            id: item.id,
            unitName: item.unit_name,
            summary: dataSummary.data.callback.summary,
          });

          sequence += 1;
          setDispatch(dataSummary.status);
        })
        .catch((err) => {
          groupingSummaryList.push({
            id: item.id,
            unitName: item.unit_name,
            summary: [],
          });
          sequence += 1;
          setDispatch("error");
          callback(true);
          console.log(err);
        });
    });
  } else {
    callback(true);
  }
};

export const getUnitMedia = async (callback) => {
  const { dispatch, getState } = store;
  const dataService = getState().services.selectedJobService;

  const groupingMediaList = [];
  let sequence = 0;

  const setDispatch = () => {
    if (sequence === dataService.units.length) {
      setTimeout(() => {
        dispatch(setGroupingSelectedServicesMediaData(groupingMediaList));
        callback(true);
      }, 1000);
    }
  };

  if (dataService.units.length > 0) {
    await dataService.units.map(async (item, index) => {
      await Invoke.getJobServiceMedia(dataService.id, item.id)
        .then((dataMedia) => {
          const imageList = dataMedia.data.callback.data ?? [];
          // Push to tempporary array
          groupingMediaList.push({
            unitName: item.unit_name,
            image: imageList ?? [],
          });
          sequence += 1;
          setDispatch();
        })
        .catch((err) => {
          groupingMediaList.push({
            unitName: item.unit_name,
            image: [],
          });

          sequence += 1;
          setDispatch();
        });
    });
  } else {
    try {
      // Get media without unitId
      const { data: dataMedia } = await Invoke.getJobServiceMedia(
        dataService.id
      );
      // Push to tempporary array
      groupingMediaList.push({
        unitName: "All",
        image: dataMedia.callback.data ?? [],
      });
      callback(true);
    } catch (error) {
      dispatch(setGroupingSelectedServicesMediaData([]));
      callback(true);
    }

    setTimeout(() => {
      dispatch(setGroupingSelectedServicesMediaData(groupingMediaList));
      callback(true);
    }, 1000);
  }
};
