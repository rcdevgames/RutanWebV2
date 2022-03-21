import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as EmployeeActions from "../Store/EmployeesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as EmployeesActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import EmployeesListComponent from "../Component/EmployeesListComponent";
import { navigate } from "../../../app/Helpers";

const EmployeesListContainer = (props) => {
  const {
    getListEmployees,
    handlePressEdit,
    handlePressDelete,
    employees: { listEmployees },
  } = props;

  if (listEmployees.length > 0) {
    listEmployees.map((item, index) => {
      listEmployees[index] = { ...item, no: index + 1 };
    });
  }

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Nik",
      dataIndex: "nik",
      key: "nik",
      width: "20%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Nama Karyawan",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Nomor Telepon",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
      sorter: (a, b) => a.no - b.no,
    },
  ];

  const renderActionTable = (text, record) => (
    <Space size="middle">
      <CButtonAntd
        onClick={() => handlePressEdit(record)}
        type="primary"
        icon={<EditOutlined />}
        size="middle"
      />
      <CButtonAntd
        onClick={() => handlePressDelete(record.id)}
        type="primary"
        icon={<DeleteOutlined />}
        size="middle"
        danger
      />
    </Space>
  );

  React.useEffect(() => {
    getListEmployees();
  }, []);

  return (
    <EmployeesListComponent
      headers={headers}
      listEmployees={listEmployees}
      renderActionTable={renderActionTable}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
});
const mapDispatchToProps = (dispatch) => ({
  getListEmployees: () => EmployeeActions.loadEmployeeListData(),
  handlePressEdit: async (employee) => {
    dispatch(ComponentActions.setGlobalLoading(true));
    dispatch(EmployeeActions.setFormStatus("edit"));
    await EmployeesActions.getRolesByEmployeeId(employee.id);
    await MasterDataActions.loadCityListData(employee.province_id);
    await dispatch(EmployeeActions.setSelectedEmployeeId(employee.id));
    await EmployeesActions.getEmployeeDataByIdRequested(employee.id);
    setTimeout(() => {
      navigate("/edit-employee");
      dispatch(ComponentActions.setGlobalLoading(false));
    }, 500);
  },
  handlePressAddNew: async () => {
    dispatch(EmployeesActions.setFormStatus("add"));
    await dispatch(EmployeesActions.setSelectedEmployeeId(""));
    await dispatch(EmployeesActions.setSelectedEmployeeData({}));
    setTimeout(() => {
      navigate("/edit-employee");
    }, 500);
  },
  //   handlePressDelete: async (roleId) => {
  //     await dispatch(RolesActions.setSelectedRoleId(roleId));
  //     RolesActions.deleteRoleRequested(roleId);
  //   },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesListContainer);

export default reduxForm({
  form: "employeesForm",
})(EnhanceContainer);
