import React from "react";
import { Input } from "antd";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../../components/CTable/CTableAntd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { navigate } from "../../../../app/Helpers";
import UnitFieldsModalContainer from "../../Container/UnitFields/UnitFieldsModalContainer";

const { Search } = Input;

const UnitFieldsComponent = (props) => {
  const {
    headers,
    listUnitFields,
    renderActionTable,
    handlePressAddNew,
    onChangePagination,
    paging,
    onSearch,
    selectedUnitsData,
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
                  <h6 class="ml-3 card-title">{`Field Unit : ${selectedUnitsData.name}`}</h6>
                </div>
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">
                    <div class="row">
                      <CButtonAntd
                        onClick={() => navigate("unit")}
                        type="primary"
                        icon={<ArrowLeftOutlined />}
                        size="middle"
                        danger
                      >
                        Kembali
                      </CButtonAntd>
                      <div class="ml-2" />
                      <CButtonAntd
                        onClick={handlePressAddNew}
                        type="primary"
                        icon={<PlusOutlined />}
                        size="middle"
                      >
                        Tambah Field
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
                    data={listUnitFields}
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
      <UnitFieldsModalContainer />
    </div>
  );
};

export default UnitFieldsComponent;
