import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as UnitFieldsActions from "../../Store/UnitFieldsActions";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import { getIndex } from "../../../../app/Helpers";
import { store } from "../../../../app/ConfigureStore";
import UnitFieldsComponent from "../../Component/UnitFields/UnitFieldsComponent";

const UnitFieldsContainer = (props) => {
  const {
    getListUnitFields,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    unitFields: { listUnitFields, paging },
    units: { selectedUnitsData },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listUnitFields.length > 0) {
    listUnitFields.map((item, index) => {
      listUnitFields[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Job Form",
      dataIndex: "job_form_name",
      key: "job_form_name",
      width: "20%",
      sorter: (a, b) => a.job_form_name.length - b.job_form_name.length,
    },
    {
      title: "Nama Field",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Kategori",
      dataIndex: "category_form_name",
      key: "category_form_name",
      width: "30%",
      sorter: (a, b) => a.category_form_name.length - b.category_form_name.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "descriptions",
      key: "descriptions",
      width: "30%",
      sorter: (a, b) => a.descriptions.length - b.descriptions.length,
    },
    {
      title: "Dibuat",
      dataIndex: "created_date",
      key: "created_date",
      width: "40%",
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
    getListUnitFields(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(UnitFieldsActions.setPagingUnitFields(paging));
    getListUnitFields(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListUnitFields(page, limit, val);
  };

  return (
    <UnitFieldsComponent
      headers={headers}
      listUnitFields={listUnitFields}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      selectedUnitsData={selectedUnitsData}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  unitFields: state.unitFields,
});
const mapDispatchToProps = (dispatch) => ({
  getListUnitFields: (page, limit, keyword) =>
    UnitFieldsActions.getUnitFieldsListDataRequested(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(UnitFieldsActions.setSelectedUnitFieldsData({}));
    await dispatch(UnitFieldsActions.setSelectedUnitFieldsId(""));
    dispatch(UnitFieldsActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    UnitFieldsActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(UnitFieldsActions.setFormStatus("edit"));
    await dispatch(UnitFieldsActions.setSelectedUnitFieldsId(record.id));
    await dispatch(UnitFieldsActions.setSelectedUnitFieldsData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await UnitFieldsActions.mapDetailUnitFieldToForm();
  },
  handlePressDelete: async (unitFieldsId) => {
    await dispatch(UnitFieldsActions.setSelectedUnitFieldsId(unitFieldsId));
    UnitFieldsActions.deleteUnitFieldRequested(unitFieldsId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitFieldsContainer);

export default reduxForm({
  form: "unitFieldsForm",
})(EnhanceContainer);
