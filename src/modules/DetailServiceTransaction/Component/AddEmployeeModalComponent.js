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

const RenderContent = ({ handleSubmit, submitForm, enumEmployee }) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">Tambah Teknisi</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="col-md-12">
          <CSelect
            showSearch
            data={enumEmployee}
            name="employee"
            label="Pilih Teknisi"
          />
        </div>
      </Form>
    </div>
  );
};

const AddEmployeeModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    handleCancel,
    enumEmployee,
  } = props;

  return (
    <CModal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={<RenderFooter handleSaveForm={handleSubmit} />}
      content={
        <RenderContent
          enumEmployee={enumEmployee}
          handleSubmit={handleSubmit}
          submitForm={submitForm}
        />
      }
    />
  );
};

export default AddEmployeeModalComponent;
