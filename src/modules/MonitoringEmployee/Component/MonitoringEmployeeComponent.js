import React from "react";
import { Input } from "antd";
import CTableAntd from "../../../components/CTable/CTableAntd";

const { Search } = Input;

const MonitoringEmployeeComponent = (props) => {
  const {
    headers,
    listMonitoringEmployee,

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
                  <h6 class="ml-3 card-title">Monitoring Karyawan</h6>
                </div>
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">{/* This for left side content */}</div>
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
                    data={listMonitoringEmployee}
                    headers={headers}
                    pagination={pagination}
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

export default MonitoringEmployeeComponent;
