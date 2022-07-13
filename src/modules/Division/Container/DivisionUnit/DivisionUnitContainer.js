import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as DivisionUnitActions from "../../Store/DivisionUnitActions";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import { getIndex } from "../../../../app/Helpers";
import { store } from "../../../../app/ConfigureStore";
import DivisionUnitComponent from "../../Component/DivisionUnit/DivisionUnitComponent";

const DivisionUnitContainer = (props) => {
  const {
    getListDivisionUnit,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    divisionUnit: { listDivisionUnit, paging },
    division: { selectedDivisionData },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listDivisionUnit.length > 0) {
    listDivisionUnit.map((item, index) => {
      listDivisionUnit[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Nama Unit",
      dataIndex: "unit_name",
      key: "unit_name",
      width: "20%",
      sorter: (a, b) => a.unit_name.length - b.unit_name.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      width: "20%",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created_date",
      key: "created_date",
      width: "30%",
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
    getListDivisionUnit(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(DivisionUnitActions.setPagingDivisionUnit(paging));
    getListDivisionUnit(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListDivisionUnit(page, limit, val);
  };

  return (
    <DivisionUnitComponent
      headers={headers}
      listDivisionUnit={listDivisionUnit}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      selectedDivisionData={selectedDivisionData}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  division: state.division,
  divisionUnit: state.divisionUnit,
});
const mapDispatchToProps = (dispatch) => ({
  getListDivisionUnit: (page, limit, keyword) =>
    DivisionUnitActions.getDivisionUnitListRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(DivisionUnitActions.setSelectedDivisionUnitData({}));
    await dispatch(DivisionUnitActions.setSelectedDivisonUnitId(""));
    dispatch(DivisionUnitActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    DivisionUnitActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(DivisionUnitActions.setFormStatus("edit"));
    await dispatch(DivisionUnitActions.setSelectedDivisonUnitId(record.id));
    await dispatch(DivisionUnitActions.setSelectedDivisionUnitData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await DivisionUnitActions.mapDetailUnitFieldToForm();
  },
  handlePressDelete: async (divisionUnitId) => {
    await dispatch(DivisionUnitActions.setSelectedDivisonUnitId(divisionUnitId));
    DivisionUnitActions.deleteUnitFieldRequested(divisionUnitId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionUnitContainer);

export default reduxForm({
  form: "divisionUnitForm",
})(EnhanceContainer);
