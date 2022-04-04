import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateDivisionForm } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as DivisionActions from "../Store/DivisionActions";
import DivisionModalComponent from "../Component/DivisionModalComponent";
import { enumSelectGenerator } from "../../../app/Helpers";

const DivisionModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    division: { formStatus },
    masters: { listMenu },
    employees: { listEmployees },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const SelectEmployees = enumSelectGenerator(listEmployees, "employee");

  return (
    <DivisionModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      enumHeadDivision={SelectEmployees}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  division: state.division,
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleClearModalContent: () => {
    DivisionActions.resetForm();
  },
  handleSubmitForm: (type, values) =>
    DivisionActions.saveDivisionRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionModalContainer);

export default reduxForm({
  form: "editDivisionForm",
  validate: validateDivisionForm,
})(EnhanceContainer);
