import React from "react";
import { Badge, Divider, Table } from "antd";
import { categoryServices } from "../../../app/Helpers";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CSelect from "../../../components/CSelect/CSelect";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import CInput from "../../../components/CInput/CInput";
import { Field } from "redux-form";

// const { Search } = Input;

const ReportEmployeeComponent = (props) => {
  const { headers, listReportEmployee, onSearch, enumBranch } = props;

  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row d-flex justify-content-between mb-2 align-items-center">
                  <h6 class="ml-3 card-title">Laporan Service Repair</h6>
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
                <div class="row mb-4 align-items-center">
                  <div class="col-md-2">
                    <CDatePicker name="startDate" label="Dari" />
                  </div>
                  <div class="col-md-2">
                    <CDatePicker name="endDate" label="Sampai" />
                  </div>
                  <div class="col-md-3 mt-4">
                    <CSelect
                      data={enumBranch ?? []}
                      name="branch"
                      label="Cabang"
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
                        // onClick={handlePressGeneratePdf}
                        type="primary"
                        icon={<PrinterOutlined />}
                        size="middle"
                      >
                        Print
                      </CButtonAntd>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <Table
                    columns={headers}
                    dataSource={listReportEmployee}
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

export default ReportEmployeeComponent;
