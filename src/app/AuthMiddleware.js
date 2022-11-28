import React from "react";
import history from "./History";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as Selectors from "../modules/Auth/Selector/AuthSelector";
import ConfigAxios from "./axios/ConfigAxios";
import { navigate } from "./Helpers";
import { setGlobalLoading } from "../modules/App/Store/ComponentAction";

const AuthMiddleware = (ComposedComponent, menuPath, isSecureRoute) => {
  const returnData = (props) => {
    const { isAuthenticated, redirect, userMenus, redirectToServices } = props;

    if (!isAuthenticated) {
      redirect();
    } else {
      if (isSecureRoute) {
        const isMenuCanAccess = userMenus.filter((x) => x.path === menuPath);

        if (isMenuCanAccess.length <= 0) {
          redirectToServices();
        }
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
    redirect: () => {
      setTimeout(() => {
        navigate("/auth");
        dispatch(setGlobalLoading(false));
      }, 1000);
    },
    redirectToServices: () => navigate("/list_service"),
  });
  return connect(mapStateToProps, mapDispatchToProps)(returnData);
};

export default AuthMiddleware;
