import { Space, Tag } from "antd";
import React from "react";
import { connect } from "react-redux";
import * as AdminActions from "../../Admin/Store/AdminActions";
import * as RoleActions from "../../Roles/Store/RolesActions";
import { store } from "../../../app/ConfigureStore";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { setGlobalLoading } from "../../App/Store/ComponentAction";
import DashboardComponent from "../Component/DashboardComponent";
import { EditOutlined } from "@ant-design/icons";
import * as ListServiceActions from "../../ListServices/Store/ListServicesActions";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { getDashboardProgressData } from "../Store/DashboardActions";
import { initializeApp } from "../../../app/InitializeApp";

const DashboardContainer = (props) => {
  const {
    handlePressEdit,
    auth: { userDetail },
    services: { dashboardListServices },
    dashboard: { dashboardData },
  } = props;
  if (dashboardListServices.length > 0) {
    dashboardListServices.map((item, index) => {
      dashboardListServices[index] = { ...item, no: index + 1 };
    });
  }

  React.useEffect(() => {
    store.dispatch(setGlobalLoading(false));
    ListServiceActions.getTopTenService();
    getDashboardProgressData();
    initializeApp();
  }, []);

  if (Object.keys(dashboardData).length > 0) {
    dashboardData.totalCustomer = dashboardData.totalCustomer
      ? dashboardData.totalCustomer.toLocaleString("en-US")
      : 0;
    dashboardData.totalInternalService = dashboardData.totalCustomer
      ? dashboardData.totalInternalService.toLocaleString("en-US")
      : 0;
    dashboardData.totalExternalService = dashboardData.totalExternalService
      ? dashboardData.totalExternalService.toLocaleString("en-US")
      : 0;
    dashboardData.totalIdentification = dashboardData.totalIdentification
      ? dashboardData.totalIdentification.toLocaleString("en-US")
      : 0;
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
      title: "Tipe",
      dataIndex: "type",
      key: "type",
      width: "15%",
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
      width: "40%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Teknisi",
      dataIndex: "employees",
      render: (employees) =>
        employees.map((employee) => (
          <Text>
            {employee.employee_name}
            {employees.length <= 1 ? "" : ", "}
          </Text>
        )),
      key: "employees",
      width: "15%",
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
      title: "Due Date",
      dataIndex: "due",
      key: "due",
      width: "15%",
      sorter: (a, b) => a.due - b.due,
      render: (due) => {
        return <Text>{moment(due).format("YYYY-MM-DD")}</Text>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Progress" ? "#108ee9" : "#54BAB9";
        return (
          <Tag
            style={{ width: 90, textAlign: "center" }}
            color={color}
            key={status}
          >
            {status.toUpperCase()}
          </Tag>
        );
      },
      width: "15%",
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created_date",
      key: "created_date",
      width: "15%",
      sorter: (a, b) => a.created_date.length - b.created_date.length,
    },
    {
      align: "center",
      title: "Aksi",
      key: "action",
      width: "30%",
      render: renderActionTable,
    },
  ];

  return (
    <DashboardComponent
      userDetail={userDetail}
      headers={headers}
      listServices={dashboardListServices}
      dashboard={dashboardData}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  services: state.services,
  dashboard: state.dashboard,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressEdit: async (value) => ListServiceActions.handlePressEdit(value),
  handlePressDelete: async (jobServiceId) => {
    await dispatch(ListServiceActions.setSelectedJobServiceId(jobServiceId));
    ListServiceActions.deleteJobServiceRequested(jobServiceId);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
