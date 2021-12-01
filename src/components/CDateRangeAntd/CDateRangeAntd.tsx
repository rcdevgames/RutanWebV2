import React from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

interface IProps {
  name: any;
  label: string;
}

const CDateRangeAntd: React.FC<IProps> = (props) => {
  return (
    <div>
      {props.label && (
        <div>
          <label htmlFor={props.label}>{props.label}</label>
          <br />
        </div>
      )}
      <RangePicker />
    </div>
  );
};

export default CDateRangeAntd;
