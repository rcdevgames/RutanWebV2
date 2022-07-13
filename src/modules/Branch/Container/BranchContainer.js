import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as BranchActions from "../Store/BranchActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import BranchComponent from "../Component/BranchComponent";
import { store } from "../../../app/ConfigureStore";
import { getIndex } from "../../../app/Helpers";

const BranchContainer = (props) => {
  const {
    getListBranch,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    branch: { listBranch, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listBranch.length > 0) {
    listBranch.map((item, index) => {
      listBranch[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Nama Cabang",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
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
    getListBranch(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(BranchActions.setPagingBranch(paging));
    getListBranch(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListBranch(page, limit, val);
  };

  return (
    <BranchComponent
      headers={headers}
      listRoles={listBranch}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      paging={paging}
      onSearch={onSearch}
      // onShowSizeChange={onShowSizeChange}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  branch: state.branch,
});
const mapDispatchToProps = (dispatch) => ({
  getListBranch: (page, limit, keyword) =>
    BranchActions.getBranchListDataRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(BranchActions.setSelectedBranchData({}));
    await dispatch(BranchActions.setSelectedBranchId(""));
    dispatch(BranchActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    BranchActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(BranchActions.setFormStatus("edit"));
    await dispatch(BranchActions.setSelectedBranchId(record.id));
    await dispatch(BranchActions.setSelectedBranchData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await BranchActions.mapDetailBranchToForm();
  },
  handlePressDelete: async (branchId) => {
    await dispatch(BranchActions.setSelectedBranchId(branchId));
    BranchActions.deleteBranchRequested(branchId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchContainer);

export default reduxForm({
  form: "branchForm",
})(EnhanceContainer);
