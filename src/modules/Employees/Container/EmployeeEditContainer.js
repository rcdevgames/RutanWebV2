import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as EmployeesActions from "../../Employees/Store/EmployeesActions";
import EmployeeEditComponent from "../Component/EmployeeEditComponent";

const EmployeeEditContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    roles: { listRoles },
    employees: { selectedEmployeeId, selectedEmployeeData },
    getDetailEmployee,
    setAutoPopulateEmployee,
  } = props;

  React.useEffect(() => {
    getDetailEmployee(selectedEmployeeId);
    setAutoPopulateEmployee();
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
      detailEmployee={selectedEmployeeData}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  roles: state.roles,
  component: state.component,
  employees: state.employees,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  getDetailEmployee: (employeeId) =>
    EmployeesActions.getEmployeeDataByIdRequested(employeeId),
  setAutoPopulateEmployee: () => EmployeesActions.setAutoPopulateEmployee(),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEditContainer);

export default reduxForm({
  form: "editEmployeeForm",
})(EnhanceContainer);
