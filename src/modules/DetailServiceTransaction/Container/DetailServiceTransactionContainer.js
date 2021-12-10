import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import DetailServiceTransactionComponent from "../Component/DetailServiceTransactionComponent";
import * as DetailActions from "../Store/DetailServiceTransactionAction";

const DetailServiceTransaction = (props) => {
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
    <DetailServiceTransactionComponent
      headers={headers}
      listServices={listServices}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({
  // getListServices: () => DetailActions.getListServicesRequested(),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailServiceTransaction);

export default reduxForm({
  form: "loginForm",
})(EnhanceContainer);
