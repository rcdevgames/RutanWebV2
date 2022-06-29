import React from "react";
import { Typography, Row, Empty, Divider } from "antd";
import { FileOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const RenderItemSummary = ({ summary }) => {
  return summary.length > 0 ? (
    summary.map((item, index) => (
      <div key={`item-summary-${index}`}>
        <Typography>{item}</Typography>
      </div>
    ))
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
      {summaryArr.length > 0 ? (
        summaryArr.map((item, index) => (
          <div key={`item-unit-label-${index}`}>
            <Divider
              style={{ textTransform: "capitalize" }}
              plain
            >{`Unit ${item.unitName}`}</Divider>
            <RenderItemSummary summary={item.summary} />
          </div>
        ))
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelSummaryComponent;
