import { change, reset } from "redux-form";
import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { toastr } from "react-redux-toastr";
import { message } from "antd";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { showToast } from "../../Roles/Store/RolesActions";
import { navigate, SelectStatus } from "../../../app/Helpers";

export const SET_IDENTIFICATIONN_LIST_DATA = "SET_IDENTIFICATIONN_LIST_DATA";
export const SET_FORM_STATUS = "SET_FORM_STATUS";
export const SET_SELECTED_IDENTIFICATION_ID = "SET_SELECTED_IDENTIFICATION_ID";
export const SET_PAGING_IDENTIFICATION = "SET_PAGING_IDENTIFICATION";
export const SET_SELECTED_IDENTIFICATION_DATA =
  "SET_SELECTED_IDENTIFICATION_DATA";

export const setIdentificationListData = (payload) => {
  return {
    type: SET_IDENTIFICATIONN_LIST_DATA,
    payload,
  };
};

export const setPagingIdentification = (payload) => {
  return {
    type: SET_PAGING_IDENTIFICATION,
    payload,
  };
};

export const setFormStatus = (payload) => {
  return {
    type: SET_FORM_STATUS,
    payload,
  };
};

export const setSelectedIdentificationId = (payload) => {
  return {
    type: SET_SELECTED_IDENTIFICATION_ID,
    payload,
  };
};

export const setSelectedIdentificationData = (payload) => {
  return {
    type: SET_SELECTED_IDENTIFICATION_DATA,
    payload,
  };
};

export const getIdentificationListRequested = async (
  page,
  limit,
  keyword = ""
) => {
  const { getState, dispatch } = store;
  try {
    const branches = getState().branch.listBranch;
    const { data } = await Invoke.getIdentificationList(page, limit, keyword);
    const identificationList = data.callback.data;

    const newIdentificationList = [];
    if (identificationList.length > 0) {
      identificationList.map((item, index) => {
        const [defaultBranch] = branches.filter((x) => x.id === item.branch_id);
        item.branch_name = defaultBranch ? defaultBranch.name : "-";

        newIdentificationList.push(item);
      });
    }

    dispatch(setIdentificationListData(newIdentificationList));
  } catch (error) {
    console.log(error);
  }
};

// === INTERNAL FUNCTION ===
const doDeleteIdentificationProcess = async (branchId) => {
  const { getState } = store;
  const paging = getState().identification.paging;
  const { page, limit } = paging;
  try {
    await Invoke.deleteIdentificationById(branchId);
    showToast("Data berhasil dihapus", "success");
    getIdentificationListRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doAddIdentificationProcess = async (values) => {
  const { dispatch, getState } = store;
  const paging = getState().identification.paging;
  const { page, limit } = paging;
  try {
    const splitCustomer = values.customer.split("|");
    const splitBranch = values.branch.split("|");
    const splitLocation = values.location.split("|");
    const splitMilling = values.milling.split("|");
    const splitType = values.type.split("|");

    const payload = {};
    payload.customer_id = splitCustomer[0];
    payload.branch_id = splitBranch[0];
    payload.location = splitLocation[0];
    payload.type = splitType[0];
    payload.status = SelectStatus[0].value;
    payload.milling = splitMilling[0];

    await Invoke.addIdentification(payload);
    showToast("Data Berhasil Disimpan", "success");
    getIdentificationListRequested(page, limit);
    dispatch(ComponentActions.setGlobalModal(false));
  } catch (error) {
    showToast("Internal Server Error!", "error");
    dispatch(ComponentActions.setGlobalModal(false));
    console.log("error : ", error);
  }
};

const doUpdateIdentificationMilling = async (values, isLastStep) => {
  const { dispatch, getState } = store;
  const paging = getState().identification.paging;
  const { page, limit } = paging;
  try {
    const identificationId = getState().identification.selectedIdentificationId;
    const splitInstanceType = !values.instanceType
      ? ""
      : values.instanceType.split("|");
    const splitMillingStatus = !values.millingStatus
      ? ""
      : values.millingStatus.split("|");
    const splitCity = !values.city ? "" : values.city.split("|") ?? [];
    const splitProvince = !values.province
      ? ""
      : values.province.split("|") ?? [];

    const engineConfs = [];
    if (values.engine_confs && values.engine_confs.length > 0) {
      values.engine_confs.map((item, index) => {
        const subItem = item.list;
        subItem.engine_conf_id = item.id;
        engineConfs.push(subItem);
      });
    }

    const payload = {
      identification_id: identificationId,
      instance_type: splitInstanceType[0],
      instance_name: values.instanceName ?? "",
      name: values.customerName ?? "",
      ktp_npwp: values.ktp_npwp ?? "",
      status: splitMillingStatus[0] ?? "",
      city: splitCity[1] ?? "",
      province: splitProvince[1] ?? "",
      phone: values.phone ?? "",
      milling_capacity: values.millingCapacity ?? "",
      milling_work_capacity_perday: values.millingWorkCapacityPerDay ?? "",
      rice_trademark: values.riceTrademark ?? "",
      history_service_place: values.history_service_place ?? "",
      history_service_type: values.history_service_type ?? "",
      notes: values.note ?? "",
      engine_confs: engineConfs,
      spare_part_needs: values.spare_part_needs ?? [],
      spare_part_changing_histories: values.spare_part_changing_histories ?? [],
      spare_part_selling_histories: values.spare_part_selling_histories ?? [],
    };

    if (isLastStep) {
      showToast("Menyimpan perubahan", "success");
      setTimeout(() => {
        navigate("identification");
      }, 1000);
    }
    // return;
    await Invoke.updateIdentificationMilling(payload);
    // showToast("Pembaruan Berhasil Disimpan", "success");
    getIdentificationListRequested(page, limit);
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};

const doUpdateIdentificationRegular = async (values, isFinished) => {
  const { dispatch, getState } = store;
  const paging = getState().identification.paging;
  const { page, limit } = paging;
  try {
    if (!values || values === undefined) {
      // showToast("Harap lengkapi form untuk melanjutkan", "error");
      return;
    }

    const identificationId = getState().identification.selectedIdentificationId;
    const splitInstanceType = values?.instanceType.split("|");
    const splitMillingStatus = values.millingStatus
      ? values?.millingStatus.split("|")
      : [""];
    const splitCity = values?.city.split("|");
    const splitProvince = values?.province.split("|");

    const engineConfs = [];
    if (values.engine_confs && values.engine_confs.length > 0) {
      values.engine_confs.map((item, index) => {
        const subItem = item.list;
        subItem.engine_conf_id = item.id;
        engineConfs.push(subItem);
      });
    }

    const payload = {
      identification_id: identificationId,
      instance_type: splitInstanceType[0] ?? "",
      instance_name: values.instanceName ?? "",
      instance_address: values.instanceAddress ?? "",
      name: values.customerName ?? "",
      ktp_npwp: values.ktp_npwp ?? "",
      status: splitMillingStatus[0],
      address_district: "",
      address_city: splitCity[1] ?? "",
      address_province: splitProvince[1] ?? "",
      address_subdistrict: values.kelurahan ?? "",
      address_postal_code: values.postalCode ?? "",
      phone: values.instancePhoneNumber ?? "",
      product_name: values.productName,
      buy_date: "2021-09-22",
      assistance_date: "2021-09-25",
      serial_number: "SN1231",
      machine_number: "MCN1231",
      gearbox_number: "GB1231",
      production_unit_year: "2021",
      work_hour_per_day: "8 Hours",
      hour_meter: 1233,
      history_service_place: "Fee Text",
      history_service_type: "Fee Text",
      notes: "Test Regular Identification",
      spare_part_needs: values.spare_part_needs ?? [],
      spare_part_changing_histories: values.spare_part_changing_histories ?? [],
      spare_part_selling_histories: values.spare_part_selling_histories ?? [],
    };

    // return;
    await Invoke.updateIdentificationRegular(payload);
    if (isFinished) {
      showToast("Data berhasil disimpan", "success");
      getIdentificationListRequested(page, limit);
      navigate("/identification");
    }
  } catch (error) {
    showToast("Internal Server Error!", "error");
    console.log("error : ", error);
  }
};
// === END INTERNAL FUNCTION ===

export const resetForm = async () => {
  const { dispatch } = store;
  dispatch(reset("editIdentificationhForm"));
};

export const mapDetailBranchToForm = async () => {
  const { dispatch, getState } = store;
  const data = getState().identification.setSelectedIdentificationData;
  dispatch(change("editIdentificationForm", `id`, data.id ?? ""));
  dispatch(change("editIdentificationForm", `description`, data.name ?? ""));
};

export const saveIdentificationRequested = async (
  type,
  values,
  isLastStep = false
) => {
  const { getState } = store;
  const isMilling =
    getState().identification.selectedIdentificationData.milling;

  if (type === "add") {
    doAddIdentificationProcess(values);
  } else {
    if (isMilling) {
      doUpdateIdentificationMilling(values, isLastStep);
    } else {
      doUpdateIdentificationRegular(values, isLastStep);
    }
  }
};

export const deleteIdentificationRequested = async (identificationId) => {
  const toastrConfirmOptions = {
    onOk: () => {
      doDeleteIdentificationProcess(identificationId);
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm(
    "Apakah Anda Yakin Ingin Menghapus Data Ini?",
    toastrConfirmOptions
  );
};
