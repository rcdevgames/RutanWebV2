import React from "react";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import CTableAntd from "../../../components/CTable/CTableAntd";
import { PlusOutlined } from "@ant-design/icons";
import FormCategoryModalContainer from "../Container/FormCategoryModalContainer";

const FormCategoryComponent = (props) => {
  const { headers, listFormCategory, renderActionTable, handlePressAddNew } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row d-flex justify-content-between mb-2 align-items-center">
                  <h6 class="ml-3 card-title">Data Kategori Form</h6>
                  <CButtonAntd
                    onClick={handlePressAddNew}
                    type="primary"
                    icon={<PlusOutlined />}
                    size="middle"
                  >
                    Tambah Kategori Form
                  </CButtonAntd>
                </div>
                <div class="table-responsive">
                  <CTableAntd
                    data={listFormCategory}
                    headers={headers}
                    renderActions={renderActionTable}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormCategoryModalContainer />
    </div>
  );
};

export default FormCategoryComponent;
