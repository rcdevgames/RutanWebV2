import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as MonitoringEmployeeActions from "../Store/MonitoringEmployeeActions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { store } from "../../../app/ConfigureStore";
import { getIndex } from "../../../app/Helpers";
import MonitoringEmployeeComponent from "../Component/MonitoringEmployeeComponent";

const MonitoringEmployeeContainer = (props) => {
  const {
    getListMonitoringEmployee,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    monitoringEmployee: { listMonitoringEmployee, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Tanggal",
      dataIndex: "jd_date",
      key: "jd_date",
      width: "20%",
      sorter: (a, b) => a.jd_date.length - b.jd_date.length,
    },
    {
      title: "Nama Karyawan",
      dataIndex: "employee_name",
      key: "employee_name",
      width: "30%",
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
    },
    {
      title: "Cabang",
      dataIndex: "branch_name",
      key: "branch_name",
      width: "30%",
      sorter: (a, b) => a.branch_name.length - b.branch_name.length,
    },
    {
      title: "Tipe",
      dataIndex: "job_type",
      key: "job_type",
      width: "30%",
      sorter: (a, b) => a.job_type.length - b.job_type.length,
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "30%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Unit",
      dataIndex: "units",
      key: "units",
      width: "30%",
      sorter: (a, b) => a.units.length - b.units.length,
    },
    {
      title: "Model",
      dataIndex: "models",
      key: "models",
      width: "30%",
      sorter: (a, b) => a.models.length - b.models.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      sorter: (a, b) => a.status.length - b.status.length,
    },
  ];

  React.useEffect(() => {
    getListMonitoringEmployee(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(
      MonitoringEmployeeActions.setPagingMonitoringEmployee(paging)
    );
    getListMonitoringEmployee(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListMonitoringEmployee(page, limit, val);
  };

  return (
    <MonitoringEmployeeComponent
      headers={headers}
      listMonitoringEmployee={listMonitoringEmployee}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      paging={paging}
      onSearch={onSearch}
      // onShowSizeChange={onShowSizeChange}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  monitoringEmployee: state.monitoringEmployee,
});
const mapDispatchToProps = (dispatch) => ({
  getListMonitoringEmployee: (page, limit, keyword, type, from, until) =>
    MonitoringEmployeeActions.getMonitoringEmployeeListDataRequested(
      page,
      limit,
      keyword,
      type,
      from,
      until
    ),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitoringEmployeeContainer);

export default reduxForm({
  form: "monitoringEmployeeForm",
})(EnhanceContainer);
