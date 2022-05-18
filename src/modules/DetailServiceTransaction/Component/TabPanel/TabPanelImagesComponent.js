import React from "react";
import { Typography, Row, Empty, Card, Col, Image } from "antd";
import { CameraOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { Meta } = Card;

const RenderImage = ({ medias }) => {
  return medias.map((item, index) => {
    return (
      <Col
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Card
          hoverable
          style={{ width: 240, height: 200 }}
          cover={<Image width={"100%"} height={150} src={item.path} />}
        >
          <Meta
            style={{ marginTop: -10 }}
            title={`Gambar Penting ${index + 1}`}
          />
        </Card>
      </Col>
    );
  });
};

const TabPanelImagesComponent = (props) => {
  const { medias } = props;

  return (
    <div class="page-content">
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <CameraOutlined />
        <Typography style={{ marginLeft: 5 }}>Media</Typography>
      </Row>
      <hr />
      {medias.length > 0 ? (
        <Row style={{}}>
          <RenderImage medias={medias} />
        </Row>
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelImagesComponent;
