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

const RenderContent = ({ handleSubmit, submitForm, enumTools }) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">Tambah Peralatan Karyawan</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="row mt-3">
          <div class="col-md-12">
            <CSelect
              showSearch
              data={enumTools}
              name="tools"
              label="Peralatan"
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
    enumTools,
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
          formStatus={formStatus}
          enumTools={enumTools}
        />
      }
    />
  );
};

export default EmployeeToolsModalComponent;
