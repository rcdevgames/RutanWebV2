import moment from "moment";
import { change, reset } from "redux-form";
import { store } from "../../../app/ConfigureStore";
import { v4 as uuidv4 } from "uuid";
import Invoke from "../../../app/axios/Invoke";
import { setGlobalFormLoading } from "../../App/Store/ComponentAction";
import { toast } from "react-toastify";
import { navigate, SelectStatus } from "../../../app/Helpers";

export const SET_ENUM_UNIT_MODEL = "SET_ENUM_UNIT_MODEL";

export const setEnumUnintModel = (payload) => {
  return {
    type: SET_ENUM_UNIT_MODEL,
    payload,
  };
};

const getEmployeeByIdFromReducer = async (employeeId, type) => {
  const { getState } = store;
  let tempData;
  if (type === "employee") {
    const { listEmployees } = getState().employees;
    tempData = listEmployees.filter((x) => x.id === employeeId);
  } else {
    const { listCustomers } = getState().customers;
    tempData = listCustomers.filter((x) => x.id === employeeId);
  }
  return tempData[0] ?? {};
};

const getProvinceByIdFromReducer = async (provinceId) => {
  const { getState } = store;
  const { listProvince } = getState().masters;
  const result = listProvince.filter((x) => x.id === provinceId);
  return result[0] ?? {};
};

export const setAutoPopulateUnitModel = async (unitId, fieldIndex) => {
  const { dispatch } = store;
  const { data } = await Invoke.getListUnitModel(1, 100, unitId, "");

  dispatch(
    change(
      "externalServiceForm",
      `units[${fieldIndex}].enumUnitModel`,
      data.callback.data ?? []
    )
  );
};

export const setAutoPopulateEmployee = async (employeeId, indexEmployee) => {
  try {
    const employeeData = await getEmployeeByIdFromReducer(
      employeeId,
      "employee"
    );
    const provinceData = await getProvinceByIdFromReducer(
      employeeData.province_id
    );
    // Mapping data to redux-form
    store.dispatch(
      change(
        "externalServiceForm",
        `employees[${indexEmployee}].nik`,
        employeeData.nik ?? ""
      )
    );
    store.dispatch(
      change(
        "externalServiceForm",
        `employees[${indexEmployee}].employeePhoneNumber`,
        employeeData.phone ?? ""
      )
    );
    store.dispatch(
      change(
        "externalServiceForm",
        `employees[${indexEmployee}].employeeProvinceName`,
        provinceData.name
      )
    );
    store.dispatch(
      change(
        "externalServiceForm",
        `employees[${indexEmployee}].employeeDetailProvince`,
        provinceData
      )
    );
    // store.dispatch(
    //   change("externalServiceForm", "employeeCityName", detailEmployee.nik)
    // );
  } catch (error) {
    console.log("process error");
    console.log(error);
  }
};

export const setAutoPopulateCustomer = async (customerId) => {
  try {
    const customersData = await getEmployeeByIdFromReducer(
      customerId,
      "customers"
    );
    const provinceData = await getProvinceByIdFromReducer(
      customersData.province_id
    );
    // Mapping data to redux-form
    store.dispatch(
      change(
        "externalServiceForm",
        "customerPhoneNumber",
        customersData.phone ?? ""
      )
    );
    store.dispatch(
      change("externalServiceForm", "picCustomer", customersData.pic)
    );
    store.dispatch(
      change("externalServiceForm", "customerAddress", customersData.address)
    );
    store.dispatch(
      change("externalServiceForm", "picPhoneNumber", customersData.pic_phone)
    );
    store.dispatch(
      change("externalServiceForm", "customerProvinceName", provinceData.name)
    );
    store.dispatch(
      change("externalServiceForm", "customerDetailProvince", provinceData)
    );
  } catch (error) {
    console.log("process error");
    console.log(error);
  }
};

export const onChangeUnitModel = (val, index, enumUnit) => {
  const { dispatch } = store;

  const splitUnitModel = val.split("|");

  const [selectedUnitModel] = enumUnit.filter(
    (x) => x.id === splitUnitModel[0]
  );

  dispatch(
    change(
      "externalServiceForm",
      `units[${index}].unitModelSerialNumber`,
      selectedUnitModel.serial_number ?? ""
    )
  );
};

export const handleSubmitForm = async (values) => {
  const { dispatch } = store;
  dispatch(setGlobalFormLoading(true));
  const splitCustomerId = values.customer.split("|");
  const splitTypeId = values.typeService.split("|");
  const splitWarranty = values.warranty.split("|");
  let employees = [];

  values.employees.map((item, index) => {
    const splitEmployeeId = item.employee.split("|");
    employees.push({
      employee_id: splitEmployeeId[0],
      active: "true",
    });
  });

  const unitList = [];
  values.units.map((item, index) => {
    const splitUnitModel = item.unitModelId.split("|");
    unitList.push({
      unit_model_id: splitUnitModel[0],
    });
  });

  const payload = {
    customer_id: splitCustomerId[0],
    job_form_id: uuidv4(),
    identification_id: null,
    type: splitTypeId[0],
    status: SelectStatus[0].value,
    is_external: "true",
    location: values.customerLocation,
    start: moment(values.startDate).format("YYYY-MM-DD"),
    due: moment(values.endDate).format("YYYY-MM-DD"),
    job_perform: values.jobPerform,
    warranty: splitWarranty[0],
    warranty_month: "", // null because internal services
    warranty_year: "", // null because internal services
    units: unitList ?? [], // empty array because internal services
    employees: employees,
  };

  console.log("=== payload : ", payload);

  try {
    const functionThatReturnPromise = () =>
      new Promise((resolve, reject) => {
        Invoke.addInternalService(payload)
          .then(() => {
            setTimeout(() => {
              dispatch(setGlobalFormLoading(false));
              dispatch(reset("internalServiceForm"));
              resolve();
            }, 1000);
            setTimeout(() => {
              navigate("list_service");
            }, 1500);
          })
          .catch(() => {
            setTimeout(reject, 1000);
            dispatch(setGlobalFormLoading(false));
          });
      });
    toast.promise(functionThatReturnPromise, {
      pending: "Proses menyimpan data...",
      success: "Data berhasil disimpan 👌",
      error: "Data gagal disimpan, harap coba lagi 🤯",
    });
  } catch (error) {
    console.log(error);
    dispatch(setGlobalFormLoading(false));
  }
};
