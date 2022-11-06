import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import { EditOutlined } from "@ant-design/icons";
import {
  enumTypeMonitoringEmployee,
  isBlockedRoleCustomerView,
} from "../../../app/Helpers";
import * as ReportEmployeeActions from "../Store/ReportEmployeeActions";
import Text from "antd/lib/typography/Text";
import { Space, Tag } from "antd";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import ReportEmployeeComponent from "../Component/ReportEmployeeComponent";
import { saveToolsRequested } from "../../Tools/Store/ToolsActions";

const ReportEmployeeContainer = (props) => {
  const {
    getReportEmployee,
    reportEmployeeFormValues,
    user: { roles, branchId },
    reportEmployee: { listReportEmployee, paging },
    branch: { listBranch, listBranchDropdown },
  } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBlockedRole, setIsBlockedRole] = React.useState(false);
  const [selectBranch, setSelectBranch] = React.useState([]);
  const { page, limit } = paging;

  if (listReportEmployee.length > 0) {
    listReportEmployee.map((item, index) => {
      listReportEmployee[index] = { ...item, no: index + 1 };
    });
  }

  const checkBlockedRole = () => {
    const SelectBranch = [];
    const roleId = roles[0].role_id;
    const blocked = isBlockedRoleCustomerView(roleId);

    if (blocked) {
      setIsBlockedRole(blocked);

      if (blocked) {
        // Call API report service only for his own branch
        getReportEmployee(page, limit, "", branchId).then((success) => {
          setIsLoading(false);
        });

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
        getReportEmployee(page, limit).then((success) => {
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

  const switchColorType = (isExternal, isWarranty) => {
    if (isWarranty) {
      return "#ffc018";
    }
    switch (isExternal) {
      case true:
        return "#87d068";
        break;

      default:
        return "#108ee9";
        break;
    }
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
      title: "Cabang",
      dataIndex: "branch_name",
      key: "branch_name",
      width: "20%",
      sorter: (a, b) => a.branch_name.length - b.branch_name.length,
    },
    {
      title: "Teknisi",
      dataIndex: "technition",
      key: "technition",
      width: "20%",
      sorter: (a, b) => a.technition.length - b.technition.length,
    },
    {
      title: "Tipe",
      dataIndex: "type",
      key: "type",
      width: "20%",
      render: (type, items) => {
        let color = switchColorType(items.is_external, items.warranty);
        return (
          <Tag
            style={{ borderRadius: 10, width: 115, textAlign: "center" }}
            color={color}
            key={type}
          >
            {type.toUpperCase()}
          </Tag>
        );
      },
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "20%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Unit",
      dataIndex: "unit_models",
      render: (units) =>
        units.map((unit) => (
          <Text>
            {unit.unit_name}
            {units.length <= 1 ? "" : ", "}
          </Text>
        )),
      key: "unit_models",
      width: "15%",
    },
    {
      title: "Model",
      dataIndex: "unit_models",
      render: (units) =>
        units.map((unit) => (
          <Text>
            {unit.unit_model_name}
            {units.length <= 1 ? "" : ", "}
          </Text>
        )),
      key: "unit_models",
      width: "15%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Progress",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Progress" ? "#108ee9" : "#f50";
        return (
          <Tag
            style={{ width: 80, textAlign: "center" }}
            color={color}
            key={status}
          >
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const SelectBranch = [];
  listBranch.map((item, index) => {
    SelectBranch.push({
      id: `branch-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  React.useEffect(() => {
    setIsLoading(saveToolsRequested);
    checkBlockedRole();
  }, []);

  const onSearch = () => {
    setIsLoading(true);
    ReportEmployeeActions.handleSearch(reportEmployeeFormValues).then(
      (success) => {
        setIsLoading(false);
      }
    );
  };

  return (
    <ReportEmployeeComponent
      headers={headers}
      listReportEmployee={listReportEmployee}
      paging={paging}
      enumTypeReport={enumTypeMonitoringEmployee}
      enumBranch={selectBranch}
      onSearch={onSearch}
      isLoading={isLoading}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  branch: state.branch,
  user: state.auth.userDetail,
  reportEmployee: state.reportEmployee,
  reportEmployeeFormValues: getFormValues("reportEmployeeForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getReportEmployee: async (page, limit, keyword, branchId, from, until) =>
    await ReportEmployeeActions.getReportEmployeeDataRequested(
      page,
      limit,
      keyword,
      branchId,
      from,
      until
    ),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportEmployeeContainer);

export default reduxForm({
  form: "reportEmployeeForm",
})(EnhanceContainer);
