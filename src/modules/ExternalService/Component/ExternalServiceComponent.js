import React from "react";

const ExternalServiceComponent = () => {
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Buat External Service</h6>
                <p class="card-description">
                  Form yang ditujukan untuk pembuatan external service baru yang
                  akan dikerjakan oleh teknisi.
                </p>
                <form class="forms-sample">
                  <div class="form-group row">
                    <div class="col">
                      <div class="form-group">
                        <label>Tipe</label>
                        <select class="w-100" data-width="100%">
                          <option value="TX">Repair</option>
                          <option value="NY">Troubleshoot</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>Tanggal Mulai</label>
                      <div class="input-group date datepicker" id="start_date">
                        <input type="text" class="form-control" />
                        <span class="input-group-addon">
                          <i data-feather="calendar"></i>
                        </span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>Tanggal Akhir</label>
                      <div
                        class="input-group date datepicker"
                        id="datePickerExample"
                      >
                        <input type="text" class="form-control" />
                        <span class="input-group-addon">
                          <i data-feather="calendar"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4"></div>
                    <div class="col-md-8">
                      <label>Job Perform</label>
                      <textarea
                        id="maxlength-textarea"
                        class="form-control"
                        maxlength="100"
                        rows="8"
                        placeholder="This textarea has a limit of 100 chars."
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label>Pilih Karyawan</label>
                      <select class="w-100" data-width="100%">
                        <option value="TX">Repair</option>
                        <option value="NY">Troubleshoot</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label>NIK</label>
                      <input disabled class="form-control" />
                    </div>
                    <div class="col-md-4">
                      <label>No. Telepon</label>
                      <input class="form-control mb-4 mb-md-0" disabled />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                      <label>Nama Provinsi</label>
                      <input class="form-control" disabled />
                    </div>
                    <div class="col-md-4">
                      <label>Nama Kota/Kabupaten</label>
                      <input class="form-control mb-4 mb-md-0" disabled />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label>Pilih Customer</label>
                      <select class="w-100" data-width="100%">
                        <option value="TX">Repair</option>
                        <option value="NY">Troubleshoot</option>
                      </select>
                    </div>
                    <div class="col-md-2">
                      <label>No. Telepon</label>
                      <input class="form-control" disabled />
                    </div>
                    <div class="col-md-2">
                      <label>PIC</label>
                      <input class="form-control mb-4 mb-md-0" disabled />
                    </div>
                    <div class="col-md-4">
                      <label>Alamat</label>
                      <input class="form-control mb-4 mb-md-0" disabled />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4"></div>
                    <div class="col-md-2">
                      <label>PIC Telepon</label>
                      <input class="form-control mb-4 mb-md-0" disabled />
                    </div>
                    <div class="col-md-2">
                      <label>Nama Provinsi</label>
                      <input class="form-control" disabled />
                    </div>
                    <div class="col-md-4">
                      <label>Nama Kota/Kabupaten</label>
                      <input class="form-control" disabled />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-12">
                      <label>Lokasi</label>
                      <textarea
                        id="maxlength-textarea"
                        class="form-control"
                        maxlength="100"
                        rows="8"
                        placeholder="Masukan alamat lokasi lengkap"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-12">
                      <input
                        class="btn btn-primary"
                        type="submit"
                        value="Simpan"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalServiceComponent;
