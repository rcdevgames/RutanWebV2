import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import * as WorkingHoursActions from "../Store/WorkingHoursActions";
import * as BranchActions from "../../Branch/Store/BranchActions";
import { store } from "../../../app/ConfigureStore";
import {
  enumTypeMonitoringEmployee,
  getStatusWorkingHours,
} from "../../../app/Helpers";
import { Tag, Typography } from "antd";
import WorkingHoursComponent from "../Component/WorkingHoursComponent";
import { exportWorkingHoursReportPdf } from "../Store/WorkingHoursReport";
import moment from "moment";

const WorkingHoursContainer = (props) => {
  const {
    getListWorkingHours,
    handlePressAddNew,
    workingHours: { listWorkingHours, paging },
    branch: { listBranchDropdown },
    workingHoursFormValues,
  } = props;

  const { page, limit, totalPage } = paging;

  const printedData = {
    listWorkingHours,
    from: moment(),
    until: moment(),
  };

  if (listWorkingHours.length > 0) {
    listWorkingHours.map((item, index) => {
      listWorkingHours[index] = {
        ...item,
        no: index + 1,
      };
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
      title: "Nama Karyawan",
      dataIndex: "employee_name",
      key: "employee_name",
      width: "30%",
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
    },
    {
      title: "No. Service",
      dataIndex: "no_service",
      key: "no_service",
      width: "20%",
      sorter: (a, b) => a.no_service.length - b.no_service.length,
      render: (no_service) => {
        return (
          <Tag style={{ width: 100, textAlign: "center" }} color={"#f0f0f0"}>
            <Typography style={{ fontWeight: "bold" }}>
              {no_service ? `${no_service}` : "-"}
            </Typography>
          </Tag>
        );
      },
    },
    {
      title: "Nik",
      dataIndex: "employee_nik",
      key: "employee_nik",
      width: "20%",
      sorter: (a, b) => a.employee_nik.length - b.employee_nik.length,
    },
    {
      title: "Nama Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "30%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created",
      key: "created",
      width: "30%",
      sorter: (a, b) => a.created.length - b.created.length,
    },
    {
      title: "Jam Kerja",
      dataIndex: "total_hours",
      key: "total_hours",
      render: (total_hours) => {
        return (
          <Tag style={{ width: 80, textAlign: "center" }} color={"#1890ff"}>
            {total_hours ? `${total_hours} Jam` : "-"}
          </Tag>
        );
      },
      width: "30%",
      sorter: (a, b) => a.total_hours - b.total_hours,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      sorter: (a, b) => a.status.length - b.status.length,
      render: (status) => {
        let color = getStatusWorkingHours(status).color;
        return (
          <Tag style={{ width: 112, textAlign: "center" }} color={color}>
            {status ? getStatusWorkingHours(status).value : "-"}
          </Tag>
        );
      },
    },
    {
      title: "Tanggal Selesai",
      dataIndex: "done",
      key: "done",
      width: "30%",
      sorter: (a, b) => a.done.length - b.done.length,
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
    getListWorkingHours(page, limit);
    BranchActions.getBranchListDataRequested(1, 99999, "", true);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(
      WorkingHoursActions.setPagingMonitoringEmployee(paging)
    );
    getListWorkingHours(nextPage, pageSize);
  };

  const onSearch = () => {
    WorkingHoursActions.handleSearch(workingHoursFormValues);
  };

  const handlePressGeneratePdf = () => {
    exportWorkingHoursReportPdf(printedData, workingHoursFormValues);
  };

  return (
    <WorkingHoursComponent
      headers={headers}
      listMonitoringEmployee={listWorkingHours}
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
  workingHours: state.workingHours,
  branch: state.branch,
  workingHoursFormValues: getFormValues("workingHoursForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getListWorkingHours: (page, limit, from, until, keyword) =>
    WorkingHoursActions.getWorkingHoursListDataRequested(
      page,
      limit,
      keyword,
      from,
      until
    ),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkingHoursContainer);

export default reduxForm({
  form: "workingHoursForm",
})(EnhanceContainer);
