import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateDivisionUnitForm } from "../../../../app/validateForm";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import * as DivisionUnitActions from "../../Store/DivisionUnitActions";
import { enumSelectGenerator } from "../../../../app/Helpers";
import DivisionUnitModalComponent from "../../Component/DivisionUnit/DivisionUnitModalComponent";

const DivisionUnitModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    divisionUnit: { formStatus, selectedDivisionUnitData },
    units: { listUnits },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const SelectUnits = enumSelectGenerator(listUnits, "unit");

  return (
    <DivisionUnitModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      selectedDivisionUnitData={selectedDivisionUnitData}
      enumUnits={SelectUnits}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  units: state.units,
  component: state.component,
  divisionUnit: state.divisionUnit,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    DivisionUnitActions.saveDivisionUnitRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionUnitModalContainer);

export default reduxForm({
  form: "editDivisionUnitForm",
  validate: validateDivisionUnitForm,
})(EnhanceContainer);
