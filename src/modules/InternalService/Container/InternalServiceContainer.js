import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import InternalServiceComponent from "../Component/InternalServiceComponent";
import * as validateForm from "../../../app/validateForm";

const InternalServiceContainer = (props) => {
  const { valid } = props;

  const submitForm = (values) => {
    if (valid) {
      // AuthActions.handleSubmitLogin(values);
      console.log("success");
    }
  };
  return <InternalServiceComponent submitForm={submitForm} {...props} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("internalServiceForm"));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalServiceContainer);

export default reduxForm({
  form: "internalServiceForm",
  validate: validateForm.validateFormInternalService,
})(EnhanceContainer);
