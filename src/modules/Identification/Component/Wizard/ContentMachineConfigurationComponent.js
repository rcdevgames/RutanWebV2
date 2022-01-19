import React, { Fragment } from "react";
import { Field, FieldArray } from "redux-form";
import CInput from "../../../../components/CInput/CInput";
import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";

const ContentMachineConfigurationComponent = ({ machineConf }) => {
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
                    name={`${itemUnit}.buy_and_use_year`}
                    label="Tahun Pembelian & Pemakaian"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-5">
                  <Field
                    name={`${itemUnit}.serial_number`}
                    label="Nomor Seri"
                    placeholder="-"
                    component={CInput}
                    type="text"
                  />
                </div>
                <div class="col-md-2">
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

  return machineConf.map((item, index) => {
    return (
      <div className="col m-2 text-left">
        <h5 className="card-title">{item.type}</h5>
        <div className="row text-left ml-1">
          <InfoCircleTwoTone />
          <p className="text-small ml-2">Tips : Maksimal hanya input 2 unit.</p>
        </div>
        <FieldArray
          name={`engine_confs.${item.name}`}
          component={(_props) => <RenderBodyHusker item={item} {..._props} />}
        />
        <hr />
      </div>
    );
  });
};

export default ContentMachineConfigurationComponent;
