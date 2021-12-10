import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";

const RenderFooter = () => {
  return [
    <CButtonAntd
      key="submit"
      type="primary"
      loading={false}
      onClick={() => console.log("test")}
    >
      Simpan
    </CButtonAntd>,
  ];
};

const RenderContent = ({ handleSubmit, submitForm, isLoadingFormGlobal }) => {
  return (
    <div class="page-content">
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="col-md-12">
          <Field
            name="roleId"
            label="Role ID"
            placeholder="-"
            component={CInput}
            type="text"
            disabled
          />
        </div>
        <div class="col-md-12">
          <Field
            name="roleDescription"
            label="Nama Role"
            component={CInput}
            type="text"
          />
        </div>
      </Form>
    </div>
  );
};

const RolesEditModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
  } = props;
  return (
    <CModal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={<RenderFooter />}
      content={
        <RenderContent
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          isLoadingFormGlobal={isLoadingFormGlobal}
        />
      }
    />
  );
};

export default RolesEditModalComponent;
