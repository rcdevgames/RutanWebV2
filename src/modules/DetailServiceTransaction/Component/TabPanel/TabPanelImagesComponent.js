import React, { Fragment } from "react";
import { Typography, Row, Empty, Card, Col, Image, Divider, Spin } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

const RenderImage = ({ medias, unit }) => {
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
  const { medias, handlePressAdd, isLoaded, isBlockedRole } = props;

  return (
    <div class="page-content">
      {!isLoaded ? (
        <div class="d-flex justify-content-center align-items-center">
          <Spin />
        </div>
      ) : (
        <Fragment>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Row
              style={{
                alignItems: "center",
              }}
            >
              <CameraOutlined />
              <Typography style={{ marginLeft: 5 }}>Media</Typography>
            </Row>
            {!isBlockedRole && (
              <CButtonAntd
                onClick={handlePressAdd}
                type="primary"
                icon={<PlusCircleOutlined />}
                size="middle"
              >
                Tambah Gambar
              </CButtonAntd>
            )}
          </Row>
          <hr />
          {medias && medias.length > 0 ? (
            medias.map((item, index) => (
              <div>
                <Divider
                  style={{
                    textTransform: "uppercase",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                  plain
                >{`Unit ${item.unitName}`}</Divider>
                <Row>
                  <RenderImage medias={item.image} unit={item.unitName} />
                </Row>
              </div>
            ))
          ) : (
            <div>
              <Empty />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default TabPanelImagesComponent;
