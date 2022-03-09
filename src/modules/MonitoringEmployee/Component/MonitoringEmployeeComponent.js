import React from "react";
import { Badge, Divider, Input, Table } from "antd";
import { categoryMonitoringServices } from "../../../app/Helpers";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CSelect from "../../../components/CSelect/CSelect";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { PrinterOutlined } from "@ant-design/icons";

const { Search } = Input;

const MonitoringEmployeeComponent = (props) => {
  const {
    headers,
    listMonitoringEmployee,
    onChangePagination,
    paging,
    onSearch,
    enumBranch,
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
                <Divider orientation="left">Keterangan</Divider>
                <div class="row">
                  {categoryMonitoringServices.map((item, index) => (
                    <div class="ml-3" key={("service", index)}>
                      <Badge status={item.status} text={item.name} />
                    </div>
                  ))}
                </div>
                <Divider orientation="left">Filter Data</Divider>
                <div class="row mb-4 align-items-center">
                  <div class="col-md-2">
                    <CDatePicker name="startDate" label="Dari" />
                  </div>
                  <div class="col-md-2">
                    <CDatePicker name="endDate" label="Sampai" />
                  </div>
                  <div class="col-md-3 mt-4">
                    <CSelect
                      // onChange={(val) => onChangeProvince(val)}
                      data={enumBranch ?? []}
                      name="branch"
                      label="Cabang"
                    />
                  </div>
                  <div class="col-md-3 mt-4">
                    <Search
                      placeholder="Cari Karyawan"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                  <div class="col-md-2 mt-4">
                    <CButtonAntd
                      // onClick={handlePressGeneratePdf}
                      type="primary"
                      icon={<PrinterOutlined />}
                      size="middle"
                    >
                      Print
                    </CButtonAntd>
                  </div>
                </div>
                <div class="table-responsive">
                  <Table
                    columns={headers}
                    dataSource={listMonitoringEmployee}
                    size={"small"}
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

export default MonitoringEmployeeComponent;
