import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import * as IdentificationActions from "../Store/IdentificationActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import ListIdentificationComponent from "../Component/ListIdentificationComponent";
import { navigate } from "../../../app/Helpers";

const ListIdentificationContainer = (props) => {
  const {
    getListIdentification,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    identification: { listIdentification },
  } = props;

  if (listIdentification.length > 0) {
    listIdentification.map((item, index) => {
      listIdentification[index] = { ...item, no: index + 1 };
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
    getListIdentification();
  }, []);

  return (
    <ListIdentificationComponent
      headers={headers}
      listRoles={listIdentification}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  identification: state.identification,
});
const mapDispatchToProps = (dispatch) => ({
  getListIdentification: () =>
    IdentificationActions.getIdentificationListRequested(),
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
    setTimeout(() => {
      navigate("form-identification");
    }, 500);
  },
  //   handlePressDelete: async (branchId) => {
  //     await dispatch(IdentificationActions.setSelectedBranchId(branchId));
  //     IdentificationActions.deleteBranchRequested(branchId);
  //   },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIdentificationContainer);

export default reduxForm({
  form: "identificationForm",
})(EnhanceContainer);
