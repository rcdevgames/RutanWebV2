import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormTransaction } from "../../../app/validateForm";
import * as DetailServiceTransactionAction from "../Store/DetailServiceTransactionAction";
import EditModalTransactionComponent from "../Component/EditModalTransactionComponent";

const RolesEditModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    detailService: { editTransactionModal },
    masters: { listMenu },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      // handleSubmitForm("edit", values, menuSelected);
      DetailServiceTransactionAction.handlePressEditRequested(values);
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

  return (
    <EditModalTransactionComponent
      isModalVisible={editTransactionModal}
      handleCancel={handleCancel}
      submitForm={submitForm}
      enumMenu={SelectMenu}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  roles: state.roles,
  component: state.component,
  masters: state.masters,
  detailService: state.detailService,
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () =>
    dispatch(DetailServiceTransactionAction.setEditTransactionModal(false)),
  handleClearModalContent: () => {
    // dispatch(DetailServiceTransactionAction.setSelectedRoleMenu([]));
  },
  handleSubmitForm: (type, values, menuSelected) => {},
  // DetailServiceTransactionAction.saveRoleRequested(
  //   type,
  //   values,
  //   menuSelected
  // ),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEditModalContainer);

export default reduxForm({
  form: "editTransactionForm",
  validate: validateFormTransaction,
})(EnhanceContainer);
