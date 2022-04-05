import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as DivisionActions from "../Store/DivisionActions";
import * as DivisionUnitActions from "../Store/DivisionUnitActions";
import * as EmployeeActions from "../../Employees/Store/EmployeesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import {
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import UnitsComponent from "../Component/DivisionComponent";
import { getIndex, navigate } from "../../../app/Helpers";
import { store } from "../../../app/ConfigureStore";

const UnitsContainer = (props) => {
  const {
    getListDivision,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    handlePressDivisionUnit,
    division: { listDivision, paging },
    getListEmlpoyee 
  } = props;

  const { page, limit, totalPage } = paging;

  if (listDivision.length > 0) {
    listDivision.map((item, index) => {
      listDivision[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Judul",
      dataIndex: "title",
      key: "title",
      width: "30%",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Kepala Divisi",
      dataIndex: "employee_name",
      key: "employee_name",
      width: "20%",
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
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
        onClick={() => handlePressDivisionUnit(record)}
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
    getListDivision(page, limit);
    getListEmlpoyee(1, 99999);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(DivisionActions.setPagingDivision(paging));
    getListDivision(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListDivision(page, limit, val);
  };

  return (
    <UnitsComponent
      headers={headers}
      listUnits={listDivision}
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
  division: state.division,
});
const mapDispatchToProps = (dispatch) => ({
  getListDivision: (page, limit, keyword) =>
    DivisionActions.getDivisionListDataRequested(page, limit, keyword),
  getListEmlpoyee: (page, limit) => {
    EmployeeActions.loadEmployeeListData(page, limit);
  },
  handlePressAddNew: async () => {
    await dispatch(DivisionActions.setSelectedDivisionData({}));
    await dispatch(DivisionActions.setSelectedDivisionId(""));
    dispatch(DivisionActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    DivisionActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(DivisionActions.setFormStatus("edit"));
    await dispatch(DivisionActions.setSelectedDivisionId(record.id));
    await dispatch(DivisionActions.setSelectedDivisionData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await DivisionActions.mapDetailDivisionToForm();
  },
  handlePressDelete: async (divisionId) => {
    await dispatch(DivisionActions.setSelectedDivisionId(divisionId));
    DivisionActions.deleteDivisionRequested(divisionId);
  },
  handlePressDivisionUnit: async (record) => {
    await dispatch(ComponentActions.setGlobalLoading(true));
    await dispatch(DivisionActions.setSelectedDivisionId(record.id));
    await dispatch(DivisionActions.setSelectedDivisionData(record));
    setTimeout(() => {
      navigate("division-unit");
    }, 500);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitsContainer);

export default reduxForm({
  form: "divisionForm",
})(EnhanceContainer);
