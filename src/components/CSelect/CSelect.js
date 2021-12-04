import React from "react";
import { Select } from "antd";
import { Field } from "redux-form";
import { makeField } from "../../app/FormHelpers";

const { Option } = Select;
const ASelect = makeField(Select);

const CSelect = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <br />
      <Field
        style={{ width: "100%" }}
        showSearch={props.showSearch ?? false}
        name={props.name}
        component={ASelect}
        onBlur={(e) => {
          if (props.onBlur) {
            props.onBlur();
          }
          e.preventDefault();
        }}
        {...props}
      >
        <Option value="">{props.placeholder ?? "- Pilih -"}</Option>
        {props.data.map((item, index) => {
          return (
            <Option value={`${item.value}|${item.label}`}>{item.label}</Option>
          );
        })}
      </Field>
    </div>
  );
};

export default CSelect;
