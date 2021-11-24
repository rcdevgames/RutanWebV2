import React from "react";

interface IProps {
  onChange: any;
  value: string;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  input: any;
  error: boolean;
  message: string;
  meta: { error: any; touched: any };
}

const CInput: React.FC<IProps> = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        value={props.value}
        className={`form-control ${props.error && "is-invalid"}`}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        {...props.input}
      />
      {props.meta.touched && props.meta.error && (
        <span className="mt-2 text-danger">
          {props.meta.error ?? "This field required"}
        </span>
      )}
    </div>
  );
};

export default CInput;
