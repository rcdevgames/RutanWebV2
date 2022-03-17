import React from "react";
import { DatePicker } from "antd";
import { Field } from "redux-form";
import moment from "moment";

const { RangePicker } = DatePicker;

const CRangePicker = (props) => {
  const { input, onChange, name } = props;

  return (
    <RangePicker
      name={name}
      onChange={onChange}
      hasFeedback
      placeholder={["From", "To"]}
      onFocus={(e) => e.preventDefault()}
      onBlur={(e) => e.preventDefault()}
      defaultValue={[
        input.value[0] ? moment(input.value[0]) : moment(),
        input.value[1] ? moment(input.value[1]) : moment(),
      ]}
      {...input}
    />
  );
};

const CDateRangeAntd = (props) => {
  return (
    <div>
      {props.label && (
        <div>
          <label htmlFor={props.label}>{props.label}</label>
          <br />
        </div>
      )}
      <Field component={CRangePicker} {...props} />
    </div>
  );
};

export default CDateRangeAntd;
