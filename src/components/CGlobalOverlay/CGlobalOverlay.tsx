import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";
interface IProps {
  loading: boolean;
}

const Overlay = styled.div`
  position: fixed;
  display: block;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  padding-top: 23vh;
  text-align: center;
  margin: auto;
  display: block;
`;

const CGlobalOverlay: React.FC<IProps> = (props) => {
  const { loading } = props;
  if (loading) {
    return (
      <Overlay>
        <ScaleLoader
          height={120}
          width={18}
          radius={12}
          margin={5}
          color={"#faad14"}
          loading={true}
        />
      </Overlay>
    );
  }
  return null;
};

export default CGlobalOverlay;
