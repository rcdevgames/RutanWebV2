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
}

const CBadgeText: React.FC<IProps> = (props) => {
  return <span className={`badge badge-${props.type}`}>{props.children}</span>;
};

export default CBadgeText;
