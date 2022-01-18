import React from "react";
import { Field } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import CDatePicker from "../../../../components/CDatePicker/CDatePicker";
import CSelect from "../../../../components/CSelect/CSelect";

const ContentStepOneRegularComponent = ({ provinces, cities, onChangeProvince }) => {
  return (
    <>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <Field
            name="customerPhoneNumber"
            label="Nama Customer"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="picCustomer"
            label="Kode Produk"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="customerAddress"
            label="Nama Produk"
            placeholder="-"
            component={CInput}
            type="text"
          />
          <Field
            name="picCustomer"
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
            name="customerPhoneNumber"
            label="Alamat"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="picCustomer"
            label="Awal Pemakaian"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="customerAddress"
            label="Qty"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <CSelect
            onChange={(val) => onChangeProvince(val)}
            data={provinces}
            name="province"
            label="Nama Provinsi"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="picCustomer"
            label="NPWP/No.KTP"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="customerAddress"
            label="Keterangan"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <CSelect
            data={cities}
            name="city"
            label="Kota/Kabupaten"
            disabled={cities.length <= 0}
          />
        </div>
        <div class="col-md-4">
          <CDatePicker
            name="startDate"
            label="Tanggal Pemberian/Terima Bantuan"
          />
        </div>
        <div class="col-md-4">
          <CDatePicker name="startDate" label="Tanggal Konfirmasi" />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <Field
            name="customerPhoneNumber"
            label="No. Telpon"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="picCustomer"
            label="Status"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="customerAddress"
            label="Operasional"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <Field
            name="customerPhoneNumber"
            label="Kode Pos"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="picCustomer"
            label="Nama Perusahaan"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-4">
          <Field
            name="instanceName"
            label="Nama Kelompok Tani"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-4">
          <Field
            name="customerPhoneNumber"
            label="Tipe Pelanggan"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
    </>
  );
};

export default ContentStepOneRegularComponent;
