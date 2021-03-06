import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import * as CustomerActions from "../Store/CustomersActions";
import * as BranchActions from "../../Branch/Store/BranchActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CustomerComponent from "../Component/CustomerComponent";
import { store } from "../../../app/ConfigureStore";
import { getIndex } from "../../../app/Helpers";

const selector = formValueSelector("customerForm");

const CustomerContainer = (props) => {
  const {
    getListCustomer,
    getListBranch,
    getListProvince,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    customerBranchValue,
    customers: { listCustomers, paging, keyword },
    branch: { listBranch },
  } = props;

  const { page, totalPage, limit } = paging;

  const SelectBranch = [];
  listBranch.map((item, index) => {
    SelectBranch.push({
      id: `branch-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  if (listCustomers.length > 0) {
    listCustomers.map((item, index) => {
      listCustomers[index] = { ...item, no: getIndex(page, limit)[index] };
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
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Cabang",
      dataIndex: "branch_name",
      key: "branch_name",
      width: "20%",
      sorter: (a, b) => a.branch_name.length - b.branch_name.length,
    },
    {
      title: "Telepon",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "PIC | Phone",
      dataIndex: `phone`,
      key: "phone",
      width: "20%",
      sorter: (a, b) => a.phone.length - b.phone.length,
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
    getListCustomer(1, 10, "");
    getListBranch();
    getListProvince();
  }, []);

  const onChangePagination = async (nextPage) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = limit;
    paging.totalPage = totalPage;
    await store.dispatch(CustomerActions.setPagingCustomer(paging));
    getListCustomer(nextPage, limit, keyword);
  };

  const onSearch = (val) => {
    getListCustomer(page, limit, val, customerBranchValue);
  };

  return (
    <CustomerComponent
      headers={headers}
      paging={paging}
      listCustomers={listCustomers}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      enumBranch={SelectBranch}
      onSearch={onSearch}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  customers: state.customers,
  branch: state.branch,
  customerBranchValue: selector(state, "branch"),
});
const mapDispatchToProps = (dispatch) => ({
  getListCustomer: (page, limit, keyword, branchId) => {
    const splitBranch = branchId ? branchId.split("|") : [""];
    CustomerActions.getCustomerListDataByPaging(
      page,
      limit,
      keyword,
      splitBranch[0]
    );
  },
  getListBranch: () => BranchActions.getBranchListDataRequested(1, 250),
  getListProvince: () => MasterDataActions.loadProvinceListData(),
  handlePressAddNew: async () => {
    await dispatch(CustomerActions.setSelectedCustomerData({}));
    await dispatch(CustomerActions.setSelectedCustomerId(""));
    dispatch(CustomerActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    CustomerActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(CustomerActions.setFormStatus("edit"));
    await dispatch(CustomerActions.setSelectedCustomerId(record.id));
    await dispatch(CustomerActions.setSelectedCustomerData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await CustomerActions.mapDetailCustomerToForm();
  },
  handlePressDelete: async (customerId) => {
    await dispatch(CustomerActions.setSelectedCustomerId(customerId));
    CustomerActions.deleteCustomerRequested(customerId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerContainer);

export default reduxForm({
  form: "customerForm",
})(EnhanceContainer);
