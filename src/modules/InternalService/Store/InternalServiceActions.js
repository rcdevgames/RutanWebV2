import moment from "moment";
import { change } from "redux-form";
import { store } from "../../../app/ConfigureStore";
import { v4 as uuidv4 } from "uuid";
import Invoke from "../../../app/axios/Invoke";

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

export const setAutoPopulateEmployee = async (employeeId) => {
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
      change("internalServiceForm", "nik", employeeData.nik ?? "")
    );
    store.dispatch(
      change(
        "internalServiceForm",
        "employeePhoneNumber",
        employeeData.phone ?? ""
      )
    );
    store.dispatch(
      change("internalServiceForm", "employeeProvinceName", provinceData.name)
    );
    store.dispatch(
      change("internalServiceForm", "employeeDetailProvince", provinceData)
    );
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
        "internalServiceForm",
        "customerPhoneNumber",
        customersData.phone ?? ""
      )
    );
    store.dispatch(
      change("internalServiceForm", "picCustomer", customersData.pic)
    );
    store.dispatch(
      change("internalServiceForm", "customerAddress", customersData.address)
    );
    store.dispatch(
      change("internalServiceForm", "picPhoneNumber", customersData.pic_phone)
    );
    store.dispatch(
      change("internalServiceForm", "customerProvinceName", provinceData.name)
    );
    store.dispatch(
      change("internalServiceForm", "customerDetailProvince", provinceData)
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleSubmitForm = async (values) => {
  const splitEmployeeId = values.employee.split("|");
  const splitCustomerId = values.customer.split("|");
  const splitTypeId = values.typeService.split("|");
  const payload = {
    customer_id: splitCustomerId[0],
    job_form_id: uuidv4(),
    identification_id: null,
    type: splitTypeId[0],
    status: "S1",
    is_external: "false",
    location: values.customerLocation,
    start: moment(values.startDate).format("YYYY-MM-DD"),
    due: moment(values.endDate).format("YYYY-MM-DD"),
    job_perform: values.jobPerform,
    warranty: "false",
    warranty_month: "", // null because internal services
    warranty_year: "", // null because internal services
    units: [], // empty array because internal services
    employees: [
      {
        employee_id: splitEmployeeId[0],
        active: "true",
      },
    ],
  };

  try {
    await Invoke.addInternalService(payload);
    console.log("=== Success insert services");
  } catch (error) {
    console.log(error);
  }
};
