import React from "react";
import { connect } from "react-redux";
import { change, reduxForm } from "redux-form";
import { store } from "../../../app/ConfigureStore";
import * as ComponentActions from "../../App/Store/ComponentAction";
import EmployeeEditComponent from "../Component/JobFormsComponent";

const EmployeeEditContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    roles: { listRoles },
  } = props;

  React.useEffect(() => {
    // store.dispatch(
    //   change(
    //     "editEmployeeForm",
    //     `role`,
    //     "5771cfb7-8530-4ced-9468-fc38b3602fcf|supervisor"
    //   )
    // );
  }, []);

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
    } else {
    }
  };

  const SelectEmployeeRole = [];
  listRoles.map((item, index) => {
    SelectEmployeeRole.push({
      id: `role-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const enumBranch = [
    { id: `enum-type-1`, value: "T1", label: "Repair" },
    { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
  ];

  return (
    <EmployeeEditComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      enumBranch={enumBranch}
      enumRole={SelectEmployeeRole}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  roles: state.roles,
  component: state.component,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEditContainer);

export default reduxForm({
  form: "editEmployeeForm",
})(EnhanceContainer);
