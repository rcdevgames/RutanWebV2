import React from "react";
import { Badge, Divider, Input, Table } from "antd";
import CTableAntd from "../../../components/CTable/CTableAntd";
import { categoryServices } from "../../../app/Helpers";

const { Search } = Input;

const ListServiceComponent = (props) => {
  const {
    headers,
    listServices,
    renderActionTable,
    onChangePagination,
    paging,
    onSearch,
  } = props;

  const pagination = {
    total: paging.totalPage * paging.limit,
    current: paging.page,
    pageSize: paging.limit,
    onChange: onChangePagination,
  };

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
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7"></div>
                  <div class="col-md-4">
                    <Search
                      placeholder="Cari"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                </div>
                <div class="table-responsive">
                  <Table
                    columns={headers}
                    dataSource={listServices}
                    size={"middle"}
                    pagination={{
                      size: 3,
                      pageSizeOptions: ["10", "20", "50"],
                      showSizeChanger: true,
                      ...pagination,
                    }}
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
