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
import { getIndex, navigate } from "../../../app/Helpers";
import { store } from "../../../app/ConfigureStore";

const EmployeesListContainer = (props) => {
  const {
    getListEmployees,
    handlePressEdit,
    handlePressDelete,
    employees: { listEmployees, paging },
  } = props;
  const { page, limit, totalPage } = paging;

  if (listEmployees.length > 0) {
    listEmployees.map((item, index) => {
      listEmployees[index] = { ...item, no: getIndex(page, limit)[index] };
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
      sorter: (a, b) => a.nik - b.nik,
    },
    {
      title: "Nama Karyawan",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name - b.name,
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
    getListEmployees(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize ;
    paging.totalPage = totalPage;
    await store.dispatch(EmployeeActions.setPagingEmployees(paging));
    getListEmployees(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListEmployees(page, limit, val);
  };

  return (
    <EmployeesListComponent
      headers={headers}
      listEmployees={listEmployees}
      renderActionTable={renderActionTable}
      paging={paging}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
});
const mapDispatchToProps = (dispatch) => ({
  getListEmployees: (page, limit, keyword) =>
    EmployeeActions.loadEmployeeListData(page, limit, keyword),
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
    EmployeesActions.resetForm();
    setTimeout(() => {
      navigate("/edit-employee");
    }, 500);
  },
  handlePressDelete: async (employeeId) => {
    await dispatch(EmployeesActions.setSelectedEmployeeId(employeeId));
    EmployeesActions.deleteEmployeeRequested(employeeId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesListContainer);

export default reduxForm({
  form: "employeesForm",
})(EnhanceContainer);
