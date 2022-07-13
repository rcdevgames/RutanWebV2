import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as JobFormsActions from "../Store/JobFormsActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import JobFormsComponent from "../Component/JobFormsComponent";
import { store } from "../../../app/ConfigureStore";
import { getIndex } from "../../../app/Helpers";

const JobFormsContainer = (props) => {
  const {
    getListJobForms,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    jobForms: { listJobForms, paging },
  } = props;

  const { page, limit, totalPage } = paging;

  if (listJobForms.length > 0) {
    listJobForms.map((item, index) => {
      listJobForms[index] = { ...item, no: getIndex(page, limit)[index] };
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
      title: "Judul",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      width: "40%",
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
    getListJobForms(page, limit);
  }, []);

  const onSearch = (val) => {
    getListJobForms(page, limit, val);
  };

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(JobFormsActions.setPagingJobForm(paging));
    getListJobForms(nextPage, pageSize);
  };

  return (
    <JobFormsComponent
      headers={headers}
      listJobForms={listJobForms}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onSearch={onSearch}
      onChangePagination={onChangePagination}
      paging={paging}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  jobForms: state.jobForms,
});
const mapDispatchToProps = (dispatch) => ({
  getListJobForms: (page, limit, val) =>
    JobFormsActions.getJobFormsListDataRequested(page, limit, val),
  handlePressAddNew: async () => {
    await dispatch(JobFormsActions.setSelectedJobFormsData({}));
    await dispatch(JobFormsActions.setSelectedJobFormsId(""));
    dispatch(JobFormsActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    JobFormsActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(JobFormsActions.setFormStatus("edit"));
    await dispatch(JobFormsActions.setSelectedJobFormsId(record.id));
    await dispatch(JobFormsActions.setSelectedJobFormsData(record));
    await dispatch(ComponentActions.setGlobalModal(true));
    await JobFormsActions.mapDetailJobFormsToForm();
  },
  handlePressDelete: async (jobFormsId) => {
    await dispatch(JobFormsActions.setSelectedJobFormsId(jobFormsId));
    JobFormsActions.deleteJobFormsRequested(jobFormsId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JobFormsContainer);

export default reduxForm({
  form: "branchForm",
})(EnhanceContainer);
