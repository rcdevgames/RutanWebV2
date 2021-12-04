import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { Field } from "redux-form";

const RenderDatePicker = (props) => {
  const { name, input, label } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <DatePicker
        style={{ width: "100%" }}
        name={name}
        onBlur={(e) => {
          e.preventDefault();
        }}
        defaultValue={moment()}
        {...input}
      />
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
