import React from "react";
import { connect } from "react-redux";
import { change, getFormValues, reduxForm } from "redux-form";
import { validateFormEditMedia } from "../../../app/validateForm";
import * as DetailServiceTransactionAction from "../Store/DetailServiceTransactionAction";

import InsertImageModalComponent from "../Component/InsertImageModalComponent";
import { store } from "../../../app/ConfigureStore";
import { showToast } from "../../Roles/Store/RolesActions";
import { setGlobalLoading } from "../../App/Store/ComponentAction";

const InsertImageModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    detailService: { insertMediaModal },
    formValues,
    services: { selectedJobService },
  } = props;
  const [isImageLoaded, setIsImageLoaded] = React.useState(null);

  const handleError = () => {
    setIsImageLoaded(false);
    showToast("Harap lengkapi form!", "error");
  };

  const submitForm = (values) => {
    if (valid) {
      if (formValues.imageUrl) {
        setIsImageLoaded(true);
        DetailServiceTransactionAction.handlePressInsertMediaRequested(values);
      } else {
        handleError();
      }
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
      isImageLoaded={isImageLoaded}
      defaultImage={
        formValues && formValues.imageUrl ? formValues.imageUrl : ""
      }
      isExternal={selectedJobService.is_external}
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
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertImageModalContainer);

export default reduxForm({
  form: "editMediaForm",
  validate: validateFormEditMedia,
})(EnhanceContainer);
