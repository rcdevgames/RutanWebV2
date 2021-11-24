import React from "react";
import LoginComponent from "../Component/LoginComponent";
import { reduxForm, reset } from "redux-form"; // imported Field
import { connect } from "react-redux";
import * as AuthActions from "../Store/AuthAction";

const LoginContainer = (props) => {
  const submitForm = (values) => {
    AuthActions.handleSubmitLogin(values);
  };

  return <LoginComponent submitForm={submitForm} {...props} />;
};

const mapStateToProps = (state) => ({});
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
  // onSubmit,
  // no fields array given
})(EnhanceContainer);
