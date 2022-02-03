import React from "react";
import { connect } from "react-redux";
import { change, reduxForm } from "redux-form";
import { validateFormUnit, validateFormUnitModel } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as UnitModelActions from "../Store/UnitModelActions";
import { store } from "../../../app/ConfigureStore";
import UnitsModelsModalComponent from "../Component/UnitsModelsModalComponent";

const UnitModelsModalContainer = (props) => {
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
    <UnitsModelsModalComponent
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
  handleSubmitForm: (type, values) =>
    UnitModelActions.saveUnitModelsRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitModelsModalContainer);

export default reduxForm({
  form: "editUnitModelForm",
  validate: validateFormUnitModel,
})(EnhanceContainer);
