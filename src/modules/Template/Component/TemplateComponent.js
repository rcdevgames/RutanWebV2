import CGlobalOverlay from "../../../components/CGlobalOverlay/CGlobalOverlay";
import FooterContainer from "../SubComponent/Footer/Container/FooterContainer";
import NavbarContainer from "../SubComponent/Navbar/Container/NavbarContainer";
import React from "react";
import { ScrollOnTopBtn } from "../../../Assets/Components/ScrollOnTop";
import SidebarContainer from "../SubComponent/Sidebar/Container/SidebarContainer";

export default function TemplateComponent(props) {
  const { children, isGlobalLoading, footerImg, footer, isSmall } = props;

  return (
    <>
      <CGlobalOverlay loading={isGlobalLoading} />
      {isSmall === true ? <SidebarContainer /> : <NavbarContainer {...props} />}
      <>{children}</>
      <ScrollOnTopBtn />
      {footer === true && <FooterContainer footerImg={footerImg} />}
    </>
  );
}
