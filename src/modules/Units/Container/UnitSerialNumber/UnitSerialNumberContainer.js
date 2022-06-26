import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as UnitSerialNumberActions from "../../Store/UnitSerialNumberActions";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import { getIndex } from "../../../../app/Helpers";
import { store } from "../../../../app/ConfigureStore";
import UnitSerialNumberComponent from "../../Component/UnitSerialNumber/UnitSerialNumberComponent";

const UnitSerialNumberContainer = (props) => {
  const {
    getListUnitModels,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    unitModels: { listUnitModels, paging, selectedUnitModelsData },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listUnitModels.length > 0) {
    listUnitModels.map((item, index) => {
      listUnitModels[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Nama Model",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created_at",
      key: "created_at",
      width: "30%",
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
    getListUnitModels(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(UnitSerialNumberActions.setPagingUnitModel(paging));
    getListUnitModels(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListUnitModels(page, limit, val);
  };

  return (
    <UnitSerialNumberComponent
      headers={headers}
      listUnits={listUnitModels}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      selectedUnitModelsData={selectedUnitModelsData}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  unitModels: state.unitModels,
});
const mapDispatchToProps = (dispatch) => ({
  getListUnitModels: (page, limit, keyword) =>
    UnitSerialNumberActions.getUnitModelListDataRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(UnitSerialNumberActions.setSelectedUnitModelData({}));
    await dispatch(UnitSerialNumberActions.setSelectedUnitModelId(""));
    dispatch(UnitSerialNumberActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    UnitSerialNumberActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(UnitSerialNumberActions.setFormStatus("edit"));
    await dispatch(UnitSerialNumberActions.setSelectedUnitModelId(record.id));
    await dispatch(UnitSerialNumberActions.setSelectedUnitModelData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await UnitSerialNumberActions.mapDetailUnitModelToForm();
  },
  handlePressDelete: async (unitModelId) => {
    await dispatch(UnitSerialNumberActions.setSelectedUnitModelId(unitModelId));
    UnitSerialNumberActions.deleteUnitModelRequested(unitModelId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitSerialNumberContainer);

export default reduxForm({
  form: "unitSerialNumberForm",
})(EnhanceContainer);
