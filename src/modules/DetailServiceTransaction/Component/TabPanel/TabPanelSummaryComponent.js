import React from "react";
import { Typography, Row, Empty, Divider, Col } from "antd";
import { FileOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const RenderItemSummary = ({ summary }) => {
  return summary.length > 0 ? (
    summary.map((item, index) => <Typography>{item}</Typography>)
  ) : (
    <Typography>Summary belum ada</Typography>
  );
};

const TabPanelSummaryComponent = (props) => {
  const { summaryArr } = props;

  return (
    <div class="page-content">
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <FileOutlined />
        <Typography style={{ marginLeft: 5 }}>Laporan Akhir</Typography>
      </Row>
      <hr />
      <Row gutter={[16, 16]}>
        {summaryArr.length > 0 ? (
          summaryArr.map((item, index) => (
            <Col key={`col-unit-${index}`} span={12}>
              <div class="card p-2">
                <Divider
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  plain
                >{`Unit ${item.unitName}`}</Divider>
                <RenderItemSummary summary={item.summary} />
              </div>
            </Col>
          ))
        ) : (
          <div>
            <Empty />
          </div>
        )}
      </Row>
    </div>
  );
};

export default TabPanelSummaryComponent;
