import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as UnitsActions from "../Store/UnitsActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import UnitsComponent from "../Component/UnitsComponent";

const UnitsConatiner = (props) => {
  const {
    getListUnit,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    units: { listUnits },
  } = props;

  if (listUnits.length > 0) {
    listUnits.map((item, index) => {
      listUnits[index] = { ...item, no: index + 1 };
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
      title: "Nama Unit",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Divisi",
      dataIndex: "division",
      key: "division",
      width: "10%",
      sorter: (a, b) => a.division.length - b.division.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      width: "30%",
      sorter: (a, b) => a.description.length - b.description.length,
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
    getListUnit();
  }, []);

  return (
    <UnitsComponent
      headers={headers}
      listUnits={listUnits}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
});
const mapDispatchToProps = (dispatch) => ({
  getListUnit: () => UnitsActions.getUnitListDataRequested(),
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
)(UnitsConatiner);

export default reduxForm({
  form: "unitsForm",
})(EnhanceContainer);
