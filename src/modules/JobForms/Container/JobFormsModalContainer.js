import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormRoles } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as JobFormsActions from "../Store/JobFormsActions";
import JobFormsModalComponent from "../Component/JobFormsModalComponent";

const JobFormsModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    jobForms: { formStatus },
    masters: { listMenu },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const SelectMenu = [];
  listMenu.map((item, index) => {
    SelectMenu.push({
      id: `job-forms-${index}`,
      value: item.id,
      label: item.menu,
    });
  });

  return (
    <JobFormsModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  jobForms: state.jobForms,
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    JobFormsActions.saveJobFormsRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobFormsModalContainer);

export default reduxForm({
  form: "editJobForms",
  validate: validateFormRoles,
})(EnhanceContainer);
