import React from "react";
import { Button } from "antd";

interface IProps {
  onClick: any;
  disabled: boolean;
  isLoading: boolean;
  backgroundColor: string;
  icon: any;
  shape: "default" | "circle" | "round";
  type: "primary" | "dashed" | "default" | "ghost" | "link" | "text";
  size: "middle" | "small" | "large";
  danger: boolean;
  block: boolean;
}

const CButtonAntd: React.FC<IProps> = (props) => {
  const {
    onClick,
    children,
    isLoading,
    disabled,
    icon,
    shape,
    type,
    size,
    danger,
    backgroundColor
  } = props;
  return (
    <Button
      style={{backgroundColor: backgroundColor, borderColor: backgroundColor}}
      block={props.block ?? false}
      icon={icon ?? null}
      type={type ?? "default"}
      shape={shape ?? "default"}
      onClick={onClick}
      disabled={disabled}
      loading={isLoading}
      size={size ?? "middle"}
      danger={danger}
    >
      {isLoading ? "Loading" : children}
    </Button>
  );
};

export default CButtonAntd;
