import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as EmployeesActions from "../../Employees/Store/EmployeesActions";
import * as BranchActions from "../../Branch/Store/BranchActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import EmployeeEditComponent from "../Component/EmployeeEditComponent";
import { navigate } from "../../../app/Helpers";

const EmployeeEditContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    roles: { listRoles },
    branch: { listBranch },
    employees: { formStatus, selectedEmployeeData },
    masters: { listProvince },
    getDetailEmployee,
    setAutoPopulateEmployee,
  } = props;

  React.useEffect(() => {
    setAutoPopulateEmployee();
    BranchActions.getBranchListDataRequested();
    MasterDataActions.loadProvinceListData();
  }, []);

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
    } else {
    }
  };

  const handleUploadPhoto = (info) => {
    let fileList = [...info.fileList];
    // Accept 5 files only
    fileList = fileList.slice(-5);
    fileList.forEach(function (file, index) {
      let reader = new FileReader();
      reader.onload = (e) => {
        file.base64 = e.target.result;
      };
      reader.readAsDataURL(file.originFileObj);
    });
    // this.setState({ fileList });
    console.log("=== file : ", fileList[0]);
  };

  const SelectEmployeeRole = [];
  listRoles.map((item, index) => {
    SelectEmployeeRole.push({
      id: `role-${index}`,
      value: item.id,
      label: item.description,
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

  const SelectProvince = [];
  listProvince.map((item, index) => {
    SelectProvince.push({
      id: `province-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  return (
    <EmployeeEditComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      enumBranch={SelectBranch}
      enumRole={SelectEmployeeRole}
      enumProvince={SelectProvince}
      detailEmployee={selectedEmployeeData}
      handleUploadPhoto={handleUploadPhoto}
      formStatus={formStatus}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  roles: state.roles,
  component: state.component,
  employees: state.employees,
  branch: state.branch,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  getDetailEmployee: async (employeeId) =>
    await EmployeesActions.getEmployeeDataByIdRequested(employeeId),
  setAutoPopulateEmployee: () => EmployeesActions.setAutoPopulateEmployee(),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEditContainer);

export default reduxForm({
  form: "editEmployeeForm",
})(EnhanceContainer);
