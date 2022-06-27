import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormUnitModel, validateUnitSerialNumberForm } from "../../../../app/validateForm";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import * as UnitSerialNumberActions from "../../Store/UnitSerialNumberActions";
import ModalUnitSerialNumberComponent from "../../Component/UnitSerialNumber/ModalUnitSerialNumberComponent";

const ModalUnitSerialNumber = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    units: { formStatus, selectedUnitsData },
    customers: { listCustomersDropdown },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const SelectCustomerData = [];
  listCustomersDropdown.map((item, index) => {
    SelectCustomerData.push({
      id: `customer-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  return (
    <ModalUnitSerialNumberComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      selectedUnitsData={selectedUnitsData}
      enumCustomer={SelectCustomerData}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  units: state.units,
  component: state.component,
  customers: state.customers,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    UnitSerialNumberActions.saveUnitSerialNumberRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUnitSerialNumber);

export default reduxForm({
  form: "editUnitSerialNumberForm",
  validate: validateUnitSerialNumberForm,
})(EnhanceContainer);
