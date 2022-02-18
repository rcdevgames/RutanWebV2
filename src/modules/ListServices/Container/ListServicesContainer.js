import React from "react";
import { Space, Tag } from "antd";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { store } from "../../../app/ConfigureStore";
import { getIndex, navigate } from "../../../app/Helpers";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import ListServicesComponent from "../Component/ListServicesComponent";
import * as ListServiceActions from "../Store/ListServicesActions";
import Text from "antd/lib/typography/Text";

const ListServicesContainer = (props) => {
  const {
    getListServices,
    handlePressEdit,
    handlePressDelete,
    services: { listServices, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listServices.length > 0) {
    listServices.map((item, index) => {
      listServices[index] = { ...item, no: getIndex(page, limit)[index] };
    });
  }

  // const headers = [
  //   "No",
  //   "Tanggal",
  //   "Tipe",
  //   "Customer",
  //   "Teknisi",
  //   "Unit",
  //   "Model (SN)",
  //   "Status",
  //   "Dibuat",
  //   "Aksi",
  // ];

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
      render: (text) => {
        console.log("=== types : ", text);
        let color = text === "Repair" ? "geekblue" : "green";
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
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
      title: "Unit",
      width: "15%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Model",
      width: "15%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
  ];

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
    getListServices(page, limit, val);
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
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({
  getListServices: (page, limit, keyword) =>
    ListServiceActions.getListServicesRequested(page, limit, keyword),
  handlePressEdit: async (value) => ListServiceActions.handlePressEdit(value),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListServicesContainer);

export default reduxForm({
  form: "listServices",
})(EnhanceContainer);
