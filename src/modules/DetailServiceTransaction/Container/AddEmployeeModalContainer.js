import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateServiceEmployeeForm } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as DetailServiceTransactionAction from "../Store/DetailServiceTransactionAction";
import AddEmployeeModalComponent from "../Component/AddEmployeeModalComponent";

const AddEmployeeModalContainer = (props) => {
  const {
    handleCancel,
    services: { selectedJobService },
    component: { isModalVisible },
    employees: { listEmployees },
    valid,
  } = props;

  const SelectEmployee = [];
  listEmployees.map((item, index) => {
    SelectEmployee.push({
      id: `employee-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      const employee = values.employee.split("|");
      DetailServiceTransactionAction.handleAddNewEmployeeService(
        selectedJobService.id,
        employee[0]
      );
    } else {
    }
  };

  return (
    <AddEmployeeModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      enumEmployee={SelectEmployee}
      submitForm={submitForm}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  component: state.component,
  masters: state.masters,
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmployeeModalContainer);

export default reduxForm({
  form: "serviceEmployeeForm",
  validate: validateServiceEmployeeForm,
})(EnhanceContainer);
