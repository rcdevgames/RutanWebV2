import React from "react";
import { connect } from "react-redux";
import {
  change,
  formValueSelector,
  getFormValues,
  reduxForm,
  reset,
} from "redux-form";
import ExternalServiceComponent from "../Component/ExternalServiceComponent";
import * as validateForm from "../../../app/validateForm";
import * as CustomerActions from "../../Customers/Store/CustomersActions";
import * as EmployeeActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import * as ExternalServiceActions from "../Store/ExternalServiceActions";
import * as UnitsActions from "../../Units/Store/UnitsActions";
import * as JobFormsActions from "../../JobForms/Store/JobFormsActions";
import { enumTypeExternalServices, enumWarranty } from "../../../app/Helpers";

const selector = formValueSelector("externalServiceForm");

const ExternalServiceContainer = (props) => {
  const [unitQty, setUnitQty] = React.useState(1);
  const [unitData, setUnitData] = React.useState([]);
  const [isTroubleShoot, setIsTroubleShoot] = React.useState(false);

  const {
    valid,
    customers: { listCustomersDropdown },
    employees: { listEmployees },
    units: { listUnits },
    jobForms: { listJobForms },
    resetForm,
    // form: { externalServiceForm },
  } = props;

  const submitForm = (values) => {
    ExternalServiceActions.handleSubmitForm(values);
    if (valid) {
      console.log("success");
    }
  };

  const handleAddNewUnit = () => {
    if (unitQty === 5) {
      return;
    }
    setUnitQty(unitQty + 1);
  };

  const handleSubtractUnit = () => {
    if (unitQty === 0) {
      return;
    }
    setUnitQty(unitQty - 1);
  };

  const SelectUnit = [];
  listUnits.map((item, index) => {
    SelectUnit.push({
      id: `unit-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  React.useEffect(() => {
    CustomerActions.getCustomerListDataByPaging(1, 999999, "", "", true);
    EmployeeActions.loadEmployeeListData(1, 99999);
    MasterDataActions.loadProvinceListData();
    return () => {
      resetForm();
    };
  }, []);

  const SelectCustomerData = [];
  listCustomersDropdown.map((item, index) => {
    SelectCustomerData.push({
      id: `customer-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const SelectEmployeeData = [];
  listEmployees.map((item, index) => {
    SelectEmployeeData.push({
      id: `employee-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const SelectJobFormsData = [];
  listJobForms.map((item, index) => {
    SelectJobFormsData.push({
      id: `job-forms-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const handleChangeType = (val) => {
    const type = val.split("|");
    if (
      type[0] === "T2" ||
      type[0] === "T4" ||
      type[0] === "T5" ||
      type[0] === "T6"
    ) {
      setIsTroubleShoot(true);
    } else {
      setIsTroubleShoot(false);
    }
  };

  React.useEffect(() => {
    UnitsActions.getUnitListDataRequested(1, 100);
    JobFormsActions.getJobFormsListDataRequested(1, 100);
    let totalUnit = [];
    for (let i = 0; i < unitQty; i++) {
      totalUnit.push(i);
    }
    setUnitData(totalUnit);
  }, [unitQty]);

  return (
    <ExternalServiceComponent
      listCustomers={SelectCustomerData}
      listEmployee={SelectEmployeeData}
      listUnit={SelectUnit}
      enumJobForms={SelectJobFormsData}
      enumType={enumTypeExternalServices}
      enumWarranty={enumWarranty}
      submitForm={submitForm}
      handleAddNewUnit={handleAddNewUnit}
      handleSubtractUnit={handleSubtractUnit}
      unitData={unitData}
      handleChangeType={handleChangeType}
      isTroubleShoot={isTroubleShoot}
      // selectedUnitModelList={selectedUnitModelList}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  customers: state.customers,
  employees: state.employees,
  units: state.units,
  jobForms: state.jobForms,
  formValues: getFormValues("externalServiceForm")(state),
  externalValues: selector(state, "units"),
});
const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("externalServiceForm"));
  },
  handleAutoPopulateEmployee: (employeeId, indexEmployee) => {
    const arrVal = employeeId.split("|");
    if (!employeeId) {
      ExternalServiceActions.setAutoPopulateEmployee(
        arrVal[0],
        indexEmployee,
        true
      );
      return;
    }
    ExternalServiceActions.setAutoPopulateEmployee(arrVal[0], indexEmployee);
  },
  handleAutoPopulateCustomer: (customerId) => {
    const arrVal = customerId.split("|");

    if (!customerId) {
      ExternalServiceActions.setAutoPopulateCustomer(arrVal[0], true);
      return;
    }
    ExternalServiceActions.setAutoPopulateCustomer(arrVal[0]);
  },
  handleAutoPopulateUnitModel: (unitId, fieldIndex) => {
    dispatch(
      change("externalServiceForm", `units[${fieldIndex}].enumUnitModel`, [])
    );
    dispatch(
      change("externalServiceForm", `units[${fieldIndex}].unitModelId`, "")
    );
    if (unitId) {
      const arrVal = unitId.split("|");
      ExternalServiceActions.setAutoPopulateUnitModel(arrVal[0], fieldIndex);
    }
  },
  onChangeUnitModel: (val, index, enumModel) => {
    if (val) {
      ExternalServiceActions.onChangeUnitModel(val, index, enumModel);
    }
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalServiceContainer);

export default reduxForm({
  form: "externalServiceForm",
  validate: validateForm.validateFormExternalService,
})(EnhanceContainer);
