import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormUnitModel } from "../../../../app/validateForm";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import * as EmployeeToolsActions from "../../Store/EmployeeTools/EmployeeToolsActions";
import EmployeeToolsModalComponent from "../../Component/EmployeeTools/EmployeeToolsModalComponent";
import { enumSelectGenerator } from "../../../../app/Helpers";

const EmployeeToolsModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    employeeTools: { formStatus },
    tools: { listTools },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const SelectTools = enumSelectGenerator(listTools);

  return (
    <EmployeeToolsModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      enumTools={SelectTools}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  tools: state.tools,
  employeeTools: state.employeeTools,
  component: state.component,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    EmployeeToolsActions.saveEmployeeToolsRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeToolsModalContainer);

export default reduxForm({
  form: "editEmployeeToolsForm",
  validate: validateFormUnitModel,
})(EnhanceContainer);
