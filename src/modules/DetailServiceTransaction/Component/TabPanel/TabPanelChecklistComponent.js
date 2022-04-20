import React from "react";
import { Typography, Row, Empty, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const RenderChecklist = ({ checklist }) => {
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
  checklist.map((item, index) => {
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

const TabPanelChecklistComponent = (props) => {
  const { checklist } = props;
  return (
    <div class="page-content">
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <EditOutlined />
        <Typography style={{ marginLeft: 5 }}>Checklist</Typography>
      </Row>
      <hr />
      {checklist.length > 0 ? (
        <RenderChecklist rejections={checklist} />
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelChecklistComponent;
