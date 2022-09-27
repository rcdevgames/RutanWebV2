import React from "react";
import { connect } from "react-redux";
import { change, getFormValues, reduxForm } from "redux-form";
import { validateDailiesForm } from "../../../app/validateForm";
import * as DetailServiceTransactionAction from "../Store/DetailServiceTransactionAction";

import EditModalDailiesComponent from "../Component/EditModalDailiesComponent";

const EditModalDailiesContainer = (props) => {
  const {
    valid,
    handleCancel,
    detailService: { editDailiesModal, typeFormDailies },
    masters: { listMenu },
    setTimeDailiesForm,
    editDailiesFormValues,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      DetailServiceTransactionAction.handlePressEditDailiesRequested(values);
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

  const handleChangeTimePicker = (time) => {
    setTimeDailiesForm(time);
  };

  return (
    <EditModalDailiesComponent
      isModalVisible={editDailiesModal}
      handleCancel={handleCancel}
      submitForm={submitForm}
      enumMenu={SelectMenu}
      typeFormDailies={typeFormDailies}
      handleChangeTimePicker={handleChangeTimePicker}
      timeStartEnd={
        editDailiesFormValues && editDailiesFormValues.timeStartEnd 
          ? editDailiesFormValues.timeStartEnd
          : ["", ""]
      }
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
  editDailiesFormValues: getFormValues("editDailiesForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () =>
    dispatch(DetailServiceTransactionAction.setEditDailiesModal(false)),
  handleClearModalContent: () => {
    // dispatch(DetailServiceTransactionAction.setSelectedRoleMenu([]));
  },
  setTimeDailiesForm: (time) => {
    dispatch(change("editDailiesForm", "timeStartEnd", time ?? ""));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModalDailiesContainer);

export default reduxForm({
  form: "editDailiesForm",
  validate: validateDailiesForm,
})(EnhanceContainer);
