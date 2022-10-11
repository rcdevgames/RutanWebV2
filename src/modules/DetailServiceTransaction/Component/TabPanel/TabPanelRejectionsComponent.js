import React from "react";
import { Typography, Row, Empty, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const RenderDailies = ({ rejections }) => {
  const columns = [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Alasan Reject",
      dataIndex: "reason",
    },
    {
      title: "Tanggal Di-Reject",
      dataIndex: "created_date",
    },
  ];
  const data = [];
  rejections.map((item, index) => {
    data.push({
      no: index + 1,
      nik: item.nik,
      employee_name: item.employee_name,
      reason: item.reason,
      created_date: item.created_date,
    });
  });
  return <Table bordered columns={columns} dataSource={data} size="middle" />;
};

const TabPanelRejectionsComponent = (props) => {
  const { rejections } = props;
  return (
    <div class="page-content">
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <EditOutlined />
        <Typography style={{ marginLeft: 5 }}>Alasan Reject</Typography>
      </Row>
      <hr />
      {rejections.length > 0 ? (
        <RenderDailies rejections={rejections} />
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelRejectionsComponent;
