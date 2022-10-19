import React from "react";
import CGlobalOverlay from "../../../components/CGlobalOverlay/CGlobalOverlay";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import { withRouter } from "react-router-dom";
import "../../../style/globalStyle.css";

const TemplateComponent = (props) => {
  const {
    children,
    isGlobalLoading,
    isLandingPage,
    logout,
    userDetail,
    role,
    mainMenu,
    masterDataMenu,
    reportMenu,
    serviceRepairMenu,
    reportDataMenu,
  } = props;

  return (
    <React.Fragment>
      <CGlobalOverlay loading={isGlobalLoading} />
      {isLandingPage && (
        <Sidebar
          role={role}
          masterDataMenu={masterDataMenu}
          mainMenu={mainMenu}
          reportMenu={reportMenu}
          serviceRepairMenu={serviceRepairMenu}
          reportDataMenu={reportDataMenu}
        />
      )}
      <div className={`page-wrapper ${!isLandingPage ? "full-page" : ""}`}>
        {isLandingPage && <Navbar onLogout={logout} userDetail={userDetail} />}
        <div className="container">
          <div className="scrolled-content">
            {children}
            {isLandingPage && <Footer />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(TemplateComponent);
