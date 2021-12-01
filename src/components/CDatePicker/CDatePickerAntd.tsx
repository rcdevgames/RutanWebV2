import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

interface IData {
  id: any;
  value: any;
  label: any;
}

interface IProps {
  name: any;
  label: string;
}

const CDatePickerAntd: React.FC<IProps> = (props) => {
  return (
    <div>
      {props.label && (
        <div>
          <label htmlFor={props.label}>{props.label}</label>
          <br />
        </div>
      )}
      <Space direction="vertical" size={12}>
        <RangePicker />
        <RangePicker showTime />
        <RangePicker picker="week" />
        <RangePicker picker="month" />
        <RangePicker picker="year" />
      </Space>
    </div>
  );
};

export default CDatePickerAntd;
