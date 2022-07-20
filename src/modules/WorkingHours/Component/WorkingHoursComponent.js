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

const WorkingHoursComponent = (props) => {
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
                  <h6 class="ml-3 card-title">Jam Kerja Karyawan</h6>
                </div>

                <div class="row mb-4 align-items-center">
                  <div class="col-md-3">
                    <CDatePicker name="startDate" label="Dari" />
                  </div>
                  <div class="col-md-3">
                    <CDatePicker name="endDate" label="Sampai" />
                  </div>
                  <div class="col-md-3 mt-3">
                    <Field
                      name="keyword"
                      label="No. Service"
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

export default WorkingHoursComponent;
