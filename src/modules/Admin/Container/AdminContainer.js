import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import AdminComponent from "../Component/AdminComponent";
import * as AdminActions from "../Store/AdminActions";

const AdminContainer = (props) => {
  const {
    getListAdmin,
    admins: { listAdmin },
  } = props;
  const headers = ["No", "Username", "Nama Lengkap", "Dibuat", "Aksi"];

  React.useEffect(() => {
    getListAdmin();
    return () => {};
  }, []);

  return <AdminComponent headers={headers} listAdmin={listAdmin} />;
};

const mapStateToProps = (state) => ({
  admins: state.admins,
});
const mapDispatchToProps = (dispatch) => ({
  getListAdmin: () => AdminActions.getListAdminRequested(),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);

export default reduxForm({
  form: "loginForm",
})(EnhanceContainer);
