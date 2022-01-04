import React from "react";
import { Card, Typography, Col, Row, Image } from "antd";
import CBadgeText from "../../../../components/CBadgeText/CBadgeText";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import {
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

const RenderDescription = ({
  data,
  handlePressNonactive,
  handlePressActive,
}) => {
  return (
    <div>
      <hr />
      <Row style={{ backgroundColor: "#F6F7FA", padding: 4 }}>
        <div class="col-md-5">
          <Text>Nik</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong>{data.nik}</Text>
        </div>
      </Row>
      <Row style={{ backgroundColor: "#FFFFFF", padding: 4 }}>
        <div class="col-md-5">
          <Text>Telepon</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong>{data.phone}</Text>
        </div>
      </Row>
      <Row style={{ backgroundColor: "#F6F7FA", padding: 4 }}>
        <div class="col-md-5">
          <Text>Alamat</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong style={{ fontSize: 12 }}>
            {data.address}
          </Text>
        </div>
      </Row>
      <Row style={{ backgroundColor: "#FFFFFF", padding: 4 }}>
        <div class="col-md-5">
          <Text>Tanggal Mulai</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <Text strong>{data.created_date}</Text>
        </div>
      </Row>
      <Row style={{ backgroundColor: "#F6F7FA", padding: 4 }}>
        <div class="col-md-5">
          <Text>Status</Text>
        </div>
        <div class="col-md-1">:</div>
        <div class="col-md-6">
          <CBadgeText type={data.active ? "success" : "danger"}>
            {data.active ? "Aktif" : "Tidak Aktif"}
          </CBadgeText>
        </div>
      </Row>
      <div class="mt-3">
        {data.active ? (
          <CButtonAntd
            onClick={handlePressNonactive}
            type="primary"
            icon={<DeleteOutlined />}
            size="middle"
            danger
          >
            Non-Aktifkan Teknisi
          </CButtonAntd>
        ) : (
          <CButtonAntd
            onClick={handlePressActive}
            type="primary"
            icon={<CheckCircleOutlined />}
            size="middle"
          >
            Aktifkan teknisi
          </CButtonAntd>
        )}
      </div>
    </div>
  );
};

const TabPanelEmployeeComponent = (props) => {
  const {
    employees,
    handlePressAddNew,
    handlePressNonactive,
    jobId,
    handlePressActive,
  } = props;
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
                  description={
                    <RenderDescription
                      data={item}
                      handlePressNonactive={() =>
                        handlePressNonactive(
                          jobId,
                          item.employee_service_id,
                          item.id
                        )
                      }
                      handlePressActive={() =>
                        handlePressActive(
                          jobId,
                          item.employee_service_id,
                          item.id
                        )
                      }
                    />
                  }
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
