import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as ComponentActions from "../../App/Store/ComponentAction";
import RolesEditModalComponent from "../Component/RolesEditModalComponent";

const RolesEditModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
    } else {
    }
  };

  return (
    <RolesEditModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  component: state.component,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEditModalContainer);

export default reduxForm({
  form: "editRolesForm",
})(EnhanceContainer);
