import React from "react";
import LoginComponent from "../Component/LoginComponent";
import { reduxForm, reset } from "redux-form"; // imported Field
import { connect } from "react-redux";
import * as AuthActions from "../Store/AuthAction";
import * as validateForm from "../../../app/validateForm";

const LoginContainer = (props) => {
  const { valid } = props;

  const submitForm = (values) => {
    if (valid) {
      AuthActions.handleSubmitLogin(values);
    }
  };

  return <LoginComponent submitForm={submitForm} {...props} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
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
