import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import InternalServiceComponent from "../Component/InternalServiceComponent";
import * as validateForm from "../../../app/validateForm";
import * as CustomerActions from "../../Customers/Store/CustomersActions";
import * as EmployeeActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import * as InternalServiceActions from "../Store/InternalServiceActions";

const InternalServiceContainer = (props) => {
  const {
    valid,
    customers: { listCustomers },
    employees: { listEmployees },
    resetForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      InternalServiceActions.handleSubmitForm(values);
    } else {
    }
  };

  React.useEffect(() => {
    CustomerActions.loadCustomerListData();
    EmployeeActions.loadEmployeeListData();
    MasterDataActions.loadProvinceListData();
    return () => {
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

  return (
    <InternalServiceComponent
      listCustomers={SelectCustomerData}
      listEmployee={SelectEmployeeData}
      enumType={enumType}
      submitForm={submitForm}
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
)(InternalServiceContainer);

export default reduxForm({
  form: "internalServiceForm",
  validate: validateForm.validateFormInternalService,
})(EnhanceContainer);
