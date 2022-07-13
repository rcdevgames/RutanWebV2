import { Table } from "antd";
import React from "react";
import '../../../app/style/tableStyle.css'

const DashboardComponent = (props) => {
  const { userDetail, headers, listServices, dashboard } = props;
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
                      <h6 class="card-title mb-0">Total Customer</h6>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-12 col-xl-8">
                        <h3 class="mb-2">{dashboard.totalCustomer}</h3>
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
                    </div>
                    <div class="row">
                      <div class="col-6 col-md-12 col-xl-8">
                        <h3 class="mb-2">{dashboard.totalInternalService}</h3>
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
                    </div>
                    <div class="row">
                      <div class="col-6 col-md-12 col-xl-8">
                        <h3 class="mb-2">{dashboard.totalExternalService}</h3>
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
                    </div>
                    <div class="row">
                      <div class="col-6 col-md-12 col-xl-8">
                        <h3 class="mb-2">{dashboard.totalIdentification}</h3>
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
                    bordered
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
