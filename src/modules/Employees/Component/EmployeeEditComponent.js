import React from "react";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import {
  LoadingOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Checkbox, Col, message, Row, Typography, Upload } from "antd";
import { getBase64 } from "../../../app/Helpers";

const SelectRole = (props) => {
  const { data, defaultValues, onChangeRoleEmployee } = props;

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
    enumRole,
    enumProvince,
    enumCity,
    selectedRoleEmployee,
    onChangeRoleEmployee,
    handleUploadPhoto,
    defaultImage,
    onChangeProvince,
    onBackAction,
    formStatus,
  } = props;

  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    if (defaultImage) {
      setImageUrl(defaultImage);
    }
  }, [defaultImage]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      info.file.status = "done";
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
        handleUploadPhoto(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
                        name="nik"
                        label="NIK"
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
                        onChange={(val) => onChangeProvince(val)}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <Field
                        name="password"
                        label="Password"
                        placeholder="* Isi jika ingin merubah password"
                        component={CInput}
                        type="text"
                      />
                    </div>
                    <div class="col-md-6">
                      <CSelect
                        name="city"
                        data={enumCity}
                        label="Kota/Kabupaten"
                        disabled={enumCity.length <= 0}
                      />
                    </div>
                  </div>
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
                      <Typography style={{ textAlign: "left" }}>
                        Foto Profil
                      </Typography>
                      <div
                        class="card-body"
                        style={{
                          marginLeft: -22,
                          marginTop: -20,
                        }}
                      >
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader overflow-hidden"
                          showUploadList={false}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {imageUrl || defaultImage ? (
                            <>
                              <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  resizeMode: "stretch",
                                  borderRadius: 5,
                                }}
                              />
                              <div
                                class="row"
                                style={{
                                  backgroundColor: "#F3F3F3",
                                  position: "absolute",
                                  width: 80,
                                  heigh: 30,
                                  borderRadius: 50,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  opacity: 0.7,
                                }}
                              >
                                <Typography style={{ fontSize: 10 }}>
                                  Ubah
                                </Typography>
                                <EditOutlined
                                  style={{
                                    color: "#020202",
                                    fontSize: 10,
                                    marginLeft: 5,
                                  }}
                                />
                              </div>
                            </>
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </div>
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
                      {formStatus === "edit" && (
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
                      )}
                      <br />
                    </div>
                  </div>
                  <div class="row ml-2">
                    <CButtonAntd
                      key="submit"
                      type="primary"
                      loading={false}
                      onClick={onBackAction}
                      danger
                      icon={<ArrowLeftOutlined />}
                    >
                      Kembali
                    </CButtonAntd>
                    <div class="ml-3" />
                    <CButtonAntd
                      key="submit"
                      type="primary"
                      loading={false}
                      onClick={handleSubmit(submitForm)}
                    >
                      Simpan
                    </CButtonAntd>
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
