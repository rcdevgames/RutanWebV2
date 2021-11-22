import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IProps {
  loading: boolean;
}

const CGlobalOverlay: React.FC<IProps> = (props) => {
  const { loading } = props;
  if (loading) {
    return (
      <div className="overlayContainer">
        <ScaleLoader
          height={120}
          width={18}
          radius={12}
          margin={5}
          color={"#faad14"}
          loading={true}
        />
      </div>
    );
  }
  return null;
};

export default CGlobalOverlay;
