import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import DetailTransactionPreviewPdf from "../Component/DetailTransactionPreviewPdf";

const DetailTransactionPreviewPdfContainer = (props) => {
  return <DetailTransactionPreviewPdf {...props} />;
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailTransactionPreviewPdfContainer);
