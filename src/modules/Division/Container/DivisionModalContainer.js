import React from "react";
import { connect } from "react-redux";
import { change, reduxForm } from "redux-form";
import { validateFormUnit } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as DivisionActions from "../Store/DivisionActions";
import { store } from "../../../app/ConfigureStore";
import DivisionModalComponent from "../Component/DivisionModalComponent";

const DivisionModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    units: { formStatus, selectedUnitsData },
    masters: { listMenu },
    handleSubmitForm,
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

  const handleUploadPhoto = (base64) => {
    store.dispatch(change("editUnitForm", `imageUrl`, base64 ?? ""));
  };

  return (
    <DivisionModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      handleUploadPhoto={handleUploadPhoto}
      selectedUnitsData={selectedUnitsData}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  units: state.units,
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleClearModalContent: () => {
    DivisionActions.resetForm();
  },
  handleSubmitForm: (type, values) =>
    DivisionActions.saveUnitRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionModalContainer);

export default reduxForm({
  form: "editUnitForm",
  validate: validateFormUnit,
})(EnhanceContainer);
