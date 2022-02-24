import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormRoles } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as AdminActions from "../Store/AdminActions";
import AdminModalComponent from "../Component/AdminModalComponent";

const AdminModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    admins: { formStatus },
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

  return (
    <AdminModalComponent
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
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    AdminActions.saveAdminRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminModalContainer);

export default reduxForm({
  form: "editAdminForm",
  validate: validateFormRoles,
})(EnhanceContainer);
