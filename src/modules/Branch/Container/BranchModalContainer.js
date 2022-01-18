import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormRoles } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as RolesActions from "../../Roles/Store/RolesActions";
import * as BranchActions from "../Store/BranchActions";
import BranchModalComponent from "../Component/BranchModalComponent";

const BranchModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    branch: { formStatus },
    masters: { listMenu },
    handleSubmitForm,
    handleClearModalContent,
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
      id: `role-${index}`,
      value: item.id,
      label: item.menu,
    });
  });

  React.useEffect(() => {
    if (isModalVisible === false) {
      handleClearModalContent();
    }
  }, [isModalVisible]);

  return (
    <BranchModalComponent
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
  branch: state.branch,
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleClearModalContent: () => {
    dispatch(RolesActions.setSelectedRoleMenu([]));
  },
  handleSubmitForm: (type, values) =>
    BranchActions.saveBranchRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchModalContainer);

export default reduxForm({
  form: "editBranchForm",
  validate: validateFormRoles,
})(EnhanceContainer);
