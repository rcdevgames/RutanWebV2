import React from "react";
import { Badge, Divider, Table } from "antd";
import { categoryMonitoringServices } from "../../../app/Helpers";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CSelect from "../../../components/CSelect/CSelect";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { SearchOutlined, FilePdfOutlined } from "@ant-design/icons";
import CInput from "../../../components/CInput/CInput";
import { Field } from "redux-form";

// const { Search } = Input;

const MonitoringEmployeeComponent = (props) => {
  const {
    headers,
    listMonitoringEmployee,
    onChangePagination,
    paging,
    onSearch,
    enumBranch,
    enumTypeReport,
    handlePressGeneratePdf,
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
                <div class="row align-items-center">
                  <div class="col-md-3">
                    <CSelect
                      // onChange={(val) => onChangeProvince(val)}
                      data={enumTypeReport ?? []}
                      name="type"
                      label="Tipe"
                    />
                  </div>
                </div>
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
                      placeholder="-Pilih Semua-"
                    />
                  </div>
                  <div class="col-md-2 mt-3">
                    <Field
                      name="keyword"
                      label="Karyawan"
                      component={CInput}
                      type="text"
                    />
                  </div>
                  <div class="col-md-3 mt-4">
                    <div class="row d-flex">
                      <CButtonAntd
                        onClick={onSearch}
                        type="primary"
                        icon={<SearchOutlined />}
                        size="middle"
                      >
                        Cari
                      </CButtonAntd>
                      <div class="ml-2" />
                      <CButtonAntd
                        onClick={handlePressGeneratePdf}
                        type="primary"
                        icon={<FilePdfOutlined />}
                        size="middle"
                      >
                        Cetak Laporan
                      </CButtonAntd>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <Table
                    bordered
                    columns={headers}
                    dataSource={listMonitoringEmployee}
                    size={"small"}
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
