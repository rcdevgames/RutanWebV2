import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import InternalServiceComponent from "../Component/InternalServiceComponent";
import * as validateForm from "../../../app/validateForm";
import * as CustomerActions from "../../Customers/Store/CustomersActions";

const InternalServiceContainer = (props) => {
  const {
    valid,
    customers: { listCustomers },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      // AuthActions.handleSubmitLogin(values);
      console.log("success");
    }
  };

  React.useEffect(() => {
    CustomerActions.loadCustomerListData();
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
  listCustomers.map((item, index) => {
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
      submitForm={submitForm}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  customers: state.customers,
});
const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("internalServiceForm"));
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
