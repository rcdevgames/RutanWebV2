import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface IData {
  id: any;
  value: any;
  label: any;
}

interface IProps {
  data: IData[];
  name: any;
  label: string;
  placeholder: string;
  onChange: any;
  input: any;
  custom: any;
}

const CSelectAntd: React.FC<IProps> = (props) => {
  const onBlur = () => {
    console.log("blur");
  };

  const onFocus = () => {
    console.log("focus");
  };

  const onSearch = (value: any) => {
    // console.log("search:", value);
  };
  return (
    <div>
      {props.label && (
        <div>
          <label htmlFor={props.label}>{props.label}</label>
          <br />
        </div>
      )}
      <Select
        showSearch
        style={{ width: 200, marginBottom: 16 }}
        placeholder={props.placeholder ?? ""}
        optionFilterProp="children"
        onChange={props.onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...props.input}
        {...props.custom}
      >
        {props.data.map((item: any, index: number) => {
          return (
            <Option key={item.id} value={item.value}>
              {item.label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default CSelectAntd;
