import React from "react";

interface IProps {}

const CDatePicker: React.FC<IProps> = (props) => {
  return (
    <div className="input-group date datepicker" id="datePickerExample">
      <input type="text" className="form-control" />
      <span className="input-group-addon">
        <i data-feather="calendar"></i>
      </span>
    </div>
  );
};

export default CDatePicker;
