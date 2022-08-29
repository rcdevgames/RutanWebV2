import React from "react";
import history from "./History";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as Selectors from "../modules/Auth/Selector/AuthSelector";
import ConfigAxios from "./axios/ConfigAxios";
import { navigate } from "./Helpers";

const AuthMiddleware = (ComposedComponent, menuPath) => {
  const returnData = (props) => {
    const { isAuthenticated, redirect, userMenus, redirectToServices } = props;

    if (!isAuthenticated) {
      redirect();
    } else {
      const isMenuCanAccess = userMenus.filter((x) => x.path === menuPath);

      if (isMenuCanAccess.length <= 0) {
        redirectToServices();
      }
      ConfigAxios.defaults.headers[
        "Authorization"
      ] = `Bearer ${isAuthenticated}`;
    }

    return (
      <div>{isAuthenticated ? <ComposedComponent {...props} /> : null}</div>
    );
  };

  const mapStateToProps = createStructuredSelector({
    isAuthenticated: Selectors.Token(),
    userRole: Selectors.UserRole(),
    userMenus: Selectors.UserMenus(),
  });
  const mapDispatchToProps = (dispatch) => ({
    redirect: () => history.push("/auth"),
    redirectToServices: () => navigate("/list_service"),
  });
  return connect(mapStateToProps, mapDispatchToProps)(returnData);
};

export default AuthMiddleware;
