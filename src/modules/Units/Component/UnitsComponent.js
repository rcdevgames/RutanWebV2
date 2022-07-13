import React from "react";
import { Input, Table, Tooltip } from "antd";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { PlusOutlined } from "@ant-design/icons";
import UnitsModalContainer from "../Container/UnitsModalContainer";

const { Search } = Input;

const UnitsComponent = (props) => {
  const {
    headers,
    listUnits,
    handlePressAddNew,
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
                <div class="row d-flex justify-content-between mb-2">
                  <h6 class="ml-3 card-title">Data Unit</h6>
                </div>
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">
                    <Tooltip placement="top" title="Edit unit">
                      <CButtonAntd
                        onClick={handlePressAddNew}
                        type="primary"
                        icon={<PlusOutlined />}
                        size="middle"
                      >
                        Tambah Unit
                      </CButtonAntd>
                    </Tooltip>
                  </div>
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
                    bordered
                    size="small"
                    columns={headers}
                    dataSource={listUnits}
                    // renderActions={renderActionTable}
                    pagination={pagination}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UnitsModalContainer />
    </div>
  );
};

export default UnitsComponent;
