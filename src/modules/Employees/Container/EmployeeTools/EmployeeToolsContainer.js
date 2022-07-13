import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as EmployeeToolsActions from "../../Store/EmployeeTools/EmployeeToolsActions";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import { getIndex } from "../../../../app/Helpers";
import { store } from "../../../../app/ConfigureStore";
import EmployeeToolsComponent from "../../Component/EmployeeTools/EmployeeToolsComponent";
import { generateEmployeeToolsReport } from "../../Store/EmployeeTools/EmployeeToolsReport";

const EmployeeToolsContainer = (props) => {
  const {
    getListEmployeeTools,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    employeeTools: { listEmployeeTools, paging },
    employees: { selectedEmployeeData, selectedEmployeeId },
    employeeToolsFormValues,
  } = props;

  const { page, limit, totalPage } = paging;

  if (listEmployeeTools.length > 0) {
    listEmployeeTools.map((item, index) => {
      listEmployeeTools[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Nama Peralatan",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.length - b.name.length,
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
    getListEmployeeTools(selectedEmployeeId, page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(EmployeeToolsActions.setPagingEmployeeTools(paging));
    getListEmployeeTools(selectedEmployeeId, nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListEmployeeTools(selectedEmployeeId, page, limit, val);
  };

  const handlePressGeneratePdf = () => {
    const dataPrinted = {
      selectedEmployeeData,
      listEmployeeTools,
    };
    generateEmployeeToolsReport(dataPrinted, employeeToolsFormValues);
  };

  return (
    <EmployeeToolsComponent
      headers={headers}
      listEmployeeTools={listEmployeeTools}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      selectedEmployeeData={selectedEmployeeData}
      handlePressGeneratePdf={handlePressGeneratePdf}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  employeeTools: state.employeeTools,
});
const mapDispatchToProps = (dispatch) => ({
  getListEmployeeTools: (employeeId, page, limit, keyword) =>
    EmployeeToolsActions.getEmployeeToolsRequested(
      employeeId,
      page,
      limit,
      keyword
    ),
  handlePressAddNew: async () => {
    await dispatch(EmployeeToolsActions.setSelectedEmployeeToolsData({}));
    await dispatch(EmployeeToolsActions.setSelectedEmployeeToolsId(""));
    dispatch(EmployeeToolsActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    EmployeeToolsActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(EmployeeToolsActions.setFormStatus("edit"));
    await dispatch(EmployeeToolsActions.setSelectedEmployeeToolsId(record.id));
    await dispatch(EmployeeToolsActions.setSelectedEmployeeToolsData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await EmployeeToolsActions.mapDetailEmployeeToolsToForm();
  },
  handlePressDelete: async (unitFieldsId) => {
    await dispatch(
      EmployeeToolsActions.setSelectedEmployeeToolsId(unitFieldsId)
    );
    EmployeeToolsActions.deleteEmployeeToolsRequested(unitFieldsId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeToolsContainer);

export default reduxForm({
  form: "employeeToolsForm",
})(EnhanceContainer);
