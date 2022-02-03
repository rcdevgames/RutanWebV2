import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";

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

const RenderContent = ({ handleSubmit, submitForm, formName }) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="row">
          <div class="col-md-12 mt-3">
            <Field
              name="name"
              label="Nama Model"
              component={CInput}
              type="text"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <Field
              name="serialNumber"
              label="Serial Number"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-4">
            <Field
              name="engineModel"
              label="Model Mesin"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-4">
            <Field
              name="machineNo"
              label="Nomor Mesin"
              component={CInput}
              type="text"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Field
              name="chasisNo"
              label="Nomor Chasis"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-6">
            <Field
              name="transmissionNo"
              label="Nomor Transmisi"
              component={CInput}
              type="text"
            />
          </div>
        </div>
        <div class="row">
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

const UnitsModelsModalComponent = (props) => {
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
        />
      }
    />
  );
};

export default UnitsModelsModalComponent;
