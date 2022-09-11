import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormTransaction } from "../../../app/validateForm";
import * as DetailServiceTransactionAction from "../Store/DetailServiceTransactionAction";
import EditModalSummaryComponent from "../Component/EditModalSummaryComponent";

const EditModalSummaryContainer = (props) => {
  const {
    valid,
    handleCancel,
    detailService: { editSummaryModal, typeFormDailies },
    masters: { listMenu },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      DetailServiceTransactionAction.handlePressEditSummaryRequested(values);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        
    }
  };

  return (
    <EditModalSummaryComponent
      isModalVisible={editSummaryModal}
      handleCancel={handleCancel}
      submitForm={submitForm}
      enumMenu={SelectMenu}
      typeFormDailies={typeFormDailies}
      handleKeyDown={handleKeyDown}
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
    dispatch(DetailServiceTransactionAction.setEditSummaryModal(false)),
  handleClearModalContent: () => {},
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModalSummaryContainer);

export default reduxForm({
  form: "editSummaryForm",
  validate: validateFormTransaction,
})(EnhanceContainer);
