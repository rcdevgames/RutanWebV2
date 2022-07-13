import React from "react";
import { Badge, Divider, Input, Table } from "antd";
import { calculateColumnsWidth, categoryServices } from "../../../app/Helpers";
import CSelect from "../../../components/CSelect/CSelect";

const { Search } = Input;

const ListServiceComponent = (props) => {
  const {
    headers,
    listServices,
    enumType,
    enumStatus,
    onChangePagination,
    paging,
    onSearch,
    columns,
  } = props;

  const pagination = {
    total: paging.totalPage * paging.limit,
    current: paging.page,
    pageSize: paging.limit,
    onChange: onChangePagination,
  };
  // const tableHeight = 500;
  // const maxWidthPerCell = 600;

  // This helper function helps to calculate the width for each column
  // based on all table cells - column cell and source cell
  // const dataTable = calculateColumnsWidth(
  //   columns,
  //   listServices,
  //   maxWidthPerCell
  // );

  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row d-flex justify-content-between mb-2 align-items-center">
                  <h6 class="ml-3 card-title">List Service</h6>
                </div>
                <Divider orientation="left">Keterangan</Divider>
                <div class="row">
                  {categoryServices.map((item, index) => (
                    <div class="ml-3" key={("service", index)}>
                      <Badge status={item.status} text={item.name} />
                    </div>
                  ))}
                </div>
                <Divider orientation="left">Filter Data</Divider>
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">
                    <div class="row d-flex mb-2">
                      {/* This Filter */}
                      <div class="col-md-6">
                        <CSelect
                          data={enumType ?? []}
                          name="typeService"
                          label="Filter Tipe"
                          placeholder="- Tampilkan Semua -"
                        />
                      </div>
                      <div class="col-md-6">
                        <CSelect
                          data={enumStatus ?? []}
                          name="statusService"
                          label="Filter Status"
                          placeholder="- Tampilkan Semua -"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mt-4">
                    <Search
                      placeholder="Cari"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                </div>
                <div class="table-responsive">
                  <Table
                    bordered
                    columns={headers}
                    dataSource={listServices}
                    size={"middle"}
                    pagination={{
                      size: 3,
                      pageSizeOptions: ["10", "20", "50"],
                      showSizeChanger: true,
                      ...pagination,
                    }}
                    // scroll={{ x: dataTable.tableWidth, y: tableHeight }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListServiceComponent;
