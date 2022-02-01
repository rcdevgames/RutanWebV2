import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as ToolsActions from "../Store/ToolsActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import ToolsComponent from "../Component/ToolsComponent";

const ToolsContainer = (props) => {
  const {
    getListTools,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    tools: { listTools },
  } = props;

  if (listTools.length > 0) {
    listTools.map((item, index) => {
      listTools[index] = { ...item, no: index + 1 };
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
      title: "Nama Peralatan",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      width: "30%",
      sorter: (a, b) => a.description.length - b.description.length,
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
    getListTools();
  }, []);

  return (
    <ToolsComponent
      headers={headers}
      listTools={listTools}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  tools: state.tools,
});
const mapDispatchToProps = (dispatch) => ({
  getListTools: () => ToolsActions.getToolsListDataRequested(),
  handlePressAddNew: async () => {
    await dispatch(ToolsActions.setSelectedToolsData({}));
    await dispatch(ToolsActions.setSelectedToolsId(""));
    dispatch(ToolsActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    ToolsActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(ToolsActions.setFormStatus("edit"));
    await dispatch(ToolsActions.setSelectedToolsId(record.id));
    await dispatch(ToolsActions.setSelectedToolsData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await ToolsActions.mapDetailToolsToForm();
  },
  handlePressDelete: async (toolsId) => {
    await dispatch(ToolsActions.setSelectedToolsId(toolsId));
    ToolsActions.deleteToolsRequested(toolsId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsContainer);

export default reduxForm({
  form: "branchForm",
})(EnhanceContainer);
