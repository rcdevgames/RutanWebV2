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
  enumProvince,
  onChangeProvince,
  cities,
  enumBranch,
}) => {
  return (
    <div class="page-content">
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="row">
          <div class="col-md-6">
            <Field
              name="name"
              label="Nama Customer"
              placeholder="Nama.."
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-6">
            <Field
              name="picPhone"
              label="Telepon PIC"
              component={CInput}
              type="text"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Field
              name="username"
              label="Username"
              placeholder="Username.."
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-6">
            <CSelect
              onChange={(val) => onChangeProvince(val)}
              data={enumProvince}
              name="province"
              label="Nama Provinsi"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Field
              name="password"
              label="Password"
              placeholder="Password.."
              component={CInput}
              type="password"
            />
          </div>
          <div class="col-md-6">
            <CSelect
              data={cities}
              name="city"
              label="Kota/Kabupaten"
              disabled={cities.length <= 0}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Field
              name="phone"
              label="Telepon"
              placeholder="cth: 0821xxx"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-6">
            <CSelect data={enumBranch} name="branch" label="Cabang" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Field
              name="workHour"
              label="Jam Kerja"
              placeholder="cth : 08:00 - 15:20"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-6">
            <Field
              name="pic"
              label="PIC"
              placeholder="PIC"
              component={CInput}
              type="text"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <Field
              name="address"
              label="Alamat"
              component={CInput}
              type="textarea"
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

const CustomerModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumMenu,
    enumProvince,
    onChangeProvince,
    cities,
    enumBranch,
  } = props;

  return (
    <CModal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={<RenderFooter handleSaveForm={handleSubmit} />}
      width={900}
      content={
        <RenderContent
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          isLoadingFormGlobal={isLoadingFormGlobal}
          formName={formName}
          enumMenu={enumMenu}
          enumProvince={enumProvince}
          onChangeProvince={onChangeProvince}
          cities={cities}
          enumBranch={enumBranch}
        />
      }
    />
  );
};

export default CustomerModalComponent;
