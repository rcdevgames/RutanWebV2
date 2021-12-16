import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormRoles } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as RolesActions from "../../Roles/Store/RolesActions";
import RolesEditModalComponent from "../Component/RolesEditModalComponent";

const RolesEditModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    roles: { formStatus },
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
    <RolesEditModalComponent
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
  roles: state.roles,
  component: state.component,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    RolesActions.saveRoleRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEditModalContainer);

export default reduxForm({
  form: "editRolesForm",
  validate: validateFormRoles,
})(EnhanceContainer);
