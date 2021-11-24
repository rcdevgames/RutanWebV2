import React from "react";

interface IProps {
  onChange: any;
  value: string;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  input: any;
}

const CInput: React.FC<IProps> = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        value={props.value}
        className="form-control"
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        {...props.input}
      />
    </div>
  );
};

export default CInput;
