import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import ListServicesComponent from "../Component/ListServicesComponent";
import * as ListServiceActions from "../Store/ListServicesActions";

const ListServicesContainer = (props) => {
  const {
    getListServices,
    services: { listServices },
  } = props;
  const headers = [
    "No",
    "Tanggal",
    "Tipe",
    "Customer",
    "Teknisi",
    "Unit",
    "Model (SN)",
    "Status",
    "Dibuat",
    "Aksi",
  ];

  React.useEffect(() => {
    getListServices();
    return () => {};
  }, []);

  return (
    <ListServicesComponent headers={headers} listServices={listServices} />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({
  getListServices: () => ListServiceActions.getListServicesRequested(),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListServicesContainer);

export default reduxForm({
  form: "loginForm",
})(EnhanceContainer);
