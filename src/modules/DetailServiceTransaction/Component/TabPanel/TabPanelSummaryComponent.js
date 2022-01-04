import React from "react";
import { Typography, Row, Empty } from "antd";
import { FileOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const TabPanelSummaryComponent = (props) => {
  const { summary } = props;
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
      {summary.summary ? (
        <Paragraph>{summary.summary}</Paragraph>
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelSummaryComponent;
