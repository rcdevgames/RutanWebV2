import React from "react";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { UploadOutlined } from "@ant-design/icons";
import { Checkbox, Col, Image, Row, Upload } from "antd";

const SelectRole = (props) => {
  const {
    data,
    defaultValues,
    onChangeRoleEmployee,
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
        onChange={onChangeRoleEmployee}
        defaultValue={defaultValues}
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

const EmployeeEditComponent = (props) => {
  const {
    handleSubmit,
    submitForm,
    enumBranch,
    detailEmployee,
    enumRole,
    enumProvince,
    enumCity,
    isLoadingFormGlobal,
    handleUploadPhoto,
    selectedRoleEmployee,
    onChangeRoleEmployee,
  } = props;

  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title">Profil Karyawan</h1>
                <p class="card-description">
                  Anda dapat mengelola role ataupun mengubah data karyawan pada
                  halaman ini.
                </p>
                <Form>
                  <div class="row">
                    <div class="col-md-6">
                      <Field
                        name={"name"}
                        label="Nama Karyawan"
                        placeholder="-"
                        component={CInput}
                        type="text"
                      />
                    </div>
                    <div class="col-md-6">
                      <CSelect
                        data={enumProvince}
                        name="province"
                        label="Nama Provinsi"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <Field
                        name={`phone`}
                        label="No. Telepon"
                        placeholder="-"
                        component={CInput}
                        type="text"
                      />
                    </div>
                    <div class="col-md-6">
                      <CSelect
                        name="city"
                        data={enumCity}
                        label="Kota/Kabupaten"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <CSelect data={enumBranch} name="branch" label="Cabang" />
                      <Field
                        name="address"
                        label="Alamat"
                        component={CInput}
                        typeComponent="textarea"
                      />
                      <hr />
                      <div class="card">
                        <div class="card-body">
                          <h6 class="card-title text-center">Pilih Role</h6>
                          <SelectRole
                            data={enumRole}
                            defaultValues={selectedRoleEmployee}
                            onChangeRoleEmployee={onChangeRoleEmployee}
                          />
                        </div>
                      </div>
                      <br />
                    </div>
                    <div class="col-md-6">
                      <div class="card-body">
                        <Image
                          width={400}
                          height={300}
                          src={
                            detailEmployee.photo ??
                            `https://cdn3.vectorstock.com/i/1000x1000/50/32/user-icon-male-person-symbol-profile-avatar-vector-20715032.jpg`
                          }
                        />
                        <br />
                        <Upload
                          name="profilePicture"
                          listType="picture"
                          onChange={handleUploadPhoto}
                        >
                          <CButtonAntd icon={<UploadOutlined />}>
                            Ubah Foto
                          </CButtonAntd>
                        </Upload>
                      </div>
                    </div>
                  </div>
                  <CButtonAntd
                    key="submit"
                    type="primary"
                    loading={false}
                    onClick={handleSubmit(submitForm)}
                  >
                    Simpan
                  </CButtonAntd>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEditComponent;
