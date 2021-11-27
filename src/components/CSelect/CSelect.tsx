import React from "react";

interface IInput {
  name: string;
  onChange: any;
}
interface IProps {
  data: any;
  input: IInput;
  label: string;
}

const CSelect: React.FC<IProps> = (props) => {
  const [value, setValue] = React.useState("");

  const onChangeHandler = (e: any) => {
    setValue(e.target.value);
    if (props.input.onChange) {
      props.input.onChange();
    }
  };

  const renderSelectOptions = (item: any, index: number) => (
    <option key={"opt-key-" + index} value={item.value}>
      {item.value}
    </option>
  );
  const { input, label, data } = props;
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select
        className=""
        onChange={onChangeHandler}
        name={input.name}
        value={value}
      >
        <option value="">Select</option>
        <option value="test">Test</option>
        {data.map(renderSelectOptions)}
      </select>
    </div>
  );
};

export default CSelect;
