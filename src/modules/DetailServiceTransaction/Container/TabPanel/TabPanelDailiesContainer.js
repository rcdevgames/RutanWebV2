import React from "react";
import { connect } from "react-redux";
import { store } from "../../../../app/ConfigureStore";
import TabPanelDailiesComponent from "../../Component/TabPanel/TabPanelDailiesComponent";
import {
  mapDailiesToForm,
  setEditDailiesModal,
  setSelectedEditDailiesData,
} from "../../Store/DetailServiceTransactionAction";

const TabPanelDailiesContainer = (props) => {
  return <TabPanelDailiesComponent {...props} />;
};

const mapStateToProps = (state) => ({
  branch: state.branch,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressEdit: async (values) => {
    await dispatch(setSelectedEditDailiesData(values));
    store.dispatch(setEditDailiesModal(true));
    mapDailiesToForm();
  },
  handlePressCancel: () => {
    store.dispatch(setEditDailiesModal(false));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelDailiesContainer);

export default EnhanceContainer;
