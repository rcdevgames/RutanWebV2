import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as FormCategoryActions from "../Store/FormCategoryActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import FormCategoryComponent from "../Component/FormCategoryComponent";

const FormCategoryContainer = (props) => {
  const {
    getListBranch,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    formCategory: { listFormCategory },
  } = props;

  if (listFormCategory.length > 0) {
    listFormCategory.map((item, index) => {
      listFormCategory[index] = { ...item, no: index + 1 };
    });
  }

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "30%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Nama Roles",
      dataIndex: "name",
      key: "name",
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
    getListBranch();
  }, []);

  return (
    <FormCategoryComponent
      headers={headers}
      listFormCategory={listFormCategory}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  formCategory: state.formCategory,
});
const mapDispatchToProps = (dispatch) => ({
  getListBranch: () => FormCategoryActions.getFormCatgeoryListDataRequested(),
  handlePressAddNew: async () => {
    await dispatch(FormCategoryActions.setSelectedFormCategoryData({}));
    await dispatch(FormCategoryActions.setSelectedFormCategoryId(""));
    dispatch(FormCategoryActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    FormCategoryActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(FormCategoryActions.setFormStatus("edit"));
    await dispatch(FormCategoryActions.setSelectedFormCategoryId(record.id));
    await dispatch(FormCategoryActions.setSelectedFormCategoryData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await FormCategoryActions.mapDetailCategoryToForm();
  },
  handlePressDelete: async (formCategoryId) => {
    await dispatch(FormCategoryActions.setSelectedFormCategoryId(formCategoryId));
    FormCategoryActions.deleteFormCategoryRequested(formCategoryId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCategoryContainer);

export default reduxForm({
  form: "formCategory",
})(EnhanceContainer);
