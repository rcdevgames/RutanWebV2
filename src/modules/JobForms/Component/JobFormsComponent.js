import React from "react";
import { Field, FieldArray, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CButton from "../../../components/CButton/CButton";
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
    enumRole,
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
    return (
      <>
        {/* <Checkbox.Group
          options={options}
          defaultValue={["Pear"]}
          onChange={onChange}
        /> */}
        <Checkbox.Group
          {...props}
          style={{ width: "100%" }}
          onChange={onChange}
        >
          <Row>
            {options.map((item, index) => {
              return (
                <Col span={8}>
                  <Checkbox value={item.value}>{item.label}</Checkbox>
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
                        name={`name`}
                        label="Nama Karyawan"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-6">
                      <Field
                        name={`cityName`}
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
                        name={`provinceName`}
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
                      <CSelect data={enumRole} name="role" label="Pilih Role" />
                      <Field
                        name="employeeAddress"
                        label="Alamat"
                        component={CInput}
                        typeComponent="textarea"
                      />
                      <br />
                      {/* <h6 class="card-title">Pilih Role</h6> */}
                      {/* <Field
                        name="employeeRole"
                        label="Pilih Role"
                        component={SelectRole}
                        type="checkbox"
                      /> */}
                      {/* <SelectRole /> */}
                    </div>
                    <div class="col-md-6">
                      <div class="card-body">
                        <img
                          class="img-fluid mb-2"
                          src="https://via.placeholder.com/513x342"
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
