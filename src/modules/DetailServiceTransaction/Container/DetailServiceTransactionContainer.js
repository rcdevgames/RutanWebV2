import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import DetailServiceTransactionComponent from "../Component/DetailServiceTransactionComponent";

const DetailServiceTransactionContainer = (props) => {
  const {
    services: { selectedJobService },
  } = props;

  return <DetailServiceTransactionComponent data={selectedJobService} />;
};

const mapStateToProps = (state) => ({
  services: state.services,
});
const mapDispatchToProps = (dispatch) => ({});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailServiceTransactionContainer);

export default reduxForm({
  form: "detailJobServices",
})(EnhanceContainer);
