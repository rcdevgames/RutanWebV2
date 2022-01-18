import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { Field } from "redux-form";

const RenderDatePicker = (props) => {
  const { name, input, label, meta } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <DatePicker
        placeholder="Pilih Tanggal"
        style={{ width: "100%" }}
        name={name}
        onBlur={(e) => {
          e.preventDefault();
        }}
        defaultValue={moment()}
        {...input}
      />
      {meta.touched && meta.error && (
        <span className="mt-2 text-danger">
          {meta.error ?? "This field required"}
        </span>
      )}
    </div>
  );
};

const CDatePicker = (props) => {
  return (
    <Field
      component={RenderDatePicker}
      onBlur={(e) => {
        e.preventDefault();
      }}
      {...props}
    />
  );
};

export default CDatePicker;
