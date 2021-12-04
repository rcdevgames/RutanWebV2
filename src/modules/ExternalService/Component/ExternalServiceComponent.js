import React from "react";
import { Field } from "redux-form";
import { Form } from "antd";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CButtonIcon from "../../../components/CButtonIcon/CButtonIcon";

const ExternalServiceComponent = (props) => {
  const {
    handleSubmit,
    submitForm,
    listCustomers,
    listEmployee,
    enumType,
    handleAutoPopulateEmployee,
    handleAutoPopulateCustomer,
    handleAddNewUnit,
    handleSubtractUnit,
    unitData,
  } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="row">
          <div class="col-md-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Tambah External Service</h6>
                <p class="card-description">
                  Form yang ditujukan untuk pembuatan external service baru yang
                  akan dikerjakan oleh teknisi.
                </p>
                <Form onSubmit={handleSubmit(submitForm)}>
                  <div class="row">
                    <div class="col">
                      <CSelect data={enumType} name="type" label="Tipe" />
                    </div>
                    <div class="col-md-4">
                      <CDatePicker name="startDate" label="Tanggal Mulai" />
                    </div>
                    <div class="col-md-4">
                      <CDatePicker name="endDate" label="Tanggal Akhir" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-12">
                      <Field
                        name="jobPerform"
                        label="Job Perform"
                        component={CInput}
                        typeComponent="textarea"
                        placeholder="Masukan job perform teknisi"
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-md-4">
                      <CSelect
                        showSearch
                        data={listEmployee}
                        name="employee"
                        label="Pilih Karyawan"
                        onChange={(employee) => {
                          handleAutoPopulateEmployee(employee);
                        }}
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
                        name="employeePhoneNumber"
                        label="No. Telepon"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                      <Field
                        name="employeeProvinceName"
                        label="Nama Provinsi"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="employeeCityName"
                        label="Nama Kota/Kabupaten"
                        placeholder="-"
                        component={CInput}
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-md-4">
                      <CSelect
                        showSearch
                        data={listCustomers}
                        name="customer"
                        label="Pilih Customer"
                        onChange={(employee) => {
                          handleAutoPopulateCustomer(employee);
                        }}
                      />
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
                  <div class="row">
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
                  <hr />
                  <div class="d-flex flex-row-reverse">
                    <CButtonIcon
                      onPress={handleSubtractUnit}
                      type="danger"
                      icon="minus"
                    />
                    <div class="ml-2" />
                    <CButtonIcon
                      onPress={handleAddNewUnit}
                      type="success"
                      icon="plus"
                    />
                  </div>
                  {unitData.map((itemUnit, indexUnit) => {
                    return (
                      <div>
                        <h5 class="card-title">{`Unit ${indexUnit + 1}`}</h5>
                        <div class="row">
                          <div class="col">
                            <CSelect
                              data={enumType}
                              name={`unit|${indexUnit}`}
                              label="Pilih Unit"
                            />
                          </div>
                          <div class="col-md-4">
                            <CSelect
                              data={enumType}
                              name={`modelUnit|${indexUnit}`}
                              label="Model"
                            />
                          </div>
                          <div class="col-md-4">
                            <Field
                              name={`unitSerialNumber|${indexUnit}`}
                              label="Serial Number"
                              placeholder="-"
                              component={CInput}
                              type="text"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div class="row">
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
                  <div class="mt-4 row">
                    <div class="col-md-12">
                      <input
                        class="btn btn-primary"
                        type="submit"
                        value="Simpan"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalServiceComponent;
