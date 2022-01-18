import React from "react";
import { Field } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import CDatePicker from "../../../../components/CDatePicker/CDatePicker";
import CSelect from "../../../../components/CSelect/CSelect";

const ContentStepOneComponent = ({
  provinces,
  cities,
  onChangeProvince,
  enumInstanceType,
  enumStatusMilling,
}) => {
  return (
    <>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <CSelect data={enumInstanceType} name="instanceType" label="Tipe" />
        </div>
        <div class="col-md-4">
          <Field
            name="instanceName"
            label="Nama Instansi"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="ktp_npwp"
            label="NPWP/No.KTP"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <Field
            name="customerName"
            label="Nama Customer"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <CSelect
            data={enumStatusMilling}
            name="millingStatus"
            label="Status"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="riceTrademark"
            label="Merek Dagang Beras"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <Field
            name="customerAddress"
            label="Alamat"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <CSelect
            onChange={(val) => onChangeProvince(val)}
            data={provinces}
            name="province"
            label="Nama Provinsi"
          />
        </div>
        <div class="col-md-4">
          <CSelect
            data={cities}
            name="city"
            label="Kota/Kabupaten"
            disabled={cities.length <= 0}
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <Field
            name="phone"
            label="No. Telepon"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="millingCapacity"
            label="Kapasitas Penggilingan"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="millingWorkCapacityPerDay"
            label="Kapasitas Kerja Penggilingan (Per Hari)"
            placeholder="-"
            component={CInput}
            labelSize={12}
            type="text"
          />
        </div>
      </div>
    </>
  );
};

export default ContentStepOneComponent;
