import React from "react";
import { Divider, Input, Spin } from "antd";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../components/CTable/CTableAntd";
import { PlusOutlined } from "@ant-design/icons";
import CustomerModalContainer from "../Container/CustomerModalContainer";
import CSelect from "../../../components/CSelect/CSelect";

const { Search } = Input;

const CustomerComponent = (props) => {
  const {
    headers,
    listCustomers,
    renderActionTable,
    handlePressAddNew,
    onChangePagination,
    paging,
    onSearch,
    enumBranch,
    isBlocked,
    isLoading,
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
                  <h6 class="ml-3 card-title">Data Customer</h6>
                </div>
                <div class="row align-items-center">
                  <CButtonAntd
                    onClick={handlePressAddNew}
                    type="primary"
                    icon={<PlusOutlined />}
                    size="middle"
                  >
                    Tambah Customers
                  </CButtonAntd>
                </div>
                <Divider orientation="left">Filter Data</Divider>
                <div class="row d-flex mb-2 mt-3">
                  {!isBlocked && (
                    <div class="col-md-4">
                      <CSelect
                        data={enumBranch ?? []}
                        name="branch"
                        label="Cabang"
                      />
                    </div>
                  )}
                  <div class="col-md-4 mt-4">
                    <div class="mt-2" />
                    <Search
                      placeholder="Cari Customer"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                </div>
                {isLoading ? (
                  <div class="d-flex justify-content-center align-items-center">
                    <Spin />
                  </div>
                ) : (
                  <div class="table-responsive">
                    <CTableAntd
                      data={listCustomers}
                      headers={headers}
                      renderActions={renderActionTable}
                      pagination={pagination}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerModalContainer />
    </div>
  );
};

export default CustomerComponent;
