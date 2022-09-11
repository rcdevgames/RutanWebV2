import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { Checkbox, Col, Divider, Row } from "antd";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const RenderFooter = ({ handleSaveForm, handleClose }) => {
  return [
    <CButtonAntd
      icon={<CloseOutlined />}
      key="submit"
      type="primary"
      loading={false}
      onClick={handleClose}
      danger
    >
      Tutup
    </CButtonAntd>,
    <CButtonAntd
      key="submit"
      icon={<CheckOutlined />}
      type="primary"
      loading={false}
      onClick={handleSaveForm}
    >
      Simpan
    </CButtonAntd>,
  ];
};

const SelectRole = (props) => {
  const { data, defaultValuesMenu, onChangeRoleMenu } = props;

  const Item = ({ item }) => {
    return (
      <Checkbox name={`item.${item.value}`} value={item.value}>
        {item.label}
      </Checkbox>
    );
  };

  return (
    <>
      <Checkbox.Group
        {...props.input}
        style={{ width: "100%" }}
        defaultValue={defaultValuesMenu}
        onChange={onChangeRoleMenu}
      >
        <Row>
          {data.map((item, index) => {
            return (
              <Col span={8}>
                <Field
                  item={item}
                  name={`item.${item.value}`}
                  component={Item}
                />
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    </>
  );
};

const RenderContent = ({ handleSubmit, submitForm, handleKeyDown }) => {
  return (
    <div class="page-content">
      <Divider orientation="left">Ubah laporan</Divider>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="row mt-2">
          <div class="col-md-12">
            <Field
              name="summary"
              label="Detail Laporan"
              component={CInput}
              typeComponent="textarea"
              linebreak
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

const EditModalSummaryComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumMenu,
    menuChecked,
    formStatus,
    onChangeRoleMenu,
    typeFormDailies,
  } = props;

  return (
    <CModal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={
        <RenderFooter
          handleSaveForm={handleSubmit}
          handleClose={handleCancel}
        />
      }
      content={
        <RenderContent
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          isLoadingFormGlobal={isLoadingFormGlobal}
          formName={formName}
          enumMenu={enumMenu}
          defaultValuesMenu={menuChecked}
          formStatus={formStatus}
          onChangeRoleMenu={onChangeRoleMenu}
          typeFormDailies={typeFormDailies}
        />
      }
    />
  );
};

export default EditModalSummaryComponent;
