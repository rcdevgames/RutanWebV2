import React from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { Checkbox, Col, Divider, message, Row, Typography, Upload } from "antd";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getBase64 } from "../../../app/Helpers";
import CSelect from "../../../components/CSelect/CSelect";

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

const RenderContent = ({
  handleSubmit,
  submitForm,
  beforeUpload,
  handleChange,
  imageUrl,
  defaultImage,
  uploadButton,
  enumUnit,
}) => {
  return (
    <div class="page-content">
      <Divider orientation="left">Tambah Media</Divider>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <div
            class="card-body"
            style={{
              marginLeft: -22,
              marginTop: -20,
              alignSelf: "center",
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
                  {<img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "stretch",
                      borderRadius: 5,
                    }}
                  />}
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
                    <Typography style={{ fontSize: 10 }}>Ubah</Typography>
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
        </Row>
        <div class="row mt-2">
          <div class="col-md-12">
            <Field
              name="title"
              label="Judul"
              component={CInput}
              typeComponents="text"
            />
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
              data={enumUnit}
              name="unit"
              label="Pilih Unit"
              // onChange={(customer) => {
              //   onChangeUnit(customer);
              // }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

const InsertImageModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumUnit,
    menuChecked,
    formStatus,
    onChangeRoleMenu,
    defaultImage,
    handleUploadPhoto,
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
          enumUnit={enumUnit}
          defaultValuesMenu={menuChecked}
          formStatus={formStatus}
          onChangeRoleMenu={onChangeRoleMenu}
          setImageUrl={setImageUrl}
          setLoading={setLoading}
          beforeUpload={beforeUpload}
          handleChange={handleChange}
          uploadButton={uploadButton}
          imageUrl={imageUrl}
        />
      }
    />
  );
};

export default InsertImageModalComponent;
