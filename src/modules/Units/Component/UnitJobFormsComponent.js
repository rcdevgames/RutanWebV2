import React from "react";
import { Input } from "antd";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../components/CTable/CTableAntd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { navigate } from "../../../app/Helpers";

const { Search } = Input;

const UnitJobFormsComponent = (props) => {
  const {
    headers,
    listUnitJobForms,
    renderActionTable,
    onSearch,
    selectedUnitsData,
  } = props;

  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="mb-2">
                  <h6 class="ml-1 card-title">{`Unit : ${selectedUnitsData.name}`}</h6>
                  {/* <p class="card-description ml-1">
                    Silahkan pilih customer untuk menampilkan data 
                  </p> */}
                </div>
                <div class="row d-flex justify-content-between mb-2">
                  <div class="col-md-7">
                    <div class="row ml-1 mb-3">
                      <CButtonAntd
                        onClick={() => navigate("unit")}
                        type="primary"
                        icon={<ArrowLeftOutlined />}
                        size="middle"
                        danger
                      >
                        Kembali
                      </CButtonAntd>
                    </div>
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
                  <CTableAntd data={listUnitJobForms} headers={headers} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitJobFormsComponent;
