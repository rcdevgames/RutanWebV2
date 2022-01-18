import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as JobFormsActions from "../Store/JobFormsActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import JobFormsComponent from "../Component/JobFormsComponent";

const JobFormsContainer = (props) => {
  const {
    getListJobForms,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    jobForms: { listJobForms },
  } = props;

  if (listJobForms.length > 0) {
    listJobForms.map((item, index) => {
      listJobForms[index] = { ...item, no: index + 1 };
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
    getListJobForms();
  }, []);

  return (
    <JobFormsComponent
      headers={headers}
      listJobForms={listJobForms}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  jobForms: state.jobForms,
});
const mapDispatchToProps = (dispatch) => ({
  getListJobForms: () => JobFormsActions.getJobFormsListDataRequested(),
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
