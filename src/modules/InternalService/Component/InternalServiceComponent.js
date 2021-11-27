import React from "react";
import { Field } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";

const InternalServiceComponent = (props) => {
  const { handleSubmit, submitForm } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Tambah Internal Service</h6>
                <p class="card-description">
                  Form yang ditujukan untuk pembuatan internal service baru yang
                  akan dikerjakan oleh teknisi.
                </p>
                <form class="forms-sample" onSubmit={handleSubmit(submitForm)}>
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
                      {/* <textarea
                        id="maxlength-textarea"
                        class="form-control"
                        maxlength="100"
                        rows="8"
                        placeholder="This textarea has a limit of 100 chars."
                      ></textarea> */}
                      <Field
                        name="jobPerform"
                        label="Job Perform"
                        component={CInput}
                        typeComponent="textarea"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      {/* <select class="js-example-basic-single w-100" data-width="100%">
                        <option value="TX">Repair</option>
                        <option value="NY">Troubleshoot</option>
                      </select> */}
                      <Field
                        data={[1, 2, 3, 4]}
                        name="employee"
                        label="Pilih Karyawan"
                        component={CSelect}
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="nik"
                        label="NIK"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="phoneNumber"
                        label="No. Telepon"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                      <Field
                        name="provinceName"
                        label="Nama Provinsi"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="cityName"
                        label="Nama Kota/Kabupaten"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
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
                      <Field
                        name="customerPhoneNumber"
                        label="No. Telepon"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-2">
                      <Field
                        name="picCustomer"
                        label="PIC"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="customerAddress"
                        label="Alamat"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4"></div>
                    <div class="col-md-2">
                      <Field
                        name="picPhoneNumber"
                        label="PIC Telepon"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-2">
                      <Field
                        name="customerProvinceName"
                        label="Nama Provinsi"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="customerCityName"
                        label="Nama Kota/Kabupaten"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
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

export default InternalServiceComponent;
