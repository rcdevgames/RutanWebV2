import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import * as MonitoringEmployeeActions from "../Store/MonitoringEmployeeActions";
import * as BranchActions from "../../Branch/Store/BranchActions";
import { store } from "../../../app/ConfigureStore";
import { enumTypeMonitoringEmployee } from "../../../app/Helpers";
import MonitoringEmployeeComponent from "../Component/MonitoringEmployeeComponent";
import Text from "antd/lib/typography/Text";
import { Tag } from "antd";
import { exportMonitoringEmployeePdf } from "../Store/MonitoringEmployeeReport";
import moment from "moment";

const MonitoringEmployeeContainer = (props) => {
  const {
    getListMonitoringEmployee,
    handlePressAddNew,
    monitoringEmployee: { listMonitoringEmployee, paging },
    branch: { listBranchDropdown },
    monitoringEmployeeFormValues,
  } = props;

  const { page, limit, totalPage } = paging;

  if (listMonitoringEmployee.length > 0) {
    listMonitoringEmployee.map((item, index) => {
      listMonitoringEmployee[index] = {
        ...item,
        no: index + 1,
      };
    });
  }

  const printedData = {
    listMonitoringEmployee,
    from: moment(),
    until: moment(),
  };

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "7%",
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
      title: "Nik",
      dataIndex: "employee_nik",
      key: "employee_nik",
      width: "20%",
      sorter: (a, b) => a.employee_nik.length - b.employee_nik.length,
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
      render: (jobType) => {
        let color = jobType === "loss" ? "#f50" : "#f50";
        return (
          <Tag style={{ width: 115, textAlign: "center" }} color={color}>
            {jobType ? jobType.toUpperCase() : "-"}
          </Tag>
        );
      },
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
      render: (units) =>
        units.map((unit) => (
          <Text>
            {unit.unit_name}
            {units.length <= 1 ? "" : ", "}
          </Text>
        )),
      key: "unit_models",
      width: "30%",
    },
    {
      title: "Model",
      dataIndex: "units",
      render: (units) =>
        units.map((unit) => (
          <Text>
            {unit.unit_model_name}
            {units.length <= 1 ? "" : ", "}
          </Text>
        )),
      key: "unit_models",
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

  const SelectBranch = [];
  listBranchDropdown.map((item, index) => {
    SelectBranch.push({
      id: `branch-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  React.useEffect(() => {
    getListMonitoringEmployee(page, limit);
    BranchActions.getBranchListDataRequested(1, 99999, "", true);
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

  const onSearch = () => {
    MonitoringEmployeeActions.handleSearch(monitoringEmployeeFormValues);
  };

  const handlePressGeneratePdf = () => {
    exportMonitoringEmployeePdf(printedData, monitoringEmployeeFormValues);
  };

  return (
    <MonitoringEmployeeComponent
      headers={headers}
      listMonitoringEmployee={listMonitoringEmployee}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      paging={paging}
      enumTypeReport={enumTypeMonitoringEmployee}
      enumBranch={SelectBranch}
      onSearch={onSearch}
      handlePressGeneratePdf={handlePressGeneratePdf}
      // onShowSizeChange={onShowSizeChange}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  monitoringEmployee: state.monitoringEmployee,
  branch: state.branch,
  monitoringEmployeeFormValues: getFormValues("monitoringEmployeeForm")(state),
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
