import React from "react";

interface IProps {
  type:
    | "primary"
    | "danger"
    | "warning"
    | "info"
    | "success"
    | "secondary"
    | "light"
    | "dark";
  icon: string;
  onPress: any;
}

const CButtonIcon: React.FC<IProps> = (props) => {
  return (
    <button
      onClick={props.onPress}
      type="button"
      className={`btn btn-${props.type} btn-icon`}
    >
      <i data-feather={props.icon}></i>
      {props.children}
    </button>
  );
};

export default CButtonIcon;
