import React from "react";
import CGlobalOverlay from "../../../components/CGlobalOverlay/CGlobalOverlay";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";

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
        />
      )}
      <div className={`page-wrapper ${!isLandingPage ? "full-page" : ""}`}>
        {isLandingPage && <Navbar onLogout={logout} userDetail={userDetail} />}
        {children}
        {isLandingPage && <Footer />}
      </div>
    </React.Fragment>
  );
};

export default TemplateComponent;
