import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormRoles } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as RolesActions from "../../Roles/Store/RolesActions";
import RolesEditModalComponent from "../Component/RolesEditModalComponent";

const RolesEditModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    roles: { formStatus, selectedRoleMenu },
    masters: { listMenu },
    handleSubmitForm,
    handleClearModalContent,
  } = props;
  const [menuSelected, setMenuSelected] = React.useState([]);

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      handleSubmitForm(formStatus, values, menuSelected);
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

  React.useEffect(() => {
    if (isModalVisible === false) {
      handleClearModalContent();
    }
  }, [isModalVisible]);

  const onChangeRoleMenu = (menus) => {
    setMenuSelected(menus);
  };

  return (
    <RolesEditModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      enumMenu={SelectMenu}
      menuChecked={selectedRoleMenu}
      onChangeRoleMenu={onChangeRoleMenu}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  roles: state.roles,
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleClearModalContent: () => {
    dispatch(RolesActions.setSelectedRoleMenu([]));
  },
  handleSubmitForm: (type, values, menuSelected) =>
    RolesActions.saveRoleRequested(type, values, menuSelected),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEditModalContainer);

export default reduxForm({
  form: "editRolesForm",
  validate: validateFormRoles,
})(EnhanceContainer);
