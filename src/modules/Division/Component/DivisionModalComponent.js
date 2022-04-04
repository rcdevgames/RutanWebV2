import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { Typography } from "antd";
import CSelect from "../../../components/CSelect/CSelect";

const { Text } = Typography;

const RenderFooter = ({ handleSaveForm }) => {
  return [
    <CButtonAntd
      key="submit"
      type="primary"
      loading={false}
      onClick={handleSaveForm}
    >
      Simpan
    </CButtonAntd>,
  ];
};

const RenderContent = ({
  handleSubmit,
  submitForm,
  formName,
  enumHeadDivision,
}) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="col-md-12 mt-3">
          <Field name="title" label="Judul" component={CInput} type="text" />
        </div>
        <div class="col-md-12 mt-3">
          <CSelect
            showSearch
            data={enumHeadDivision}
            name="headDivision"
            label="Kepala Divisi"
          />
        </div>
        <div class="col-md-12">
          <Field
            name="description"
            label="Deskripsi"
            component={CInput}
            type="text"
          />
        </div>
      </Form>
    </div>
  );
};

const DivisionModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    formStatus,
    enumHeadDivision,
  } = props;

  return (
    <CModal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={<RenderFooter handleSaveForm={handleSubmit} />}
      content={
        <RenderContent
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          isLoadingFormGlobal={isLoadingFormGlobal}
          formName={formName}
          formStatus={formStatus}
          enumHeadDivision={enumHeadDivision}
        />
      }
    />
  );
};

export default DivisionModalComponent;
