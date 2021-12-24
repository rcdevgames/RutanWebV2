import React from "react";
import { Card, Typography, Col, Row, Image } from "antd";
import CBadgeText from "../../../../components/CBadgeText/CBadgeText";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

const RenderDescription = ({ data, handlePressNonactive }) => {
  return (
    <div>
      <hr />
      <div class="row">
        <div class="col-md-5">
          <Text>Nik</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong>{data.nik}</Text>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <Text>Telepon</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong>{data.phone}</Text>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <Text>Alamat</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong>{data.address}</Text>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <Text>Tanggal Mulai</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong>{data.created_date}</Text>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <Text>Status</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <CBadgeText type={data.active ? "success" : "danger"}>
            {data.active ? "Aktif" : "Tidak Aktif"}
          </CBadgeText>
        </div>
      </div>
      <div class="mt-3">
        <CButtonAntd
          onClick={handlePressNonactive}
          type="primary"
          icon={<DeleteOutlined />}
          size="middle"
          danger
        >
          Non-Aktifkan Teknisi
        </CButtonAntd>
      </div>
    </div>
  );
};

const TabPanelEmployeeComponent = (props) => {
  const { employees, handlePressAddNew } = props;
  return (
    <div class="page-content">
      <Row style={{ marginLeft: 16 }}>
        <CButtonAntd
          onClick={handlePressAddNew}
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
        >
          Tambah Teknisi
        </CButtonAntd>
      </Row>
      <Row>
        {employees.map((item, index) => {
          return (
            <Col style={{ margin: 16 }}>
              <Text strong>{`Teknisi-${index + 1}`}</Text>
              <Card
                style={{ width: 350, marginTop: 8 }}
                cover={
                  <Image
                    alt="example"
                    src={
                      item.photo ??
                      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    }
                    width="100%"
                    height={200}
                  />
                }
              >
                <Meta
                  title={item.name}
                  description={<RenderDescription data={item} />}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TabPanelEmployeeComponent;
