import React from "react";
import { Field } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import CDatePicker from "../../../../components/CDatePicker/CDatePicker";

const ContentStepTwoComponent = () => {
  return (
    <>
      <div class="row m-2 text-left">
        <div class="col-md-6">
          <Field
            name="customerPhoneNumber"
            label="Serial Number"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-6">
          <Field
            name="picCustomer"
            label="Jam Kerja"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-6">
          <Field
            name="customerPhoneNumber"
            label="Engine Number"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-6">
          <Field
            name="picCustomer"
            label="Waktu Operasional"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-6">
          <Field
            name="customerPhoneNumber"
            label="Gearbox Number"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-6">
          <Field
            name="picCustomer"
            label="Keterangan"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-6">
          <Field
            name="customerPhoneNumber"
            label="Tahun Produksi"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-6">
          <CDatePicker name="startDate" label="Tanggal Konfirmasi" />
        </div>
      </div>
    </>
  );
};

export default ContentStepTwoComponent;
