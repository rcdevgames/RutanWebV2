import React from "react";
import CModal from "../../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import CSelect from "../../../../components/CSelect/CSelect";

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
  enumFormCategory,
  enumJobForm,
}) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="row mt-3">
          <div class="col-md-12">
            <CSelect
              showSearch
              data={enumFormCategory ?? []}
              name="formCategory"
              label="Kategori"
            />
          </div>
          <div class="col-md-12">
            <Field
              name="fieldName"
              label="Nama Field"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-12">
            <CSelect
              showSearch
              data={enumJobForm ?? []}
              name="jobForm"
              label="Jenis Form"
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
        </div>
      </Form>
    </div>
  );
};

const EmployeeToolsModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumMenu,
    handleUploadPhoto,
    formStatus,
    selectedUnitsData,
    enumFormCategory,
    enumJobForm,
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
          enumMenu={enumMenu}
          handleUploadPhoto={handleUploadPhoto}
          selectedUnitsData={selectedUnitsData}
          enumFormCategory={enumFormCategory}
          enumJobForm={enumJobForm}
        />
      }
    />
  );
};

export default EmployeeToolsModalComponent;
