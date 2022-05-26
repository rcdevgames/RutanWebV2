import { Table } from "antd";
import React from "react";

const DashboardComponent = (props) => {
  const { userDetail, headers, listServices } = props;
  return (
    <div>
      <div class="page-content">
        <div class="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <h4 class="mt-5 ml-2">{`Hallo, ${
            userDetail.fullname ?? "Anonym"
          }`}</h4>
        </div>
        <div class="row">
          <div class="col-12 col-xl-12 stretch-card">
            <div class="row flex-grow">
              <div class="col-md-3 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-baseline">
                      <h6 class="card-title mb-0">Total Customers</h6>
                    </div>
                    <div class="row">
                      <div class="col-6 col-md-12 col-xl-5">
                        <h3 class="mb-2">3,897</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-baseline">
                      <h6 class="card-title mb-0">Total Service Internal</h6>
                      <div class="dropdown mb-2">
                        <button
                          class="btn p-0"
                          type="button"
                          id="dropdownMenuButton1"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            class="icon-lg text-muted pb-3px"
                            data-feather="more-horizontal"
                          ></i>
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="eye" class="icon-sm mr-2"></i>{" "}
                            <span class="">View</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="edit-2" class="icon-sm mr-2"></i>{" "}
                            <span class="">Edit</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="trash" class="icon-sm mr-2"></i>{" "}
                            <span class="">Delete</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="printer" class="icon-sm mr-2"></i>{" "}
                            <span class="">Print</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="download" class="icon-sm mr-2"></i>{" "}
                            <span class="">Download</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-md-12 col-xl-5">
                        <h3 class="mb-2">35,084</h3>
                        <div class="d-flex align-items-baseline">
                          <p class="text-danger">
                            <span>-2.8%</span>
                            <i
                              data-feather="arrow-down"
                              class="icon-sm mb-1"
                            ></i>
                          </p>
                        </div>
                      </div>
                      <div class="col-6 col-md-12 col-xl-7">
                        <div id="apexChart2" class="mt-md-3 mt-xl-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-baseline">
                      <h6 class="card-title mb-0">Total Service External</h6>
                      <div class="dropdown mb-2">
                        <button
                          class="btn p-0"
                          type="button"
                          id="dropdownMenuButton2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            class="icon-lg text-muted pb-3px"
                            data-feather="more-horizontal"
                          ></i>
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton2"
                        >
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="eye" class="icon-sm mr-2"></i>{" "}
                            <span class="">View</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="edit-2" class="icon-sm mr-2"></i>{" "}
                            <span class="">Edit</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="trash" class="icon-sm mr-2"></i>{" "}
                            <span class="">Delete</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="printer" class="icon-sm mr-2"></i>{" "}
                            <span class="">Print</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="download" class="icon-sm mr-2"></i>{" "}
                            <span class="">Download</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-md-12 col-xl-5">
                        <h3 class="mb-2">89.87%</h3>
                        <div class="d-flex align-items-baseline">
                          <p class="text-success">
                            <span>+2.8%</span>
                            <i data-feather="arrow-up" class="icon-sm mb-1"></i>
                          </p>
                        </div>
                      </div>
                      <div class="col-6 col-md-12 col-xl-7">
                        <div id="apexChart3" class="mt-md-3 mt-xl-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-baseline">
                      <h6 class="card-title mb-0">Total Identifikasi</h6>
                      <div class="dropdown mb-2">
                        <button
                          class="btn p-0"
                          type="button"
                          id="dropdownMenuButton2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i
                            class="icon-lg text-muted pb-3px"
                            data-feather="more-horizontal"
                          ></i>
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton2"
                        >
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="eye" class="icon-sm mr-2"></i>{" "}
                            <span class="">View</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="edit-2" class="icon-sm mr-2"></i>{" "}
                            <span class="">Edit</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="trash" class="icon-sm mr-2"></i>{" "}
                            <span class="">Delete</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="printer" class="icon-sm mr-2"></i>{" "}
                            <span class="">Print</span>
                          </a>
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                          >
                            <i data-feather="download" class="icon-sm mr-2"></i>{" "}
                            <span class="">Download</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-md-12 col-xl-5">
                        <h3 class="mb-2">89.87%</h3>
                        <div class="d-flex align-items-baseline">
                          <p class="text-success">
                            <span>+2.8%</span>
                            <i data-feather="arrow-up" class="icon-sm mb-1"></i>
                          </p>
                        </div>
                      </div>
                      <div class="col-6 col-md-12 col-xl-7">
                        <div id="apexChart3" class="mt-md-3 mt-xl-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-xl-12 grid-margin stretch-card"></div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-xl-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline mb-2">
                  <h6 class="card-title mb-0">10 Service Terbaru</h6>
                </div>
                <p class="text-muted mb-4">
                  Menampilkan 10 service berdasarkan tanggal terbaru
                </p>
                {/* <div class="monthly-sales-chart-wrapper"> */}
                {/* <canvas id="monthly-sales-chart"></canvas> */}
                <div class="table-responsive">
                  <Table
                    columns={headers}
                    dataSource={listServices}
                    size={"middle"}
                    pagination={{
                      size: 3,
                      pageSizeOptions: ["10", "20", "50"],
                      showSizeChanger: true,
                      // ...pagination,
                    }}
                  />
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
