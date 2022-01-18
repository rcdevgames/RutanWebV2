import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormRoles } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as IdentificationActions from "../Store/IdentificationActions";
import IdentificationModalComponent from "../Component/IdentificationModalComponent";
import {
  SelectLocation,
  SelectMilling,
  SelectType,
} from "../../../app/Helpers";

const IdentificationModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    identification: { formStatus },
    handleSubmitForm,
    customers: { listCustomers },
    branch: { listBranch },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const SelectCustomer = [];
  listCustomers.map((item, index) => {
    SelectCustomer.push({
      id: `customer-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const SelectBranch = [];
  listBranch.map((item, index) => {
    SelectBranch.push({
      id: `branch-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  return (
    <IdentificationModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      enumCustomers={SelectCustomer}
      enumType={SelectType}
      enumBranch={SelectBranch}
      enumLocation={SelectLocation}
      enumMilling={SelectMilling}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  identification: state.identification,
  component: state.component,
  masters: state.masters,
  customers: state.customers,
  branch: state.branch,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    IdentificationActions.saveIdentificationRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentificationModalContainer);

export default reduxForm({
  form: "editIdentificationhForm",
  validate: validateFormRoles,
})(EnhanceContainer);
