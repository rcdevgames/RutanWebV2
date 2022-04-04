import React from "react";
import { Divider, Input } from "antd";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../components/CTable/CTableAntd";
import { PlusOutlined } from "@ant-design/icons";
import CSelect from "../../../components/CSelect/CSelect";

const { Search } = Input;

const EmployeeListComponent = (props) => {
  const {
    headers,
    listEmployees,
    renderActionTable,
    handlePressAddNew,
    onChangePagination,
    paging,
    onSearch,
    enumBranch,
    enumRoles,
    enumDivision,
    employeeFormValues,
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
                  <h6 class="ml-3 card-title">Data Karyawan</h6>
                </div>
                <div class="row mb-4 align-items-center">
                  <div class="col-md-7">
                    <CButtonAntd
                      onClick={handlePressAddNew}
                      type="primary"
                      icon={<PlusOutlined />}
                      size="middle"
                    >
                      Tambah Karyawan
                    </CButtonAntd>
                  </div>
                </div>
                <Divider orientation="left">Filter Data</Divider>
                <div class="row d-flex mb-2">
                  {/* This Filter */}
                  <div class="col-md-3">
                    <CSelect
                      data={enumRoles ?? []}
                      name="role"
                      label="Filter Role"
                    />
                  </div>
                  <div class="col-md-3">
                    <CSelect
                      data={enumBranch ?? []}
                      name="branch"
                      label="Filter Cabang"
                    />
                  </div>
                  <div class="col-md-3">
                    <CSelect
                      data={enumDivision ?? []}
                      name="division"
                      label="Filter Divisi"
                    />
                  </div>
                  <div class="col-md-3 mt-4">
                    <Search
                      placeholder="Cari"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                </div>
                <div class="table-responsive">
                  <CTableAntd
                    data={listEmployees}
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
    </div>
  );
};

export default EmployeeListComponent;
