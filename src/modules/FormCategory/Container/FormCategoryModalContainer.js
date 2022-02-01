import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormCategory } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as FormCategoryActions from "../Store/FormCategoryActions";
import BranchModalComponent from "../Component/FormCategoryModalComponent";

const FormCategoryModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    branch: { formStatus },
    masters: { listMenu },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      handleSubmitForm(formStatus, values);
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
  handleSubmitForm: (type, values) =>
    FormCategoryActions.saveFormCategoryRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCategoryModalContainer);

export default reduxForm({
  form: "editFormCategory",
  validate: validateFormCategory,
})(EnhanceContainer);
