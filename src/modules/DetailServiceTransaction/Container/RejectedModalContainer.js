import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormRejected, validateFormRoles } from "../../../app/validateForm";
import * as DetailServiceTransactionActions from "../Store/DetailServiceTransactionAction";
import RejectedModalComponent from "../Component/RejectedModalComponent";

const RejectedModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    detailService: { rejectionsModal },
    services: { selectedJobService },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      handleSubmitForm(selectedJobService.id, values);
    } else {
    }
  };

  return (
    <RejectedModalComponent
      isModalVisible={rejectionsModal}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formName={"Alasan Reject"}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  branch: state.branch,
  detailService: state.detailService,
  masters: state.masters,
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () =>
    dispatch(DetailServiceTransactionActions.setRejectionsModal(false)),

  handleSubmitForm: (jobId, values) => {
    DetailServiceTransactionActions.handlePressRejectedRequested(jobId, values);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RejectedModalContainer);

export default reduxForm({
  form: "editRejecetdForm",
  validate: validateFormRejected,
})(EnhanceContainer);
