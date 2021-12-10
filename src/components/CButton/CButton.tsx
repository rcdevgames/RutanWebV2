import React from "react";

interface IProps {
  type: "submit" | "button" | "reset";
  onClick: any;
  isLoading: boolean;
}

const CButton: React.FC<IProps> = (props) => {
  const { type, isLoading, onClick, children } = props;
  return (
    <button
      onClick={onClick}
      className="btn btn-primary"
      type={type}
      disabled={isLoading}
    >
      {isLoading && (
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default CButton;
