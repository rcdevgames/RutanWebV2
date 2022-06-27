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
  enumCustomer,
}) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="row mt-3">
          <div class="col-md-12">
            <CSelect
              showSearch
              data={enumCustomer ?? []}
              name="customer"
              label="Pilih Customer"
            />
          </div>
          <div class="col-md-12">
            <Field
              name="serialNumber"
              label="Serial Number"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-12">
            <Field
              name="description"
              label="Deskripsi"
              component={CInput}
              typeComponent="textarea"
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

const ModalUnitSerialNumberComponent = (props) => {
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
    enumCustomer,
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
          enumCustomer={enumCustomer}
        />
      }
    />
  );
};

export default ModalUnitSerialNumberComponent;
