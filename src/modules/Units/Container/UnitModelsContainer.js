import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as UnitModelActions from "../Store/UnitModelActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import {
  EditOutlined,
  DeleteOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { getIndex, navigate } from "../../../app/Helpers";
import { store } from "../../../app/ConfigureStore";
import UnitModelsComponent from "../Component/UnitModelsComponent";

const UnitModelsContainer = (props) => {
  const {
    getListUnitModels,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    handlePressSerialNumber,
    unitModels: { listUnitModels, paging },
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
      width: "7%",
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
        onClick={() => handlePressSerialNumber(record)}
        type="ghost"
        icon={<FieldNumberOutlined />}
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
    await store.dispatch(UnitModelActions.setPagingUnitModel(paging));
    getListUnitModels(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListUnitModels(page, limit, val);
  };

  return (
    <UnitModelsComponent
      headers={headers}
      listUnits={listUnitModels}
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
  units: state.units,
  unitModels: state.unitModels,
});
const mapDispatchToProps = (dispatch) => ({
  getListUnitModels: (page, limit, keyword) =>
    UnitModelActions.getUnitModelListDataRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(UnitModelActions.setSelectedUnitModelData({}));
    await dispatch(UnitModelActions.setSelectedUnitModelId(""));
    dispatch(UnitModelActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    UnitModelActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(UnitModelActions.setFormStatus("edit"));
    await dispatch(UnitModelActions.setSelectedUnitModelId(record.id));
    await dispatch(UnitModelActions.setSelectedUnitModelData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await UnitModelActions.mapDetailUnitModelToForm();
  },
  handlePressDelete: async (unitModelId) => {
    await dispatch(UnitModelActions.setSelectedUnitModelId(unitModelId));
    UnitModelActions.deleteUnitModelRequested(unitModelId);
  },
  handlePressSerialNumber: async (record) => {
    await dispatch(ComponentActions.setGlobalLoading(true));
    await dispatch(UnitModelActions.setSelectedUnitModelId(record.id));
    await dispatch(UnitModelActions.setSelectedUnitModelData(record));
    setTimeout(() => {
      navigate("unit-serial-number");
    }, 500);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitModelsContainer);

export default reduxForm({
  form: "unitsModelsForm",
})(EnhanceContainer);
