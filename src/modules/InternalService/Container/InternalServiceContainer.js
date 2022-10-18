import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import InternalServiceComponent from "../Component/InternalServiceComponent";
import * as validateForm from "../../../app/validateForm";
import * as CustomerActions from "../../Customers/Store/CustomersActions";
import * as EmployeeActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import * as InternalServiceActions from "../Store/InternalServiceActions";
import * as ComponentAction from "../../App/Store/ComponentAction";
import {
  enumTypeInternalServices,
  isBlockedRoleCustomerView,
} from "../../../app/Helpers";

const InternalServiceContainer = (props) => {
  const {
    valid,
    user: { roles, branchId },
    customers: { listCustomersDropdown },
    employees: { listEmployees },
    component: { isLoadingFormGlobal },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      InternalServiceActions.handleSubmitForm(values);
    } else {
    }
  };

  React.useEffect(() => {
    // Reset all form data and loading when first load data
    // resetForm();
    const roleId = roles[0].role_id;
    const isBlockedRole = isBlockedRoleCustomerView(roleId);

    ComponentAction.resetAllGlobalLoadingProcess();
    if (isBlockedRole) {
      CustomerActions.getCustomerListDataByPaging(
        1,
        999999,
        "",
        branchId ?? "",
        true
      );
    } else {
      CustomerActions.getCustomerListDataByPaging(1, 999999, "", "", true);
    }
    EmployeeActions.loadEmployeeListData(1, 999999);
    MasterDataActions.loadProvinceListData();
    // MasterDataActions.loadCityListData();
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

  return (
    <InternalServiceComponent
      listCustomers={SelectCustomerData}
      listEmployee={SelectEmployeeData}
      enumType={enumTypeInternalServices}
      submitForm={submitForm}
      isLoadingFormGlobal={isLoadingFormGlobal}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  customers: state.customers,
  employees: state.employees,
  component: state.component,
  user: state.auth.userDetail,
});
const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("internalServiceForm"));
  },
  handleAutoPopulateEmployee: (employeeId, indexEmployee) => {
    const arrVal = employeeId.split("|");
    if (!employeeId) {
      InternalServiceActions.setAutoPopulateEmployee(
        arrVal[0],
        indexEmployee,
        true
      );
      return;
    }
    InternalServiceActions.setAutoPopulateEmployee(arrVal[0], indexEmployee);
  },
  handleAutoPopulateCustomer: (customerId) => {
    const arrVal = customerId.split("|");
    if (!customerId) {
      InternalServiceActions.setAutoPopulateCustomer(arrVal[0], true);
      return;
    }
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
  initialValues: {
    employees: [],
  },
})(EnhanceContainer);
