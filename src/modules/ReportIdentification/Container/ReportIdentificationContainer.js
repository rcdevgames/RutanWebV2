import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import { EditOutlined } from "@ant-design/icons";
import { enumTypeMonitoringEmployee } from "../../../app/Helpers";
import * as ReportEmployeeActions from "../Store/ReportIdentificationActions";
import Text from "antd/lib/typography/Text";
import { Space, Tag } from "antd";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import ReportEmployeeComponent from "../Component/ReportIdentificationComponent";

const ReportIdentificationContainer = (props) => {
  const {
    reportEmployee: { listReportEmployee, paging },
    branch: { listBranch },
    reportEmployeeFormValues,
    getReportEmployee,
    handlePressEdit,
  } = props;

  const { page, limit } = paging;

  if (listReportEmployee.length > 0) {
    listReportEmployee.map((item, index) => {
      listReportEmployee[index] = { ...item, no: index + 1 };
    });
  }

  const renderActionTable = (text, record) => (
    <Space size="middle">
      <CButtonAntd
        onClick={() => {
          handlePressEdit(record);
        }}
        type="primary"
        icon={<EditOutlined />}
        size="middle"
      />
    </Space>
  );

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
    getReportEmployee(page, limit);
  }, []);

  const onSearch = () => {
    ReportEmployeeActions.handleSearch(reportEmployeeFormValues);
  };

  return (
    <ReportEmployeeComponent
      headers={headers}
      listReportEmployee={listReportEmployee}
      paging={paging}
      enumTypeReport={enumTypeMonitoringEmployee}
      enumBranch={SelectBranch}
      onSearch={onSearch}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  reportEmployee: state.reportEmployee,
  branch: state.branch,
  reportEmployeeFormValues: getFormValues("reportEmployeeForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getReportEmployee: (page, limit, keyword, from, until) =>
    ReportEmployeeActions.getReportEmployeeDataRequested(
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
)(ReportIdentificationContainer);

export default reduxForm({
  form: "reportIdentificationForm",
})(EnhanceContainer);
