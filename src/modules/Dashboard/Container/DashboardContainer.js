import { Space, Tag } from "antd";
import React from "react";
import { connect } from "react-redux";
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
import { isBlockedRoleDetailService } from "../../../app/Helpers";
import { Link } from "react-router-dom";

const DashboardContainer = (props) => {
  const {
    handlePressEdit,
    auth: { userDetail },
    services: { dashboardListServices },
    dashboard: { dashboardData },
  } = props;
  const [isBlocked, setisBlocked] = React.useState(false);

  if (dashboardListServices.length > 0) {
    dashboardListServices.map((item, index) => {
      dashboardListServices[index] = { ...item, no: index + 1 };
    });
  }

  const checkBlockedRole = () => {
    const roleId = userDetail.roles[0].role_id;
    const isBlockedRole = isBlockedRoleDetailService(roleId);
    if (isBlockedRole) {
      setisBlocked(isBlockedRole);
    } else {
      setisBlocked(false);
    }
  };

  React.useEffect(() => {
    checkBlockedRole();
    initializeApp();
    store.dispatch(setGlobalLoading(false));
    ListServiceActions.getTopTenService();
    getDashboardProgressData();
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
      <Link
        to={"/detail-services"}
        onClick={() => {
          handlePressEdit(record);
        }}
      >
        <CButtonAntd type="primary" icon={<EditOutlined />} size="middle" />
      </Link>
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
      align: "center",
      width: 50,
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "No. Service",
      dataIndex: "no_service",
      key: "no_service",
      align: "center",
      width: 150,
      sorter: (a, b) => a.no_service - b.no_service,
    },
    {
      title: "Tipe",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 160,
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
      align: "left",
      width: 200,
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
      align: "left",
      width: 250,
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
      align: "left",
      width: 250,
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
      align: "left",
      width: 250,
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Due Date",
      dataIndex: "due",
      key: "due",
      align: "center",
      width: 100,
      sorter: (a, b) => a.due - b.due,
      render: (due) => {
        return <Text>{moment(due).format("YYYY-MM-DD")}</Text>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
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
      width: 150,
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created_date",
      key: "created_date",
      align: "left",
      width: 150,
      sorter: (a, b) => a.created_date.length - b.created_date.length,
    },
    {
      align: "center",
      title: "Aksi",
      key: "action",
      width: 70,
      render: renderActionTable,
      fixed: "right",
    },
  ];

  return (
    <DashboardComponent
      userDetail={userDetail}
      headers={headers}
      listServices={dashboardListServices}
      dashboard={dashboardData}
      isBlocked={isBlocked}
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
