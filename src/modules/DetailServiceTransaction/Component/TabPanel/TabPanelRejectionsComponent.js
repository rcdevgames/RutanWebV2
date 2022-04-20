import React from "react";
import { Typography, Row, Empty, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const RenderDailies = ({ rejections }) => {
  const columns = [
    {
      title: "Karyawan",
      dataIndex: "karyawan",
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
    },
    {
      title: "Mulai",
      dataIndex: "mulai",
    },
    {
      title: "Selesai",
      dataIndex: "selesai",
    },
    {
      title: "Jam",
      dataIndex: "jam",
    },
  ];
  const data = [];
  rejections.map((item, index) => {
    data.push({
      key: index,
      karyawan: item.employee_name,
      deskripsi: item.description,
      mulai: moment(item.daily_start).format("DD-MMM-YYYY"),
      selesai: moment(item.daily_end).format("DD-MMM-YYYY"),
      jam: moment(item.daily_end).format("HH:mm:ss"),
    });
  });
  return <Table columns={columns} dataSource={data} size="middle" />;
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
