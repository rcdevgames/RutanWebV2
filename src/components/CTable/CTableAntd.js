import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const CTableAntd = (props) => {
  const { data, headers, renderActions, size, pagination } = props;

  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const searchInput = React.useRef();

  const getColumnSearchProps = (dataIndex) => ({
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [];
  headers.map((item, index) => {
    columns.push({
      title: item.title,
      dataIndex: item.dataIndex,
      key: item.dataIndex,
      width: item.width ?? "30%",
      sorter: item.sorter,
      render: item.render,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(item.dataIndex),
    });
  });

  if (renderActions) {
    columns.push({
      align: "center",
      title: "Aksi",
      key: "action",
      width: "30%",
      render: renderActions,
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      size={size ?? "middle"}
      pagination={{
        size: 3,
        pageSizeOptions: ["10", "20", "50"],
        showSizeChanger: true,
        ...pagination,
      }}
      // {...props}
    />
  );
};

CTableAntd.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  renderActions: PropTypes.any,
};

export default CTableAntd;
