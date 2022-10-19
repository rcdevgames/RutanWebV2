import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as IdentificationActions from "../Store/IdentificationActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import ListIdentificationComponent from "../Component/ListIdentificationComponent";
import { getIndex, navigate } from "../../../app/Helpers";
import { store } from "../../../app/ConfigureStore";
import { Link } from "react-router-dom";

const ListIdentificationContainer = (props) => {
  const {
    getListIdentification,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    identification: { listIdentification, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listIdentification.length > 0) {
    listIdentification.map((item, index) => {
      listIdentification[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Nama Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "30%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Cabang",
      dataIndex: "branch_name",
      key: "branch_id",
      width: "30%",
      sorter: (a, b) => a.branch_id.length - b.branch_id.length,
    },
    {
      title: "Tipe Identifikasi",
      dataIndex: "type",
      key: "type",
      width: "20%",
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created_date",
      key: "created_date",
      width: "20%",
      sorter: (a, b) => a.created_at.length - b.created_at.length,
    },
  ];

  const renderActionTable = (text, record) => (
    <Space size="middle">
      <Link
        to={"/form-identification"}
        onClick={() => {
          handlePressEdit(record);
        }}
      >
        <CButtonAntd type="primary" icon={<EditOutlined />} size="middle" />
      </Link>
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
    getListIdentification(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(IdentificationActions.setPagingIdentification(paging));
    getListIdentification(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListIdentification(page, limit, val);
  };

  return (
    <ListIdentificationComponent
      headers={headers}
      listIdentification={listIdentification}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  identification: state.identification,
});
const mapDispatchToProps = (dispatch) => ({
  getListIdentification: (page, limit, keyword) =>
    IdentificationActions.getIdentificationListRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(IdentificationActions.setSelectedIdentificationData({}));
    await dispatch(IdentificationActions.setSelectedIdentificationId(""));
    dispatch(IdentificationActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    IdentificationActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(IdentificationActions.setFormStatus("edit"));
    await dispatch(
      IdentificationActions.setSelectedIdentificationId(record.id)
    );
    await dispatch(IdentificationActions.setSelectedIdentificationData(record));
  },
  handlePressDelete: async (branchId) => {
    await dispatch(IdentificationActions.setSelectedIdentificationId(branchId));
    IdentificationActions.deleteIdentificationRequested(branchId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIdentificationContainer);

export default reduxForm({
  form: "identificationForm",
})(EnhanceContainer);
