import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import * as EmployeeActions from "../Store/EmployeesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as EmployeesActions from "../../Employees/Store/EmployeesActions";
import * as ToolsActions from "../../Tools/Store/ToolsActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import EmployeesListComponent from "../Component/EmployeesListComponent";
import {
  enumSelectGenerator,
  getIndex,
  getRolesEnum,
  navigate,
} from "../../../app/Helpers";
import { store } from "../../../app/ConfigureStore";
import { getDivisionListDataRequested } from "../../Division/Store/DivisionActions";
import { Link } from "react-router-dom";

const EmployeesListContainer = (props) => {
  const {
    getListEmployees,
    handlePressEdit,
    handlePressDelete,
    handlePressEmployeeTools,
    employees: { listEmployees, paging },
    roles: { listRoles },
    branch: { listBranch },
    division: { listDivision },
    employeesFormValues,
    getListTools,
  } = props;
  const { page, limit, totalPage } = paging;

  if (listEmployees.length > 0) {
    listEmployees.map((item, index) => {
      listEmployees[index] = { ...item, no: getIndex(page, limit)[index] };
    });
  }

  if (listDivision.length > 0) {
    listDivision.map((item, index) => {
      listDivision[index] = { ...item, name: item.title };
    });
  }

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "7%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "NIK",
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
      <Link to={"/edit-employee"} onClick={() => handlePressEdit(record)}>
        <CButtonAntd type="primary" icon={<EditOutlined />} size="middle" />
      </Link>
      <Link
        to={"/employee-tools"}
        onClick={() => handlePressEmployeeTools(record)}
      >
        <CButtonAntd type="primary" icon={<SettingOutlined />} size="middle" />
      </Link>
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
    getListEmployees(1, 10);
    getDivisionListDataRequested(1, 100);
    getListTools(1, 99999);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage ?? 1;
    paging.limit = pageSize ?? 10;
    paging.totalPage = totalPage;
    await store.dispatch(EmployeeActions.setPagingEmployees(paging));
    getListEmployees(nextPage, pageSize);
  };

  const onSearch = (keyword) => {
    EmployeeActions.handleSearch(keyword, employeesFormValues);
  };

  const SelectRoles = listRoles.length > 0 ? getRolesEnum(listRoles) : [];
  const SelectBranch =
    listBranch.length > 0 ? enumSelectGenerator(listBranch, "branch") : [];
  const SelectDivision =
    listDivision.length > 0
      ? enumSelectGenerator(listDivision, "division")
      : [];

  return (
    <EmployeesListComponent
      headers={headers}
      listEmployees={listEmployees}
      renderActionTable={renderActionTable}
      paging={paging}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      enumRoles={SelectRoles}
      enumDivision={SelectDivision}
      enumBranch={SelectBranch}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  roles: state.roles,
  branch: state.branch,
  division: state.division,
  employeesFormValues: getFormValues("employeesForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getListEmployees: (page, limit, keyword) =>
    EmployeeActions.loadEmployeeListData(page, limit, keyword),
  getListTools: (page, limit) => {
    ToolsActions.getToolsListDataRequested(page, limit);
  },
  handlePressEdit: async (employee) => {
    dispatch(EmployeesActions.setISEmployeeDataLoaded(false));
    dispatch(EmployeeActions.setFormStatus("edit"));
    await dispatch(EmployeeActions.setSelectedEmployeeId(employee.id));

    const p1 = new Promise((resolve, reject) => {
      EmployeesActions.getRolesByEmployeeId(employee.id).then((res) => {
        resolve();
      });
    });
    const p2 = new Promise((resolve, reject) => {
      MasterDataActions.loadCityListData(employee.province_id).then((res) => {
        resolve();
      });
    });
    const p3 = new Promise((resolve, reject) => {
      EmployeesActions.getEmployeeDataByIdRequested(employee.id).then((res) => {
        resolve();
      });
    });

    Promise.all([p1, p2, p3]).then(() => {
      dispatch(EmployeesActions.setISEmployeeDataLoaded(true));
    });
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
  handlePressEmployeeTools: async (record) => {
    await dispatch(EmployeeActions.setSelectedEmployeeId(record.id));
    await dispatch(EmployeeActions.setSelectedEmployeeData(record));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesListContainer);

export default reduxForm({
  form: "employeesForm",
})(EnhanceContainer);
