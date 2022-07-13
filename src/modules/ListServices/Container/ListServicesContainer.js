import React from "react";
import { Space, Tag } from "antd";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import { store } from "../../../app/ConfigureStore";
import {
  enumTypeExternalServices,
  getIndex,
  SelectStatusServices,
} from "../../../app/Helpers";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import ListServicesComponent from "../Component/ListServicesComponent";
import * as ListServiceActions from "../Store/ListServicesActions";
import Text from "antd/lib/typography/Text";
import moment from "moment";

const ListServicesContainer = (props) => {
  const {
    getListServices,
    handlePressEdit,
    handlePressDelete,
    services: { listServices, paging },
    listServiceFormValues,
  } = props;

  const { page, limit, totalPage } = paging;

  if (listServices.length > 0) {
    listServices.map((item, index) => {
      listServices[index] = { ...item, no: getIndex(page, limit)[index] };
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
      <CButtonAntd
        onClick={() => handlePressDelete(record.id)}
        type="primary"
        icon={<DeleteOutlined />}
        size="middle"
        danger
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

  // const columns = [
  //   { dataIndex: "no", title: "No" },
  //   { dataIndex: "type", title: "Tipe" },
  //   { dataIndex: "customer_name", title: "Customer" },
  //   { dataIndex: "employees", title: "Teknisi" },
  //   { dataIndex: "unit_models", title: "Unit" },
  //   { dataIndex: "due", title: "Due Date" },
  //   { dataIndex: "status", title: "Status" },
  //   { dataIndex: "created_date", title: "Dibuat" },
  //   { dataIndex: "action", title: "Aksi", fixed: "right" },
  // ];

  // const source = listServices.map((service) => ({
  //   no: service.no,
  //   type: service.type,
  //   customer_name: service.customer_name,
  //   unit_models: service.unit_models,
  //   due: service.due,
  //   status: service.status,
  //   created_date: service.created_date,
  //   action: service.actions,
  // }));

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "5%",
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
      width: "15%",
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
      fixed: "right",
    },
  ];

  React.useEffect(() => {
    getListServices(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(ListServiceActions.setPagingListService(paging));
    getListServices(nextPage, pageSize);
  };

  const onSearch = (val) => {
    ListServiceActions.handleSearch(1, 10, val, listServiceFormValues);
  };

  return (
    <ListServicesComponent
      headers={headers}
      listServices={listServices}
      renderActionTable={renderActionTable}
      handlePressEdit={handlePressEdit}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      enumType={enumTypeExternalServices}
      enumStatus={SelectStatusServices}
      // columns={columns}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  listServiceFormValues: getFormValues("listServices")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getListServices: (page, limit, keyword, filterValues) => {
    ListServiceActions.getListServicesRequested(
      page,
      limit,
      keyword,
      filterValues
    );
  },
  handlePressEdit: async (value) => ListServiceActions.handlePressEdit(value),
  handlePressDelete: async (jobServiceId) => {
    await dispatch(ListServiceActions.setSelectedJobServiceId(jobServiceId));
    ListServiceActions.deleteJobServiceRequested(jobServiceId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListServicesContainer);

export default reduxForm({
  form: "listServices",
})(EnhanceContainer);
