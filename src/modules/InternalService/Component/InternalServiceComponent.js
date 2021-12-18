import React from "react";
import { Field, FieldArray, Form } from "redux-form";
import CInput from "../../../components/CInput/CInput";
import CSelect from "../../../components/CSelect/CSelect";
import CDatePicker from "../../../components/CDatePicker/CDatePicker";
import CButton from "../../../components/CButton/CButton";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";

const InternalServiceComponent = (props) => {
  const {
    handleSubmit,
    submitForm,
    listCustomers,
    listEmployee,
    enumType,
    handleAutoPopulateEmployee,
    handleAutoPopulateCustomer,
    isLoadingFormGlobal,
  } = props;

  const renderEmployee = ({ fields }) => {
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
            onClick={() => fields.push({ employee: "" })}
          >
            Tambah Karyawan
          </CButtonAntd>
        </div>
        <br />
        {fields.map((itemEmployee, indexEmployee) => {
          return (
            <div>
              <div class="row">
                <div class="col">
                  <h5 class="card-title">{`Karyawan ${indexEmployee + 1}`}</h5>
                </div>

                <CButtonAntd
                  key={`removeEmployee-${indexEmployee}`}
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveField(indexEmployee)}
                  danger
                  size="small"
                />
              </div>
              <div class="row">
                <div class="col-md-4">
                  <CSelect
                    showSearch
                    data={listEmployee}
                    name={`${itemEmployee}.employee`}
                    label="Pilih Karyawan"
                    onChange={(employee) => {
                      handleAutoPopulateEmployee(employee, indexEmployee);
                    }}
                  />
                </div>
                <div class="col-md-4">
                  <Field
                    name={`${itemEmployee}.nik`}
                    label="NIK"
                    placeholder="-"
                    component={CInput}
                    type="text"
                    disabled
                  />
                </div>
                <div class="col-md-4">
                  <Field
                    name={`${itemEmployee}.employeePhoneNumber`}
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
                    name={`${itemEmployee}.employeeProvinceName`}
                    label="Nama Provinsi"
                    placeholder="-"
                    component={CInput}
                    type="text"
                    disabled
                  />
                </div>
                <div class="col-md-4">
                  <Field
                    name={`${itemEmployee}.employeeCityName`}
                    label="Nama Kota/Kabupaten"
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
                <h6 class="card-title">Tambah Internal Service</h6>
                <p class="card-description">
                  Form yang ditujukan untuk pembuatan internal service baru yang
                  akan dikerjakan oleh teknisi.
                </p>
                <Form onSubmit={handleSubmit(submitForm)}>
                  <div class="row">
                    <div class="col-md-4 mt-2">
                      <CSelect
                        data={enumType}
                        name="typeService"
                        label="Tipe"
                      />
                    </div>
                    <div class="col-md-4 mt-2">
                      <CDatePicker name="startDate" label="Tanggal Mulai" />
                    </div>
                    <div class="col-md-4 mt-2">
                      <CDatePicker name="endDate" label="Tanggal Akhir" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-12 mt-2">
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
                  {/* This render employee */}
                  <div className="row">
                    <InfoCircleTwoTone />
                    <p className="text-small ml-2">
                      Tips : Bisa menambahkan lebih dari satu karyawan.
                    </p>
                  </div>
                  <FieldArray name="employees" component={renderEmployee} />
                  <hr />
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
                  <div class="row">
                    <div class="col-md-12">
                      <Field
                        name="customerLocation"
                        label="Lokasi"
                        component={CInput}
                        typeComponent="textarea"
                        placeholder="Masukan Lokasi Customer"
                      />
                    </div>
                  </div>
                  <div class="mt-4 row">
                    <div class="col-md-12">
                      {/* <input
                        class="btn btn-primary"
                        type="submit"
                        value="Simpan"
                      /> */}
                      <CButton type="submit" isLoading={isLoadingFormGlobal}>
                        Simpan
                      </CButton>
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

export default InternalServiceComponent;
