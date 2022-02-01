import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as CustomerActions from "../Store/CustomersActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CustomerComponent from "../Component/CustomerComponent";

const CustomerContainer = (props) => {
  const {
    getListCustomer,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    customers: { listCustomers },
  } = props;

  if (listCustomers.length > 0) {
    listCustomers.map((item, index) => {
      listCustomers[index] = { ...item, no: index + 1 };
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
    getListCustomer();
  }, []);

  return (
    <CustomerComponent
      headers={headers}
      listCustomers={listCustomers}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  customers: state.customers,
});
const mapDispatchToProps = (dispatch) => ({
  getListCustomer: () => CustomerActions.getCustomerListDataByPaging(1, 100),
  // handlePressAddNew: async () => {
  //   await dispatch(BranchActions.setSelectedBranchData({}));
  //   await dispatch(BranchActions.setSelectedBranchId(""));
  //   dispatch(BranchActions.setFormStatus("add"));
  //   dispatch(ComponentActions.setGlobalModal(true));
  //   BranchActions.resetForm();
  // },
  // handlePressEdit: async (record) => {
  //   await dispatch(BranchActions.setFormStatus("edit"));
  //   await dispatch(BranchActions.setSelectedBranchId(record.id));
  //   await dispatch(BranchActions.setSelectedBranchData(record));
  //   await dispatch(ComponentActions.setGlobalModal(true));
  //   await BranchActions.mapDetailBranchToForm();
  // },
  // handlePressDelete: async (branchId) => {
  //   await dispatch(BranchActions.setSelectedBranchId(branchId));
  //   BranchActions.deleteBranchRequested(branchId);
  // },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerContainer);

export default reduxForm({
  form: "customerForm",
})(EnhanceContainer);
