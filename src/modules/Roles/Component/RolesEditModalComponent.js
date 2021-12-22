import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { Checkbox, Col, Row } from "antd";

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

const SelectRole = (props) => {
  const {
    data,
    defaultValuesMenu,
    onChangeRoleMenu,
    // options,
    // plainOptions,
    // optionsWithDisabled,
  } = props;

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

const RenderContent = ({
  handleSubmit,
  submitForm,
  formName,
  enumMenu,
  defaultValuesMenu,
  formStatus,
  onChangeRoleMenu,
}) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="col-md-12">
          <Field
            name="id"
            label="Role ID"
            placeholder="-"
            component={CInput}
            type="text"
            disabled
          />
        </div>
        <div class="col-md-12">
          <Field
            name="description"
            label="Nama Role"
            component={CInput}
            type="text"
          />
        </div>
      </Form>
      {formStatus === "edit" && (
        <>
          <hr />
          <h6 class="card-title text-center">Pilih Menu</h6>
          <SelectRole
            data={enumMenu}
            defaultValuesMenu={defaultValuesMenu}
            onChangeRoleMenu={onChangeRoleMenu}
          />
        </>
      )}
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
    formName,
    enumMenu,
    menuChecked,
    formStatus,
    onChangeRoleMenu,
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
          defaultValuesMenu={menuChecked}
          formStatus={formStatus}
          onChangeRoleMenu={onChangeRoleMenu}
        />
      }
    />
  );
};

export default RolesEditModalComponent;
