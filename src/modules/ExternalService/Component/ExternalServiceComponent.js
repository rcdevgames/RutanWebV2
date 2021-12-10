import React from "react";
import { Field, FieldArray } from "redux-form";
import { Form } from "antd";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";

const ExternalServiceComponent = (props) => {
  const {
    handleSubmit,
    submitForm,
    listCustomers,
    listEmployee,
    enumType,
    handleAutoPopulateEmployee,
    handleAutoPopulateCustomer,
    listUnit,
  } = props;

  const renderUnits = ({ fields }) => {
    const handleRemoveField = (index) => {
      fields.remove(index);
    };
    return (
      <>
        <div class="d-flex flex-row-reverse">
          <div class="ml-2" />
          <CButtonAntd
            key={`plusUnit`}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => fields.push({})}
          >
            Tambah Unit
          </CButtonAntd>
        </div>
        <br />
        {fields.map((itemUnit, indexUnit) => {
          return (
            <div>
              <div class="row">
                <div class="col">
                  <h5 class="card-title">{`Unit ${indexUnit + 1}`}</h5>
                </div>

                <CButtonAntd
                  key={`removeUnits-${indexUnit}`}
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveField(indexUnit)}
                  danger
                  size="small"
                />
              </div>
              <div class="row">
                <div class="col-md-4">
                  <CSelect
                    data={listUnit}
                    name={`${itemUnit}.id`}
                    label="Pilih Unit"
                  />
                </div>
                <div class="col-md-4">
                  <CSelect
                    data={enumType}
                    name={`${itemUnit}.unitModelId`}
                    label="Model"
                  />
                </div>
                <div class="col-md-4">
                  <Field
                    name={`${itemUnit}.unitModelSerialNumber`}
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
      </>
    );
  };

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
                    <div class="col-md-2">
                      <CSelect data={enumType} name="typeService" label="Tipe" />
                    </div>
                    <div class="col-md-3">
                      <CDatePicker name="startDate" label="Tanggal Mulai" />
                    </div>
                    <div class="col-md-3">
                      <CDatePicker name="endDate" label="Tanggal Akhir" />
                    </div>
                    <div class="col-md-2">
                      <CSelect
                        data={enumType}
                        name="jobForm"
                        label="Job Form"
                      />
                    </div>
                    <div class="col-md-2">
                      <CSelect
                        data={enumType}
                        name="warranty"
                        label="Warranty"
                      />
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
                  <div className="row">
                    <InfoCircleTwoTone />
                    <p className="text-small ml-2">
                      Tips : Bisa menambahkan lebih dari satu unit.
                    </p>
                  </div>
                  <FieldArray name="units" component={renderUnits} />
                  <hr />
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
