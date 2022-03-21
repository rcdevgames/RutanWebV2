import React from "react";
import { connect } from "react-redux";
import { change, reduxForm } from "redux-form";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as EmployeesActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import EmployeeEditComponent from "../Component/EmployeeEditComponent";
import { validateFormEmployee } from "../../../app/validateForm";
import { store } from "../../../app/ConfigureStore";

const EmployeeEditContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    roles: { listRoles },
    branch: { listBranch, paging, keyword },
    employees: { formStatus, selectedEmployeeData, selectedRoleEmployee },
    masters: { listProvince, listCity },
    setAutoPopulateEmployee,
    handleClearSelectedEmployeeRole,
  } = props;
  const [listCityState, setListCityState] = React.useState([]);
  const [roleSelected, setRoleSelected] = React.useState([]);
  const [defaultImage, setDefaultImage] = React.useState("");
  const { page, limit } = paging;

  // React.useEffect(() => {
  //   setAutoPopulateEmployee();
  //   BranchActions.getBranchListDataRequested(page, limit, keyword);
  //   MasterDataActions.loadProvinceListData();
  // }, []);

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      EmployeesActions.saveEmployeeRequested(formStatus, values, roleSelected);
    } else {
    }
  };

  const handleUploadPhoto = (base64) => {
    store.dispatch(change("editEmployeeForm", `imageUrl`, base64 ?? ""));
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

  React.useEffect(() => {
    let subItem = [];
    listCity.map((item, index) => {
      subItem.push({
        id: `city-${index}`,
        value: item.id,
        label: item.name,
      });
    });
    setListCityState(subItem);
    // Mapping detail data employee when edit
    if (formStatus === "edit") {
      MasterDataActions.loadCityListData(selectedEmployeeData.province_id);
      EmployeesActions.mapDetailEmployeeToForm();
      // convert image url to base64
      setDefaultImage(selectedEmployeeData.photo);
    }
    return () => {
      handleClearSelectedEmployeeRole();
    };
  }, []);

  const onChangeRoleEmployee = (menus) => {
    setRoleSelected(menus);
  };

  return (
    <EmployeeEditComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      enumBranch={SelectBranch}
      enumRole={SelectEmployeeRole}
      enumProvince={SelectProvince}
      enumCity={listCityState}
      detailEmployee={selectedEmployeeData}
      handleUploadPhoto={handleUploadPhoto}
      formStatus={formStatus}
      selectedRoleEmployee={selectedRoleEmployee}
      onChangeRoleEmployee={onChangeRoleEmployee}
      defaultImage={defaultImage}
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
  handleClearSelectedEmployeeRole: () => {
    dispatch(EmployeesActions.setSelectedRoleEmployee([]));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEditContainer);

export default reduxForm({
  form: "editEmployeeForm",
  validate: validateFormEmployee,
})(EnhanceContainer);
