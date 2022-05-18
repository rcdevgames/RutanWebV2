import React from "react";
import { connect } from "react-redux";
import { store } from "../../../../app/ConfigureStore";
import TabPanelDailiesComponent from "../../Component/TabPanel/TabPanelDailiesComponent";
import { setEditDailiesModal } from "../../Store/DetailServiceTransactionAction";

const TabPanelDailiesContainer = (props) => {
  return <TabPanelDailiesComponent {...props} />;
};

const mapStateToProps = (state) => ({
  branch: state.branch,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressEdit: () => {
    store.dispatch(setEditDailiesModal(true));
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
