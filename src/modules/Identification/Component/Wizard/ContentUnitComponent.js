import React from "react";
import { Field } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import CDatePicker from "../../../../components/CDatePicker/CDatePicker";
import Text from "antd/lib/typography/Text";

const ContentUnitComponent = () => {
  return (
    <>
      <div class="row m-2 text-left">
        <div class="col-md-6">
          <Field
            name="serialNumber"
            label="Nomor Seri"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-6">
          <Field
            name="engineNumber"
            label="Nomor Mesin"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-6">
          <Field
            name="gearboxNumber"
            label="Nomor Gearbox"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-6">
          <Field
            name="production_unit_year"
            label="Tahun Produksi Unit"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
      </div>
      <hr />
      <div className="row ml-3">
        <h5 className="card-title">Jam Kerja</h5>
        <Text style={{ fontSize: 11, marginLeft: 3 }}>
          (per Hari & Hour Meter )
        </Text>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-3">
          <Field
            name="perHour"
            label="Per Hour"
            placeholder="-"
            component={CInput}
            type="text"
          />
          <Field
            name="hourMeter"
            label="Hour Meter"
            placeholder="-"
            component={CInput}
            type="text"
          />
        </div>
        <div class="col-md-6"></div>
      </div>
      <hr />
      <div className="row ml-3">
        <h5 className="card-title">Tanggal Transaksi Produk</h5>
        <Text style={{ fontSize: 11, marginLeft: 3 }}>(Bulan & Tahun)</Text>
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-6">
          <CDatePicker name="startDate" label="Tanggal Pembelian" />
        </div>
        <div class="col-md-6">
          <CDatePicker name="startDate" label="Tanggal Terima Bantuan" />
        </div>
      </div>
    </>
  );
};

export default ContentUnitComponent;
