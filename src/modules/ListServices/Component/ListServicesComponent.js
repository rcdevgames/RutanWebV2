import React from "react";
import CBadgeText from "../../../components/CBadgeText/CBadgeText";
import CButtonIcon from "../../../components/CButtonIcon/CButtonIcon";
const ListServicesComponent = (props) => {
  const { headers, listServices } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">List Service</h6>
                <div class="row ml-2 align-items-center mb-4">
                  <div class="dot-internal"></div>
                  <span class="ml-2">Internal Service</span>
                  <div class="dot-external ml-2"></div>
                  <span class="ml-2">External Service</span>
                  <div class="dot-warranty ml-2"></div>
                  <span class="ml-2">Service with warranty</span>
                </div>
                <div class="table-responsive">
                  <table id="dataTableExample" class="table">
                    <thead>
                      <tr>
                        {headers.map((item, index) => (
                          <th
                            className="text-center"
                            colSpan={item === "Aksi" ? 2 : 1}
                            key={`key-label-header-table-${index} center`}
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {listServices.length > 0 &&
                        listServices.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>2011/04/25</td>
                              <td>
                                <CBadgeText
                                  type={
                                    item["is_external"] ? "success" : "info"
                                  }
                                >
                                  {item.type.toUpperCase()}
                                </CBadgeText>
                              </td>
                              <td>{item["customer_name"]}</td>
                              <td>Edinburgh</td>
                              <td>61</td>
                              <td>61</td>
                              <td>
                                <CBadgeText
                                  type={
                                    item.status === "Progress"
                                      ? "info"
                                      : "success"
                                  }
                                >
                                  {item.status.toUpperCase()}
                                </CBadgeText>
                              </td>
                              <td>
                                {item["created_date"].substr(
                                  0,
                                  item["created_date"].length - 6
                                )}
                              </td>
                              <div class="row mt-2">
                                <div class="ml-4">
                                  <CButtonIcon
                                    type="warning"
                                    icon="edit"
                                  ></CButtonIcon>
                                </div>
                                <div class="ml-2">
                                  <CButtonIcon
                                    type="danger"
                                    icon="trash"
                                  ></CButtonIcon>
                                </div>
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

export default ListServicesComponent;
