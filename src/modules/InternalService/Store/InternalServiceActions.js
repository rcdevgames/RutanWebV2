import moment from "moment";
import { change, reset } from "redux-form";
import { store } from "../../../app/ConfigureStore";
import { v4 as uuidv4 } from "uuid";
import Invoke from "../../../app/axios/Invoke";
import { setGlobalFormLoading } from "../../App/Store/ComponentAction";
import { toast } from "react-toastify";
import { navigate, SelectStatus } from "../../../app/Helpers";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";

const getEmployeeByIdFromReducer = async (employeeId, type) => {
  const { getState } = store;
  let tempData;
  if (type === "employee") {
    const { listEmployees } = getState().employees;
    tempData = listEmployees.filter((x) => x.id === employeeId);
  } else {
    const { listCustomersDropdown } = getState().customers;
    tempData = listCustomersDropdown.filter((x) => x.id === employeeId);
  }
  return tempData[0] ?? {};
};

const getProvinceByIdFromReducer = async (provinceId) => {
  const { getState } = store;
  const { listProvince } = getState().masters;
  const result = listProvince.filter((x) => x.id === provinceId);
  return result[0] ?? {};
};

const getCityByIdFromReducer = async (cityId) => {
  const { getState } = store;
  const { listCity } = getState().masters;
  const result = listCity.filter((x) => x.id === cityId);
  return result[0] ?? {};
};

export const setAutoPopulateEmployee = async (
  employeeId,
  indexEmployee,
  isReset = false
) => {
  if (isReset) {
    // Mapping data to redux-form
    store.dispatch(
      change("internalServiceForm", `employees[${indexEmployee}].nik`, "")
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeePhoneNumber`,
        ""
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeProvinceName`,
        ""
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeDetailProvince`,
        {}
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeCityName`,
        ""
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeDetailCity`,
        {}
      )
    );
    return;
  }

  try {
    const employeeData = await getEmployeeByIdFromReducer(
      employeeId,
      "employee"
    );
    const provinceData = await getProvinceByIdFromReducer(
      employeeData.province_id
    );

    await MasterDataActions.loadCityListData(employeeData.province_id);

    const cityData = await getCityByIdFromReducer(employeeData.city_id);
    // Mapping data to redux-form
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].nik`,
        employeeData.nik ?? ""
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeePhoneNumber`,
        employeeData.phone ?? ""
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeProvinceName`,
        provinceData.name
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeDetailProvince`,
        provinceData
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeCityName`,
        cityData.name
      )
    );
    store.dispatch(
      change(
        "internalServiceForm",
        `employees[${indexEmployee}].employeeDetailCity`,
        cityData
      )
    );
  } catch (error) {
    console.log("process error");
    console.log(error);
  }
};

export const setAutoPopulateCustomer = async (customerId, isReset = false) => {
  let citySelected;
  if (isReset) {
    // Mapping data to redux-form
    store.dispatch(change("internalServiceForm", "customerPhoneNumber", ""));
    store.dispatch(change("internalServiceForm", "picCustomer", ""));
    store.dispatch(change("internalServiceForm", "customerAddress", ""));
    store.dispatch(change("internalServiceForm", "picPhoneNumber", ""));
    store.dispatch(change("internalServiceForm", "customerProvinceName", ""));
    store.dispatch(change("internalServiceForm", "customerDetailProvince", {}));
    store.dispatch(change("internalServiceForm", "customerCityName", ""));
    store.dispatch(change("internalServiceForm", "customerDetailCity", {}));
    return;
  }

  try {
    const customersData = await getEmployeeByIdFromReducer(
      customerId,
      "customers"
    );

    const provinceData = await getProvinceByIdFromReducer(
      customersData.province_id
    );

    const cityData = await Invoke.getCityList(
      1,
      200,
      customersData.province_id
    );

    if (cityData.data.callback.data.length > 0) {
      const [filteredCity] = cityData.data.callback.data.filter(
        (x) => x.id === customersData.city_id
      );
      citySelected = filteredCity;
    }

    console.log("=== City : ", cityData);

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
    store.dispatch(
      change("internalServiceForm", "customerCityName", citySelected.name)
    );
    store.dispatch(
      change("internalServiceForm", "customerDetailCity", citySelected)
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleSubmitForm = async (values) => {
  const { dispatch } = store;
  dispatch(setGlobalFormLoading(true));
  const splitCustomerId = values.customer.split("|");
  const splitTypeId = values.typeService.split("|");
  let employees = [];

  values.employees.map((item, index) => {
    const splitEmployeeId = item.employee.split("|");
    employees.push({
      employee_id: splitEmployeeId[0],
      active: "true",
    });
  });

  const payload = {
    customer_id: splitCustomerId[0],
    job_form_id: uuidv4(),
    identification_id: null,
    type: splitTypeId[0],
    status: SelectStatus[0].value,
    is_external: "false",
    location: values.customerLocation ?? "",
    start: moment(values.startDate).format("YYYY-MM-DD"),
    due: moment(values.endDate).format("YYYY-MM-DD"),
    job_perform: values.jobPerform,
    warranty: "false",
    warranty_month: "", // null because internal services
    warranty_year: "", // null because internal services
    units: [], // empty array because internal services
    employees: employees,
  };

  try {
    const functionThatReturnPromise = () =>
      new Promise((resolve, reject) => {
        Invoke.addInternalService(payload)
          .then(() => {
            setTimeout(() => {
              dispatch(setGlobalFormLoading(false));
              dispatch(reset("internalServiceForm"));
              navigate("list_service");
              resolve();
            }, 1000);
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
