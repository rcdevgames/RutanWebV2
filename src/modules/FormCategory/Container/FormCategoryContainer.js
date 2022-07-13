import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as FormCategoryActions from "../Store/FormCategoryActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import FormCategoryComponent from "../Component/FormCategoryComponent";
import { getIndex } from "../../../app/Helpers";
import { store } from "../../../app/ConfigureStore";

const FormCategoryContainer = (props) => {
  const {
    getListFormCategory,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    formCategory: { listFormCategory, paging, keyword },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listFormCategory.length > 0) {
    listFormCategory.map((item, index) => {
      listFormCategory[index] = { ...item, no: getIndex(page, limit)[index] };
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
    getListFormCategory(page, limit, keyword);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(FormCategoryActions.setPagingFormCategory(paging));
    getListFormCategory(nextPage, pageSize);
  };

  const onSearch = (val) => {
    getListFormCategory(page, limit, val);
  };

  return (
    <FormCategoryComponent
      headers={headers}
      listFormCategory={listFormCategory}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  formCategory: state.formCategory,
});
const mapDispatchToProps = (dispatch) => ({
  getListFormCategory: (page, limit, keyword) =>
    FormCategoryActions.getFormCatgeoryListDataRequested(page, limit, keyword),
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
    await dispatch(
      FormCategoryActions.setSelectedFormCategoryId(formCategoryId)
    );
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
