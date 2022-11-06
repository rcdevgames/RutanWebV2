import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import * as MonitoringEmployeeActions from "../Store/MonitoringEmployeeActions";
import * as BranchActions from "../../Branch/Store/BranchActions";
import { store } from "../../../app/ConfigureStore";
import {
  enumTypeMonitoringEmployee,
  isBlockedRoleCustomerView,
} from "../../../app/Helpers";
import MonitoringEmployeeComponent from "../Component/MonitoringEmployeeComponent";
import Text from "antd/lib/typography/Text";
import { Tag } from "antd";
import { exportMonitoringEmployeePdf } from "../Store/MonitoringEmployeeReport";
import moment from "moment";

const MonitoringEmployeeContainer = (props) => {
  const {
    getListMonitoringEmployee,
    handlePressAddNew,
    user: { roles, branchId },
    monitoringEmployee: { listMonitoringEmployee, paging },
    branch: { listBranchDropdown },
    monitoringEmployeeFormValues,
  } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBlockedRole, setIsBlockedRole] = React.useState(false);
  const [selectBranch, setSelectBranch] = React.useState([]);

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

  const checkBlockedRole = () => {
    const SelectBranch = [];
    const roleId = roles[0].role_id;
    const blocked = isBlockedRoleCustomerView(roleId);

    if (blocked) {
      setIsBlockedRole(blocked);

      if (blocked) {
        // Call API report service only for his own branch
        getListMonitoringEmployee(page, limit, "", "", branchId).then(
          (success) => {
            setIsLoading(false);
          }
        );

        // Set branch only on his own branch if role access is blocked
        const selectedBranch = listBranchDropdown.filter((x) =>
          x.id.includes(branchId)
        );

        // Push to enum dropdown branch reducer
        SelectBranch.push({
          id: `branch-${selectedBranch[0].id}`,
          value: selectedBranch[0].id,
          label: selectedBranch[0].name,
        });
        setSelectBranch(SelectBranch);
      } else {
        // Call API service report for all data, without filtering branch
        getListMonitoringEmployee(page, limit).then((success) => {
          setIsLoading(false);
        });

        // Show all branch when not blocked role
        listBranchDropdown.map((item, index) => {
          SelectBranch.push({
            id: `branch-${index}`,
            value: item.id,
            label: item.name,
          });
        });
        setSelectBranch(SelectBranch);
      }
    } else {
      setIsBlockedRole(false);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    checkBlockedRole();
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
    setIsLoading(true);
    MonitoringEmployeeActions.handleSearch(monitoringEmployeeFormValues).then(
      (success) => {
        setIsLoading(false);
      }
    );
  };

  const handlePressGeneratePdf = () => {
    console.log(
      "=== exportMonitoringEmployeePdf : ",
      monitoringEmployeeFormValues
    );
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
      enumBranch={selectBranch}
      onSearch={onSearch}
      isLoading={isLoading}
      handlePressGeneratePdf={handlePressGeneratePdf}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  branch: state.branch,
  user: state.auth.userDetail,
  monitoringEmployee: state.monitoringEmployee,
  monitoringEmployeeFormValues: getFormValues("monitoringEmployeeForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getListMonitoringEmployee: async (
    page,
    limit,
    keyword,
    type,
    branchId,
    from,
    until
  ) =>
    MonitoringEmployeeActions.getMonitoringEmployeeListDataRequested(
      page,
      limit,
      keyword,
      type,
      branchId,
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
