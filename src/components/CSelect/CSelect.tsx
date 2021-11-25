import React from "react";

interface IVal {
  id: number;
  value: string;
}

interface IProps {
  data: IVal[];
  input: object;
  label: string;
}

const DropDownSelect: React.FC<IProps> = (props) => {
  const renderSelectOptions = (item: any, index: number) => (
    <option key={"opt-key-" + index} value={item.value}>
      {item.value}
    </option>
  );
  const { input, label, data } = props;

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select {...input}>
        <option value="">Select</option>
        {data.map(renderSelectOptions)}
      </select>
    </div>
  );
};

export default DropDownSelect;
