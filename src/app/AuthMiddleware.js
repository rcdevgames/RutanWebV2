import React from "react";
import history from "./History";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as Selectors from "../modules/Auth/Selector/AuthSelector";
import ConfigAxios from "./axios/ConfigAxios";

const AuthMiddleware = (ComposedComponent) => {
  const returnData = (props) => {
    const { isAuthenticated, redirect } = props;

    if (!isAuthenticated) {
      redirect();
    } else {
      ConfigAxios.defaults.headers["Content-Type"] = "application/json";
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
  });
  const mapDispatchToProps = (dispatch) => ({
    redirect: () => history.push("/auth"),
  });
  return connect(mapStateToProps, mapDispatchToProps)(returnData);
};

export default AuthMiddleware;
