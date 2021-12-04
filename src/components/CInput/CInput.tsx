import React from "react";

interface IProps {
  onChange: any;
  value: string;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  typeComponent: string;
  input: any;
  error: boolean;
  message: string;
  meta: { error: any; touched: any };
  disabled: boolean;
  maxLength: number;
  rows: number;
}

const CInput: React.FC<IProps> = (props) => {
  switch (props.typeComponent) {
    case "textarea":
      return (
        <div className="form-group">
          <label htmlFor={props.name}>{props.label}</label>
          <textarea
            id={props.name}
            className={`form-control ${props.error && "is-invalid"}`}
            maxLength={props.maxLength ?? 250}
            rows={props.rows ?? 8}
            name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder ?? ""}
            value={props.value}
            {...props.input}
          ></textarea>
        </div>
      );
    default:
      return (
        <div className="form-group">
          <label htmlFor={props.name}>{props.label}</label>
          <input
            id={props.name}
            maxLength={props.maxLength ?? 250}
            value={props.value}
            className={`form-control ${props.error && "is-invalid"}`}
            name={props.name}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder ?? ""}
            disabled={props.disabled ?? false}
            {...props.input}
          />
          {props.meta.touched && props.meta.error && (
            <span className="mt-2 text-danger">
              {props.meta.error ?? "This field required"}
            </span>
          )}
        </div>
      );
  }
};

export default CInput;
