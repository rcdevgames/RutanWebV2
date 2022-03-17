import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import { EditOutlined } from "@ant-design/icons";
import { enumTypeMonitoringEmployee } from "../../../app/Helpers";
import * as ReportServiceRepairActions from "../Store/ReportServiceRepairActions";
import Text from "antd/lib/typography/Text";
import { Space, Tag } from "antd";
import ReportServiceRepairComponent from "../Component/ReportServiceRepairComponent";
import CButtonAntd from "../../../components/CButton/CButtonAntd";

const ReportServiceRepairContainer = (props) => {
  const {
    handlePressAddNew,
    serviceRepair: { listServiceRepair, paging },
    branch: { listBranch },
    serviceRepairFormValues,
    getListServiceRepair,
    handlePressEdit,
  } = props;

  const { page, limit } = paging;

  if (listServiceRepair.length > 0) {
    listServiceRepair.map((item, index) => {
      listServiceRepair[index] = { ...item, no: index + 1 };
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
      width: "10%",
      sorter: (a, b) => a.no - b.no,
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
            {type ? type.toUpperCase() : "-"}
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
      render: (units) => {
        if (units) {
          return units.map((unit) => (
            <Text>
              {unit.unit_name}
              {units.length <= 1 ? "" : ", "}
            </Text>
          ));
        }
        return <Text>{"-"}</Text>;
      },
      key: "unit_models",
      width: "15%",
    },
    {
      title: "Model",
      dataIndex: "unit_models",
      render: (units) => {
        if (units) {
          return units.map((unit) => (
            <Text>
              {unit.unit_model_name}
              {units.length <= 1 ? "" : ", "}
            </Text>
          ));
        }
        return <Text>{"-"}</Text>;
      },
      key: "unit_models",
      width: "15%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Due date",
      dataIndex: "due_date",
      key: "due_date",
      width: "15%",
      sorter: (a, b) => a.due_date.length - b.due_date.length,
    },
    {
      title: "Status",
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
            {status ? status.toUpperCase() : "-"}
          </Tag>
        );
      },
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

  const SelectBranch = [];
  listBranch.map((item, index) => {
    SelectBranch.push({
      id: `branch-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  React.useEffect(() => {
    getListServiceRepair(page, limit);
  }, []);

  const onSearch = () => {
    ReportServiceRepairActions.handleSearch(serviceRepairFormValues);
  };

  return (
    <ReportServiceRepairComponent
      headers={headers}
      listServiceRepair={listServiceRepair}
      handlePressAddNew={handlePressAddNew}
      paging={paging}
      enumTypeReport={enumTypeMonitoringEmployee}
      enumBranch={SelectBranch}
      onSearch={onSearch}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  serviceRepair: state.serviceRepair,
  branch: state.branch,
  serviceRepairFormValues: getFormValues("serviceRepairForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getListServiceRepair: (page, limit, keyword, from, until) =>
    ReportServiceRepairActions.getServiceRepairListDataRequested(
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
)(ReportServiceRepairContainer);

export default reduxForm({
  form: "serviceRepairForm",
})(EnhanceContainer);
