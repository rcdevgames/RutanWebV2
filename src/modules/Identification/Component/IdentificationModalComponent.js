import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CSelect from "../../../components/CSelect/CSelect";

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
  formStatus,
  listCustomer,
  listType,
  listBranch,
  listLocation,
  listMilling
}) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="col-md-12">
          {formStatus === "edit" && (
            <Field
              name="id"
              label="ID Cabang"
              placeholder="-"
              component={CInput}
              type="text"
              disabled
            />
          )}
        </div>
        <div class="col-md-12">
          <CSelect
            // onChange={(val) => handleAutoPopulateUnitModel(val, indexUnit)}
            showSearch
            data={listCustomer}
            label="Nama Customer"
            name="customer"
          />
          <div class="row">
            <div class="col-md-6">
              <CSelect data={listBranch} label="Cabang" name="branch" />
            </div>
            <div class="col-md-6">
              <CSelect data={listLocation} label="Lokasi" name="location" />
            </div>
          </div>
          <CSelect data={listType} label="Tipe Identifikasi" name="type" />
          <CSelect data={listMilling} label="Milling" name="milling" />
        </div>
      </Form>
    </div>
  );
};

const IdentificationModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumMenu,
    formStatus,
    enumCustomers,
    enumType,
    enumBranch,
    enumLocation,
    enumMilling,
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
          listCustomer={enumCustomers}
          listType={enumType}
          listBranch={enumBranch}
          listLocation={enumLocation}
          listMilling={enumMilling}
        />
      }
    />
  );
};

export default IdentificationModalComponent;
