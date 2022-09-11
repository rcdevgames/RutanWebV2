import React from "react";
import { connect } from "react-redux";
import { change, getFormValues, reduxForm } from "redux-form";
import { validateFormEditMedia } from "../../../app/validateForm";
import * as DetailServiceTransactionAction from "../Store/DetailServiceTransactionAction";

import InsertImageModalComponent from "../Component/InsertImageModalComponent";
import { store } from "../../../app/ConfigureStore";
import { showToast } from "../../Roles/Store/RolesActions";

const InsertImageModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    detailService: { insertMediaModal },
    formValues,
    services: { selectedJobService },
  } = props;

  const submitForm = (values) => {
    if (valid && formValues.imageUrl) {
      DetailServiceTransactionAction.handlePressInsertMediaRequested(values);
    } else {
      showToast("Harap lengkapi form!", "error");
    }
  };

  const SelectUnit = [];
  if (selectedJobService.units && selectedJobService.units.length > 0) {
    selectedJobService.units.map((item, index) => {
      SelectUnit.push({
        id: `unit-${index}`,
        value: item.id,
        label: item.unit_name,
      });
    });
  }

  const handleUploadPhoto = (base64) => {
    store.dispatch(change("editMediaForm", `imageUrl`, base64 ?? ""));
  };

  return (
    <InsertImageModalComponent
      isModalVisible={insertMediaModal}
      handleCancel={handleCancel}
      submitForm={submitForm}
      enumUnit={SelectUnit}
      handleUploadPhoto={handleUploadPhoto}
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
  formValues: getFormValues("editMediaForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () =>
    dispatch(DetailServiceTransactionAction.setInsertMediaModal(false)),
  handleClearModalContent: () => {
    // dispatch(DetailServiceTransactionAction.setSelectedRoleMenu([]));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertImageModalContainer);

export default reduxForm({
  form: "editMediaForm",
  validate: validateFormEditMedia,
})(EnhanceContainer);
