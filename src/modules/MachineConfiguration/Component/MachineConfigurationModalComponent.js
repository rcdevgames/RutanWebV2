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

const RenderContent = ({ handleSubmit, submitForm, formName, formStatus }) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        {formStatus === "edit" && (
          <div class="col-md-12">
            <Field
              name="id"
              label="ID Konfigurasi Mesin"
              placeholder="-"
              component={CInput}
              type="text"
              disabled
            />
          </div>
        )}
        <div class="col-md-12">
          <Field
            name="name"
            label="Nama Konfigurasi Mesin"
            component={CInput}
            type="text"
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

const MachineConfigurationModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumMenu,
    formStatus,
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
          enumMenu={enumMenu}
          formStatus={formStatus}
        />
      }
    />
  );
};

export default MachineConfigurationModalComponent;
