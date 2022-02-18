import React from "react";
import { Typography, Row, Empty, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const RenderHistories = ({ histories }) => {
  const columns = [
    {
      title: "Karyawan",
      dataIndex: "user_name",
    },
    {
      title: "Judul",
      dataIndex: "title",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
    },
    {
      title: "Dibuat",
      dataIndex: "created_date",
    },
  ];
  const data = [];
  histories.map((item, index) => {
    data.push({
      key: index,
      user_name: item.user_name,
      title: item.title,
      description: item.description,
      created_date: moment(item.created_date).format("DD-MMM-YYYY"),
    });
  });
  return <Table columns={columns} dataSource={data} size="middle" />;
};

const TabPanelHistoriesComponent = (props) => {
  const { histories } = props;
  return (
    <div class="page-content">
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <EditOutlined />
        <Typography style={{ marginLeft: 5 }}>Riwayat</Typography>
      </Row>
      <hr />
      {histories.length > 0 ? (
        <RenderHistories histories={histories} />
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelHistoriesComponent;
