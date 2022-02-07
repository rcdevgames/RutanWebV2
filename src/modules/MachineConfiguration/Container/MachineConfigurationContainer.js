import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as MachineActions from "../Store/MachineConfigurationActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import MachineConfigurationComponent from "../Component/MachineConfigurationComponent";
import { store } from "../../../app/ConfigureStore";
import { getIndex } from "../../../app/Helpers";

const MachineConfigurationContainer = (props) => {
  const {
    getListMachine,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    machineConfiguration: { listMachine, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listMachine.length > 0) {
    listMachine.map((item, index) => {
      listMachine[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Nama Konfigurasi Mesin",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      width: "50%",
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
    getListMachine(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(MachineActions.setPagingMachineConf(paging));
    getListMachine(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListMachine(page, limit, val);
  };

  return (
    <MachineConfigurationComponent
      headers={headers}
      listMachine={listMachine}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  branch: state.branch,
  machineConfiguration: state.machineConfiguration,
});
const mapDispatchToProps = (dispatch) => ({
  getListMachine: (page, limit, keyword) =>
    MachineActions.getMachineListDataRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(MachineActions.setSelectedMachineData({}));
    await dispatch(MachineActions.setSelectedMachineId(""));
    dispatch(MachineActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    MachineActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(MachineActions.setFormStatus("edit"));
    await dispatch(MachineActions.setSelectedMachineId(record.id));
    await dispatch(MachineActions.setSelectedMachineData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await MachineActions.mapDetailMachineToForm();
  },
  handlePressDelete: async (machineId) => {
    await dispatch(MachineActions.setSelectedMachineId(machineId));
    MachineActions.deleteMachineRequested(machineId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MachineConfigurationContainer);

export default reduxForm({
  form: "machineConfigurationForm",
})(EnhanceContainer);
