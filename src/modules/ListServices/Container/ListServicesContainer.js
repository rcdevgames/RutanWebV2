import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { navigate } from "../../../app/Helpers";
import ListServicesComponent from "../Component/ListServicesComponent";
import * as ListServiceActions from "../Store/ListServicesActions";

const ListServicesContainer = (props) => {
  const {
    getListServices,
    handlePressEdit,
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
    <ListServicesComponent
      headers={headers}
      listServices={listServices}
      handlePressEdit={handlePressEdit}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({
  getListServices: () => ListServiceActions.getListServicesRequested(),
  handlePressEdit: async (value) => {
    await dispatch(ListServiceActions.setSelectedJobService(value));
    setTimeout(() => {
      navigate("detail-services");
    }, 500);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListServicesContainer);

export default reduxForm({
  form: "listServices",
})(EnhanceContainer);
