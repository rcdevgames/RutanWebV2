import React from "react";
import LoginComponent from "../Component/LoginComponent";
import { reduxForm, reset } from "redux-form"; // imported Field
import { connect } from "react-redux";
import * as AuthActions from "../Store/AuthAction";
import * as AuthSelector from "../Selector/AuthSelector";
import * as validateForm from "../../../app/validateForm";
import { createStructuredSelector } from "reselect";

const LoginContainer = (props) => {
  const { valid } = props;

  const submitForm = (values) => {
    if (valid) {
      AuthActions.handleSubmitLogin(values);
    }
  };

  return <LoginComponent submitForm={submitForm} {...props} />;
};

const mapStateToProps = createStructuredSelector({
  auth: AuthSelector.AllAuthData(),
  error: AuthSelector.ErrorData(),
});

const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("loginForm"));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

export default reduxForm({
  form: "loginForm",
  validate: validateForm.validateFormLogin,
})(EnhanceContainer);
