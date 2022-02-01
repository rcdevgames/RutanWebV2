import React, { Fragment } from "react";
import { Field, FieldArray } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";

const ContentMachineConfigurationComponent = ({
  machineConf,
  onAddMachineConf,
}) => {
  const RenderBodyHusker = ({ fields, item }) => {
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
              if (fields.length >= 2) {
                return;
              }
              fields.push({});
              setTimeout(() => {
                onAddMachineConf(item);
              }, 500);
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
                  <h5 class="card-title">{`${item.type} ${indexUnit + 1}`}</h5>
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
                <div class="col-md-5">
                  <Field
                    name={`${itemUnit}.brand`}
                    label="Merek"
                    placeholder="cth: merek_1, merek_2, ..."
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-5">
                  <Field
                    name={`${itemUnit}.type`}
                    label="Tipe"
                    placeholder="cth: tipe_1, tipe_2, ..."
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-2">
                  <Field
                    name={`${itemUnit}.qty`}
                    label="Qty"
                    placeholder="cth: 12, 5, ..."
                    component={CInput}
                    type="text"
                  />
                </div>
              </div>
              <div class="row mr-2">
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.buy_and_use_year`}
                    label="Tahun Pembelian & Pemakaian"
                    placeholder="cth: 2015, 2017, ..."
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-6">
                  <Field
                    name={`${itemUnit}.serial_number`}
                    label="Nomor Seri"
                    placeholder="cth: 77888, 66555, ..."
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

  return machineConf.map((item, index) => {
    return (
      <div className="col m-2 text-left">
        <h5 className="card-title">{item.type}</h5>
        <div className="row text-left ml-1">
          <InfoCircleTwoTone />
          <p className="text-small ml-2">Tips : Maksimal hanya input 2 field.</p>
        </div>
        <FieldArray
          name={`engine_confs.${item.name}.list`}
          component={(_props) => <RenderBodyHusker item={item} {..._props} />}
        />
        <hr />
      </div>
    );
  });
};

export default ContentMachineConfigurationComponent;
