import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import ExternalServiceComponent from "../Component/ExternalServiceComponent";
import * as validateForm from "../../../app/validateForm";
import * as CustomerActions from "../../Customers/Store/CustomersActions";
import * as EmployeeActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import * as ExternalServiceActions from "../Store/ExternalServiceActions";
import * as UnitActions from "../../Units/Store/UnitActions";
import * as JobFormsActions from "../../JobForms/Store/JobFormsActions";

const ExternalServiceContainer = (props) => {
  const [unitQty, setUnitQty] = React.useState(1);
  const [unitData, setUnitData] = React.useState([]);

  const {
    valid,
    customers: { listCustomers },
    employees: { listEmployees },
    units: { listUnit },
    jobForms: { listJobForms },
    resetForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      // AuthActions.handleSubmitLogin(values);
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

  React.useEffect(() => {
    CustomerActions.loadCustomerListData();
    EmployeeActions.loadEmployeeListData();
    MasterDataActions.loadProvinceListData();
    return () => {
      console.log("=== reset Form");
      resetForm();
    };
  }, []);

  const SelectCustomerData = [];
  listCustomers.map((item, index) => {
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

  const SelectUnitData = [];
  listUnit.map((item, index) => {
    SelectUnitData.push({
      id: `unit-${index}`,
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

  const enumType = [
    { id: `enum-type-1`, value: "T1", label: "Repair" },
    { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
    { id: `enum-type-3`, value: "T3", label: "Identification" },
    { id: `enum-type-4`, value: "T4", label: "Training" },
    { id: `enum-type-5`, value: "T5", label: "Demo" },
    { id: `enum-type-6`, value: "T6", label: "Modification" },
  ];

  const enumWarranty = [
    { id: `enum-warranty-1`, value: true, label: "Warranty" },
    { id: `enum-warranty-2`, value: false, label: "No Warranty" },
  ];

  React.useEffect(() => {
    UnitActions.getListUnitRequested();
    JobFormsActions.getJobFormsListRequested();
    let totalUnit = [];
    for (let i = 0; i < unitQty; i++) {
      totalUnit.push(i);
    }
    setUnitData(totalUnit);
  }, [unitQty]);

  console.log("=== unit : ", unitData);

  return (
    <ExternalServiceComponent
      listCustomers={SelectCustomerData}
      listEmployee={SelectEmployeeData}
      listUnit={SelectUnitData}
      enumJobForms={SelectJobFormsData}
      enumType={enumType}
      enumWarranty={enumWarranty}
      submitForm={submitForm}
      handleAddNewUnit={handleAddNewUnit}
      handleSubtractUnit={handleSubtractUnit}
      unitData={unitData}
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
});
const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("externalServiceForm"));
  },
  handleAutoPopulateEmployee: (employeeId, indexEmployee) => {
    const arrVal = employeeId.split("|");
    ExternalServiceActions.setAutoPopulateEmployee(arrVal[0], indexEmployee);
  },
  handleAutoPopulateCustomer: (customerId) => {
    const arrVal = customerId.split("|");
    ExternalServiceActions.setAutoPopulateCustomer(arrVal[0]);
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
