import React from "react";
import { Input } from "antd";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../components/CTable/CTableAntd";
import { PlusOutlined } from "@ant-design/icons";
import CustomerModalContainer from "../Container/CustomerModalContainer";

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
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">
                    <CButtonAntd
                      onClick={handlePressAddNew}
                      type="primary"
                      icon={<PlusOutlined />}
                      size="middle"
                    >
                      Tambah Customers
                    </CButtonAntd>
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
                  <CTableAntd
                    data={listCustomers}
                    headers={headers}
                    renderActions={renderActionTable}
                    pagination={pagination}
                  />
                </div>
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
