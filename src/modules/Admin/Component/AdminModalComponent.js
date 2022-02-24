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
        <div class="col-md-12">
          <Field
            name="username"
            label="Username"
            placeholder=""
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-12">
          <Field
            name="fullname"
            label="Nama Lengkap"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-12">
          <Field
            name="password"
            label="Password"
            component={CInput}
            type="password"
          />
        </div>
      </Form>
    </div>
  );
};

const AdminModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumMenu,
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
        />
      }
    />
  );
};

export default AdminModalComponent;
