import React from "react";
import { Typography, Row, Empty, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const RenderDailies = ({ dailies }) => {
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
  dailies.map((item, index) => {
    data.push({
      key: index,
      karyawan: "Jim Green",
      deskripsi: item.description,
      mulai: moment(item.daily_start).format("DD-MMM-YYYY"),
      selesai: moment(item.daily_end).format("DD-MMM-YYYY"),
      jam: moment(item.daily_end).format("HH:mm:ss"),
    });
  });
  return <Table columns={columns} dataSource={data} size="middle" />;
};

const TabPanelDailiesComponent = (props) => {
  const { dailies } = props;
  return (
    <div class="page-content">
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <EditOutlined />
        <Typography style={{ marginLeft: 5 }}>Catatan</Typography>
      </Row>
      <hr />
      {dailies.length > 0 ? (
        <RenderDailies dailies={dailies} />
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelDailiesComponent;
