import React from "react";
import CBadgeText from "../../../components/CBadgeText/CBadgeText";
import CButtonIcon from "../../../components/CButtonIcon/CButtonIcon";
const AdminComponent = (props) => {
  const { headers, listAdmin } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Data Administrator</h6>
                <div class="table-responsive">
                  <table id="dataTableExample" class="table">
                    <thead>
                      <tr>
                        {headers.map((item, index) => (
                          <th
                            className="text-left"
                            colSpan={item === "Aksi" ? 2 : 1}
                            key={`key-label-header-table-${index} center`}
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {listAdmin.length > 0 &&
                        listAdmin.map((item, index) => {
                          return (
                            <tr
                              key={`list-admin-${index}`}
                              className="text-left"
                            >
                              <td>{index + 1}</td>
                              <td>{item.username}</td>
                              <td>{item.fullname}</td>
                              <td>{item["created_date"]}</td>
                              <div class="row mt-2">
                                <CButtonIcon
                                  onPress={() => {
                                    console.log("=== Test : ", index);
                                  }}
                                  type="warning"
                                  icon="edit"
                                />
                                <div class="ml-4" />
                                <CButtonIcon type="danger" icon="trash" />
                              </div>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
