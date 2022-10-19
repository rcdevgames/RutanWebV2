import React from "react";
import { Input } from "antd";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../../components/CTable/CTableAntd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { navigate } from "../../../../app/Helpers";
import CSelect from "../../../../components/CSelect/CSelect";
import ModalUnitSerialNumberContainer from "../../Container/UnitSerialNumber/ModalUnitSerialNumberContainer";
import { Link } from "react-router-dom";

const { Search } = Input;

const UnitSerialNumberComponent = (props) => {
  const {
    headers,
    listUnitSerialNumber,
    listCustomer,
    renderActionTable,
    handlePressAddNew,
    onChangePagination,
    paging,
    onSearch,
    selectedUnitModelsData,
    onChangeCustomer,
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
                <div class="mb-2">
                  <h6 class="ml-1 card-title">{`Unit Serial Number : ${selectedUnitModelsData.name}`}</h6>
                  <p class="card-description ml-1">
                    Silahkan pilih customer untuk menampilkan data serial number
                  </p>
                </div>
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">
                    <div class="row ml-1 mb-3">
                      <Link to={"unit-models"}>
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
                        Tambah Serial Number
                      </CButtonAntd>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <CSelect
                      showSearch
                      data={listCustomer}
                      name="customer"
                      label="Pilih Customer"
                      onChange={(customer) => {
                        onChangeCustomer(customer);
                      }}
                    />
                  </div>
                  <div class="col-md-4 mt-4">
                    <Search
                      name="keyword"
                      placeholder="Cari"
                      onSearch={onSearch}
                      enterButton
                    />
                  </div>
                </div>
                <div class="table-responsive">
                  <CTableAntd
                    data={listUnitSerialNumber}
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
      <ModalUnitSerialNumberContainer />
    </div>
  );
};

export default UnitSerialNumberComponent;
