import { change } from "redux-form";
import { store } from "../../../app/ConfigureStore";

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
    // store.dispatch(
    //   change("internalServiceForm", "employeeCityName", detailEmployee.nik)
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
    console.log("process error");
    console.log(error);
  }
};

const handleSubmitForm = (values) => {
  const payload = {
    customer_id: "f9e37843-6bdc-4b6c-97a8-0df4c5a4e66f",
    job_form_id: "b1546af9-9be8-4704-b935-294820d5e127",
    identification_id: null,
    type: "T1",
    status: "S1",
    is_external: "false",
    location: "in the house",
    start: "2021-03-02",
    due: "2021-03-09",
    job_perform: "job perform",
    warranty: "true",
    warranty_month: "10",
    warranty_year: "2021",
    units: [
      {
        unit_model_id: "ddfd2436-423f-46f6-b880-ed3fb11a89fb",
      },
    ],
    employees: [
      {
        employee_id: "16836301-fe52-4627-90bd-198cc2f0d2ba",
        active: "true",
      },
    ],
  };
};
