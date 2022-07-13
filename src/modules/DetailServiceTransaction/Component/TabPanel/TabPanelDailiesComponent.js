import React from "react";
import { Typography, Row, Empty, Table, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";

const RenderDailies = ({ dailies, handlePressEdit }) => {
  const renderActionTable = (text, record) => (
    <Space size="middle">
      <CButtonAntd
        onClick={() => {
          handlePressEdit(record);
        }}
        type="primary"
        icon={<EditOutlined />}
        size="middle"
      />
    </Space>
  );

  const columns = [
    {
      title: "Karyawan",
      dataIndex: "karyawan",
    },
    {
      title: "Judul",
      dataIndex: "title",
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
  columns.push({
    align: "center",
    title: "Aksi",
    key: "action",
    width: "10%",
    render: renderActionTable,
  });
  const data = [];
  dailies.map((item, index) => {
    data.push({
      key: index,
      id: item.id,
      karyawan: item.employee_name,
      title: item.title,
      deskripsi: item.description,
      mulai: moment(item.daily_start).format("DD-MMM-YYYY HH:mm:ss"),
      selesai: moment(item.daily_end).format("DD-MMM-YYYY HH:mm:ss"),
      jam: item.hours,
    });
  });
  return <Table bordered columns={columns} dataSource={data} size="middle" />;
};

const TabPanelDailiesComponent = (props) => {
  const { dailies, handlePressEdit } = props;
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
      {dailies && dailies.length > 0 ? (
        <RenderDailies dailies={dailies} handlePressEdit={handlePressEdit} />
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default TabPanelDailiesComponent;
