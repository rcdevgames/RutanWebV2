import React, { Fragment } from "react";
import { Field, FieldArray } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import CSelect from "../../../../components/CSelect/CSelect";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

const ContentSparePartComponent = ({ onChangeServiced, isServiced }) => {
  const [listServices] = React.useState([
    {
      id: `serviced-1`,
      value: "true",
      label: "Pernah",
    },
    {
      id: `serviced-2`,
      value: "false",
      label: "Tidak",
    },
  ]);

  const RenderServiceHistory = ({ fields }) => {
    const handleRemoveField = (index) => {
      fields.remove(index);
    };
    return (
      <Fragment>
        <div class="d-flex flex-row-reverse">
          <div class="ml-2" />
          <CButtonAntd
            key={`plusUnit`}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              if (fields.length >= 5) {
                return;
              }
              fields.push({});
            }}
          >
            Tambah
          </CButtonAntd>
        </div>
        <br />
        {fields.map((itemUnit, indexUnit) => {
          return (
            <div key={`unit-item-${indexUnit}`}>
              <div class="row mr-2">
                <div class="col">
                  <h5 class="card-title">{`Spare Part ${indexUnit + 1}`}</h5>
                </div>
                <CButtonAntd
                  key={`remove-unit-btn-${indexUnit}`}
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveField(indexUnit)}
                  danger
                  size="small"
                />
              </div>
              <div class="row mr-2">
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.spare_part_name`}
                    label="Nama Spare Part"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.spare_part_buy_place`}
                    label="Tempat Pembelian Spare Part"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  const RenderSparePartSelling = ({ fields }) => {
    const handleRemoveField = (index) => {
      fields.remove(index);
    };
    return (
      <Fragment>
        <div class="d-flex flex-row-reverse">
          <div class="ml-2" />
          <CButtonAntd
            key={`plusUnit`}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              if (fields.length >= 5) {
                return;
              }
              fields.push({});
            }}
          >
            Tambah
          </CButtonAntd>
        </div>
        <br />
        {fields.map((itemUnit, indexUnit) => {
          return (
            <div key={`unit-item-${indexUnit}`}>
              <div class="row mr-2">
                <div class="col">
                  <h5 class="card-title">{`Spare Part ${indexUnit + 1}`}</h5>
                </div>
                <CButtonAntd
                  key={`remove-unit-btn-${indexUnit}`}
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveField(indexUnit)}
                  danger
                  size="small"
                />
              </div>
              <div class="row mr-2">
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.spare_part_name`}
                    label="Nama Spare Part"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.spare_part_qty`}
                    label="Qty"
                    placeholder="Jumlah Penjualan Spare Part"
                    component={CInput}
                    type="text"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  const RenderSparePartNeeded = ({ fields }) => {
    const handleRemoveField = (index) => {
      fields.remove(index);
    };
    return (
      <Fragment>
        <div class="d-flex flex-row-reverse">
          <div class="ml-2" />
          <CButtonAntd
            key={`plusUnit`}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              if (fields.length >= 5) {
                return;
              }
              fields.push({});
            }}
          >
            Tambah
          </CButtonAntd>
        </div>
        <br />
        {fields.map((itemUnit, indexUnit) => {
          return (
            <div key={`unit-item-${indexUnit}`}>
              <div class="row mr-2">
                <div class="col">
                  <h5 class="card-title">{`Spare Part ${indexUnit + 1}`}</h5>
                </div>
                <CButtonAntd
                  key={`remove-unit-btn-${indexUnit}`}
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveField(indexUnit)}
                  danger
                  size="small"
                />
              </div>
              <div class="row mr-2">
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.product_name`}
                    label="Nama Produk Spare Part"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.product_code`}
                    label="Kode Produk"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
              </div>
              <div class="row mr-2">
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.part_number`}
                    label="Part Number"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.qty`}
                    label="Qty"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <>
      <div class="row m-2 text-left">
        <div class="col-md-3">
          <CSelect
            onChange={(val) => onChangeServiced(val)}
            data={listServices}
            label="Pernah Diservis"
            name="location"
          />
        </div>
      </div>
      {isServiced && (
        <div class="row m-2 text-left">
          <div class="col-md-6">
            <Field
              name="history_service_place"
              label="Perbaikan Dilakukan Di"
              placeholder="cth: Blitar"
              component={CInput}
              type="text"
            />
          </div>
          <div class="col-md-6">
            <Field
              name="history_service_type"
              label="Jenis Perbaikan"
              placeholder="cth: Service Sikring"
              component={CInput}
              type="text"
            />
          </div>
        </div>
      )}
      <div className="col m-2 text-left">
        <h5 className="card-title">Riwayat Penggantian Spare Part</h5>
        <div className="row text-left ml-1">
          <InfoCircleTwoTone />
          <p className="text-small ml-2">
            Tips : Isi jika pernah dilakukan service, maksimal 5 unit.
          </p>
        </div>
        <FieldArray
          name="spare_part_changing_histories"
          component={RenderServiceHistory}
        />
        <hr />
      </div>
      <div className="col m-2 text-left">
        <div className="row ml-1">
          <h5 className="card-title">Penjualan Spare Part</h5>
          <Text style={{ fontSize: 11, marginLeft: 3 }}>
            (pada saat kunjuangan)
          </Text>
        </div>
        <div className="row text-left ml-1">
          <InfoCircleTwoTone />
          <p className="text-small ml-2">
            Tips : Isi jika pernah dilakukan penjualan, maksimal 5 unit
          </p>
        </div>
        <FieldArray
          name="spare_part_selling_histories"
          component={(_props) => <RenderSparePartSelling {..._props} />}
        />
        <hr />
      </div>
      <div className="col m-2 text-left">
        <div className="row ml-1">
          <h5 className="card-title">Daftar Kebutuhan Spare Part</h5>
          <Text style={{ fontSize: 11, marginLeft: 3 }}>(per Quartal)</Text>
        </div>
        <div className="row text-left ml-1">
          <InfoCircleTwoTone />
          <p className="text-small ml-2">
            Tips : Isi apabila terdapat kebutuhan spare part, maksimal 5 unit
          </p>
        </div>
        <FieldArray
          name="spare_part_needs"
          component={(_props) => <RenderSparePartNeeded {..._props} />}
        />
        <hr />
      </div>
      <div class="row m-2 text-left">
        <div class="col-md-12">
          <Field
            name="note"
            label="Keterangan"
            placeholder="cth: Pernah dilakukan service namun tidak rampung"
            component={CInput}
            typeComponent="textarea"
          />
        </div>
      </div>
    </>
  );
};

export default ContentSparePartComponent;
