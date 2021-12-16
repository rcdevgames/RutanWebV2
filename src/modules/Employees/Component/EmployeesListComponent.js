import React from "react";
import CTableAntd from "../../../components/CTable/CTableAntd";
// import RolesEditModalContainer from "../Container/RolesEditModalContainer";
const EmployeesListComponent = (props) => {
  const { headers, listRoles, renderActionTable } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Data Karyawan</h6>
                <div class="table-responsive">
                  <CTableAntd
                    data={listRoles}
                    headers={headers}
                    renderActions={renderActionTable}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <RolesEditModalContainer {...props} /> */}
    </div>
  );
};

export default EmployeesListComponent;
