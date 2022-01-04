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
          style={{ width: 240 }}
          cover={<Image width={"100%"} src={item.path} />}
        >
          <Meta title={item.title} description={item.description} />
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
