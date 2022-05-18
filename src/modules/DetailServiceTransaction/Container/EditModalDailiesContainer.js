import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormTransaction } from "../../../app/validateForm";
import * as DetailServiceTransactionAction from "../Store/DetailServiceTransactionAction";

import EditModalDailiesComponent from "../Component/EditModalDailiesComponent";

const EditModalDailiesContainer = (props) => {
  const {
    valid,
    handleCancel,
    detailService: { editDailiesModal },
    masters: { listMenu },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      DetailServiceTransactionAction.handlePressEditDailiesRequested(values);
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
    <EditModalDailiesComponent
      isModalVisible={editDailiesModal}
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
    dispatch(DetailServiceTransactionAction.setEditDailiesModal(false)),
  handleClearModalContent: () => {
    // dispatch(DetailServiceTransactionAction.setSelectedRoleMenu([]));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModalDailiesContainer);

export default reduxForm({
  form: "editDailiesForm",
  validate: validateFormTransaction,
})(EnhanceContainer);
