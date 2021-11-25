import React from "react";
import CGlobalOverlay from "../../../components/CGlobalOverlay/CGlobalOverlay";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";

export default function TemplateComponent(props) {
  const { children, isGlobalLoading, isLandingPage, logout } = props;

  return (
    <React.Fragment>
      <CGlobalOverlay loading={isGlobalLoading} />
      {isLandingPage && <Sidebar />}
      <div className={`page-wrapper ${!isLandingPage ? "full-page" : ""}`}>
        {isLandingPage && <Navbar onLogout={logout} />}
        {children}
        {isLandingPage && <Footer />}
      </div>
    </React.Fragment>
  );
}
