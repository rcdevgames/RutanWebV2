import React from "react";
import { Field, FieldArray, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { Checkbox, Col, Row, Upload } from "antd";

const EmployeeEditComponent = (props) => {
  const {
    handleSubmit,
    submitForm,
    enumBranch,
    detailEmployee,
    isLoadingFormGlobal,
  } = props;

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const SelectRole = (props) => {
    const {
      // onChange,
      // options,
      // plainOptions,
      // optionsWithDisabled,
    } = props;
    const onChange = (checkedValues) => {
      console.log("checked = ", checkedValues);
    };

    const options = [
      { label: "Apple", value: "Apple" },
      { label: "Pear", value: "Pear" },
      { label: "Orange", value: "Orange" },
      { label: "Banana", value: "Banana" },
      { label: "Pearl", value: "Pearl" },
      { label: "Bamboo", value: "Bamboo" },
    ];

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
          onChange={onChange}
        >
          <Row>
            {options.map((item, index) => {
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
                <Form onSubmit={handleSubmit(submitForm)}>
                  <div class="row">
                    <div class="col-md-6">
                      <Field
                        name={"name"}
                        label="Nama Karyawan"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-6">
                      <Field
                        name={`city`}
                        label="Kota/Kabupaten"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <Field
                        name={`name`}
                        label="No. Telepon"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-6">
                      <Field
                        name={`province`}
                        label="Provinsi"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <CSelect data={enumBranch} name="branch" label="Cabang" />
                      {/* <CSelect data={enumRole} name="role" label="Pilih Role" /> */}
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
                          <SelectRole />
                        </div>
                      </div>
                      <br />
                    </div>
                    <div class="col-md-6">
                      <div class="card-body">
                        <img
                          class="img-fluid mb-2 img-responsive"
                          src={
                            detailEmployee.photo ??
                            "https://cdn3.vectorstock.com/i/1000x1000/50/32/user-icon-male-person-symbol-profile-avatar-vector-20715032.jpg"
                          }
                          alt=""
                        />
                        <Upload
                          name="logo"
                          action="/upload.do"
                          listType="picture"
                        >
                          <CButtonAntd icon={<UploadOutlined />}>
                            Ubah Foto
                          </CButtonAntd>
                        </Upload>
                      </div>
                    </div>
                  </div>
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
