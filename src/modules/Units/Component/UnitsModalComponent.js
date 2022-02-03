import React, { useState } from "react";
import CModal from "../../../components/CModal/CModal";
import { Field, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { Upload, message, Typography } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../app/Helpers";

const { Text } = Typography;

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

const RenderContent = ({
  handleSubmit,
  submitForm,
  formName,
  handleUploadPhoto,
  selectedUnitsData,
}) => {
  const [imageUrl, setImageUrl] = useState(selectedUnitsData.photo ?? "");
  const [loading, setLoading] = useState("");

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      info.file.status = "done";
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log("=== info.file.originFileObj : ", info.file.originFileObj);
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
      <h6 class="card-title text-center">{formName}</h6>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div class="col-md-12">
          <Text style={{ marginBottom: 10 }}>Foto Unit</Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{ height: "100%", width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div class="col-md-12 mt-3">
          <Field name="name" label="Nama Unit" component={CInput} type="text" />
        </div>
        <div class="col-md-12">
          <Field
            name="description"
            label="Deskripsi"
            component={CInput}
            type="text"
          />
        </div>
      </Form>
    </div>
  );
};

const UnitsModalComponent = (props) => {
  const {
    isModalVisible,
    handleSubmit,
    submitForm,
    isLoadingFormGlobal,
    handleCancel,
    formName,
    enumMenu,
    handleUploadPhoto,
    formStatus,
    selectedUnitsData,
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
          formStatus={formStatus}
          enumMenu={enumMenu}
          handleUploadPhoto={handleUploadPhoto}
          selectedUnitsData={selectedUnitsData}
        />
      }
    />
  );
};

export default UnitsModalComponent;
