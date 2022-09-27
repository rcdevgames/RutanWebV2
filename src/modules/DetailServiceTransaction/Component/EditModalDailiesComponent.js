import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { Checkbox, Col, Divider, Row, TimePicker, Typography } from "antd";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CSelect from "../../../components/CSelect/CSelect";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { enumTypeActivities } from "../../../app/Helpers";
import moment from "moment";

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

const RenderContent = ({
  handleSubmit,
  submitForm,
  formName,
  enumMenu,
  defaultValuesMenu,
  formStatus,
  onChangeRoleMenu,
  handleCancel,
  typeFormDailies,
  handleChangeTimePicker,
  timeStartEnd,
}) => {
  return (
    <div class="page-content">
      <Divider orientation="left">{`${
        typeFormDailies === "add" ? "Tambah" : "Ubah"
      } Catatan Teknisi`}</Divider>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="row mt-2">
          <div class="col-md-12">
            <Field
              name="title"
              label="Judul"
              // placeholder=""
              component={CInput}
              typeComponents="text"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6">
            <Typography
              style={{ marginBottom: 7 }}
            >{`Jam Mulai -> Selesai`}</Typography>
            <TimePicker.RangePicker
              name="timeStartEnd"
              value={[timeStartEnd[0] ?? "", timeStartEnd[1] ?? ""]}
              onChange={handleChangeTimePicker}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-5">
            <CDatePicker name="startDate" label="Tanggal Mulai" />
          </div>
          <div class="col-md-5">
            <CDatePicker name="endDate" label="Tanggal Akhir" />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-md-12">
            <Field
              name="description"
              label="Deskripsi"
              component={CInput}
              typeComponents="text"
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-12">
            <CSelect
              showSearch
              data={enumTypeActivities}
              name="activityType"
              label="Pilih Kegiatan"
            />
          </div>
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

const EditModalDailiesComponent = (props) => {
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
    handleChangeTimePicker,
    timeStartEnd,
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
          handleChangeTimePicker={handleChangeTimePicker}
          timeStartEnd={timeStartEnd}
        />
      }
    />
  );
};

export default EditModalDailiesComponent;
