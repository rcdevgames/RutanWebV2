import React from "react";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../components/CTable/CTableAntd";
import { PlusOutlined } from "@ant-design/icons";

const CustomerComponent = (props) => {
  const { headers, listCustomers, renderActionTable, handlePressAddNew } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row d-flex justify-content-between mb-2">
                  <h6 class="ml-3 card-title">Data Customer</h6>
                  <CButtonAntd
                    onClick={handlePressAddNew}
                    type="primary"
                    icon={<PlusOutlined />}
                    size="middle"
                  >
                    Tambah Customer
                  </CButtonAntd>
                </div>
                <div class="table-responsive">
                  <CTableAntd
                    data={listCustomers}
                    headers={headers}
                    renderActions={renderActionTable}
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

export default CustomerComponent;
