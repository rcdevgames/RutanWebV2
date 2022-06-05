import React from "react";
import { Field } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import CDatePicker from "../../../../components/CDatePicker/CDatePicker";
import CSelect from "../../../../components/CSelect/CSelect";

const ContentStepOneRegularComponent = ({
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
          <CSelect
            data={enumInstanceType}
            name="instanceType"
            label="Tipe Instansi"
          />
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
          <Field
            name="productName"
            label="Nama Produk"
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
            name="instancePhoneNumber"
            label="No. Telepon"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <hr />
      <div className="row ml-4">
        <h5 className="card-title">Alamat Customer</h5>
      </div>
      <div class="row ml-2 mr-2 text-left">
        <div class="col-md-4">
          <Field
            name="kelurahan"
            label="Kelurahan"
            placeholder="-"
            component={CInput}
            type="text"
          />
          <Field
            name="kecamatan"
            label="Kecamatan"
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
          <Field
            name="postalCode"
            label="Kode Pos"
            placeholder="-"
            component={CInput}
            type="text"
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
    </>
  );
};

export default ContentStepOneRegularComponent;
