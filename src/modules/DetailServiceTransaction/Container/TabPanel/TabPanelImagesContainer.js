import React from "react";
import { connect } from "react-redux";
import TabPanelImagesComponent from "../../Component/TabPanel/TabPanelImagesComponent";
import {
  resetFormModalImage,
  setInsertMediaModal,
} from "../../Store/DetailServiceTransactionAction";

const TabPanelImagesContainer = (props) => {
  return <TabPanelImagesComponent {...props} />;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  handlePressAdd: async (values) => {
    await dispatch(setInsertMediaModal(true));
    resetFormModalImage();
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelImagesContainer);

export default EnhanceContainer;
