import React from "react";
import { connect } from "react-redux";
import { change, reduxForm } from "redux-form";
import { validateFormRoles } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as CustomersActions from "../Store/CustomersActions";
import CustomerModalComponent from "../Component/CustomerModalComponent";
import { store } from "../../../app/ConfigureStore";
import Invoke from "../../../app/axios/Invoke";
import { getCitiesEnum } from "../../../app/Helpers";

const CustomerModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    branch: { formStatus, listBranch },
    masters: { listMenu, listProvince },
    handleSubmitForm,
  } = props;
  const [cities, setCities] = React.useState([]);

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
      id: `customer-${index}`,
      value: item.id,
      label: item.menu,
    });
  });

  const SelectProvince = [];
  listProvince.map((item, index) => {
    SelectProvince.push({
      id: `province-${index}`,
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

  const onChangeProvince = async (provinceId) => {
    setCities([]);
    try {
      if (provinceId) {
        const splitProvince = provinceId.split("|");
        const { data } = await Invoke.getCityList(1, 100, splitProvince[0]);
        const provinceMapping = getCitiesEnum(data.callback.data);
        setCities(provinceMapping);
      } else {
        store.dispatch(change("editCustomerForm", `city`, ""));
        setCities([]);
      }
    } catch (error) {
      setCities([]);
      console.log("Error : ", error);
    }
  };

  return (
    <CustomerModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      enumProvince={SelectProvince}
      onChangeProvince={onChangeProvince}
      cities={cities}
      enumBranch={SelectBranch}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  branch: state.branch,
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    CustomersActions.saveCustomerRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerModalContainer);

export default reduxForm({
  form: "editCustomerForm",
  validate: validateFormRoles,
})(EnhanceContainer);
