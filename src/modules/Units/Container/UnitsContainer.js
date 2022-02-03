import { Space, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as UnitsActions from "../Store/UnitsActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import {
  EditOutlined,
  DeleteOutlined,
  BoxPlotOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import UnitsComponent from "../Component/UnitsComponent";
import { getIndex, navigate } from "../../../app/Helpers";
import { store } from "../../../app/ConfigureStore";

const UnitsConatiner = (props) => {
  const {
    getListUnit,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    handlePressUnitModel,
    units: { listUnits, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  const tooltipText = <span>Unit Model</span>;

  if (listUnits.length > 0) {
    listUnits.map((item, index) => {
      listUnits[index] = { ...item, no: getIndex(page, limit)[index] };
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
      <Tooltip placement="top" title={tooltipText}>
        <CButtonAntd
          onClick={() => handlePressUnitModel(record.id)}
          type="primary"
          icon={<BoxPlotOutlined />}
          size="middle"
        />
      </Tooltip>
      <CButtonAntd
        onClick={() => handlePressDelete(record.id)}
        type="primary"
        icon={<FileAddOutlined />}
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
    getListUnit(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(UnitsActions.setPagingUnit(paging));
    getListUnit(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListUnit(page, limit, val);
  };

  return (
    <UnitsComponent
      headers={headers}
      listUnits={listUnits}
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
});
const mapDispatchToProps = (dispatch) => ({
  getListUnit: (page, limit, keyword) =>
    UnitsActions.getUnitListDataRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(UnitsActions.setSelectedUnitData({}));
    await dispatch(UnitsActions.setSelectedUnitId(""));
    dispatch(UnitsActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    UnitsActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(UnitsActions.setFormStatus("edit"));
    await dispatch(UnitsActions.setSelectedUnitId(record.id));
    await dispatch(UnitsActions.setSelectedUnitData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await UnitsActions.mapDetailUnitToForm();
  },
  handlePressDelete: async (unitId) => {
    await dispatch(UnitsActions.setSelectedUnitId(unitId));
    UnitsActions.deleteUnitRequested(unitId);
  },
  handlePressUnitModel: async (unitId) => {
    await dispatch(UnitsActions.setSelectedUnitId(unitId));
    navigate("unit-models");
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitsConatiner);

export default reduxForm({
  form: "unitsForm",
})(EnhanceContainer);
