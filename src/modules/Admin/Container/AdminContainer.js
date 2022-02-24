import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as AdminActions from "../Store/AdminActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { store } from "../../../app/ConfigureStore";
import { getIndex } from "../../../app/Helpers";
import AdminComponent from "../Component/AdminComponent";

const BranchContainer = (props) => {
  const {
    getListAdmin,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    admins: { listAdmin, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listAdmin.length > 0) {
    listAdmin.map((item, index) => {
      listAdmin[index] = { ...item, no: getIndex(page, limit)[index] };
    });
  }

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "30%",
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: "Nama Lengkap",
      dataIndex: "fullname",
      key: "fullname",
      width: "30%",
      sorter: (a, b) => a.fullname.length - b.fullname.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created_date",
      key: "created_date",
      width: "30%",
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
    getListAdmin(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(AdminActions.setPagingAdmin(paging));
    getListAdmin(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListAdmin(page, limit, val);
  };

  return (
    <AdminComponent
      headers={headers}
      listAdmin={listAdmin}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      paging={paging}
      onSearch={onSearch}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
});
const mapDispatchToProps = (dispatch) => ({
  getListAdmin: (page, limit, keyword) =>
    AdminActions.getListAdminRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(AdminActions.setSelectedAdminData({}));
    await dispatch(AdminActions.setSelectedAdminId(""));
    dispatch(AdminActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    AdminActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(AdminActions.setFormStatus("edit"));
    await dispatch(AdminActions.setSelectedAdminId(record.id));
    await dispatch(AdminActions.setSelectedAdminData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await AdminActions.mapDetailAdminToForm();
  },
  handlePressDelete: async (adminId) => {
    await dispatch(AdminActions.setSelectedAdminId(adminId));
    AdminActions.deleteAdminRequested(adminId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchContainer);

export default reduxForm({
  form: "adminForm",
})(EnhanceContainer);
