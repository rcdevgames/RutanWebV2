import React from "react";
import { Input } from "antd";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../../components/CTable/CTableAntd";
import {
  PlusOutlined,
  ArrowLeftOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { navigate } from "../../../../app/Helpers";
import EmployeeToolsModalContainer from "../../Container/EmployeeTools/EmployeeToolsModalContainer";
import { Link } from "react-router-dom";

const { Search } = Input;

const EmployeeToolsComponent = (props) => {
  const {
    headers,
    listEmployeeTools,
    renderActionTable,
    handlePressAddNew,
    onChangePagination,
    paging,
    onSearch,
    selectedEmployeeData,
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
                <div class="row d-flex justify-content-between mb-2">
                  <h6 class="ml-3 card-title">{`Karyawan : ${selectedEmployeeData.name}`}</h6>
                </div>
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">
                    <div class="row ml-2 mb-2">
                      <Link to={"/employees"}>
                        <CButtonAntd
                          type="primary"
                          icon={<ArrowLeftOutlined />}
                          size="middle"
                          danger
                        >
                          Kembali
                        </CButtonAntd>
                      </Link>
                      <div class="ml-2" />
                      <CButtonAntd
                        onClick={handlePressAddNew}
                        type="primary"
                        icon={<PlusOutlined />}
                        size="middle"
                      >
                        Tambah Peralatan
                      </CButtonAntd>
                      <div class="ml-2" />
                      <CButtonAntd
                        onClick={handlePressGeneratePdf}
                        type="primary"
                        icon={<FilePdfOutlined />}
                        size="middle"
                      >
                        Cetak PDF
                      </CButtonAntd>
                    </div>
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
                    data={listEmployeeTools}
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
      <EmployeeToolsModalContainer />
    </div>
  );
};

export default EmployeeToolsComponent;
