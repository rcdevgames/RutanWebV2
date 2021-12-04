import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import ExternalServiceComponent from "../Component/ExternalServiceComponent";
import * as validateForm from "../../../app/validateForm";
import * as CustomerActions from "../../Customers/Store/CustomersActions";
import * as EmployeeActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import * as InternalServiceActions from "../Store/ExternalServiceActions";

const ExternalServiceContainer = (props) => {
  const [unitQty, setUnitQty] = React.useState(1);
  const [unitData, setUnitData] = React.useState([]);

  const {
    valid,
    customers: { listCustomers },
    employees: { listEmployees },
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

  const enumType = [
    { id: `enum-type-1`, value: "T1", label: "Repair" },
    { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
  ];

  React.useEffect(() => {
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
      enumType={enumType}
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
});
const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("internalServiceForm"));
  },
  handleAutoPopulateEmployee: (employeeId) => {
    const arrVal = employeeId.split("|");
    InternalServiceActions.setAutoPopulateEmployee(arrVal[0]);
  },
  handleAutoPopulateCustomer: (customerId) => {
    const arrVal = customerId.split("|");
    InternalServiceActions.setAutoPopulateCustomer(arrVal[0]);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalServiceContainer);

export default reduxForm({
  form: "externalServiceForm",
  validate: validateForm.validateFormInternalService,
})(EnhanceContainer);
