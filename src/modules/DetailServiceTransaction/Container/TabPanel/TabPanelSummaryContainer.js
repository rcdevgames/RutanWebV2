import React from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import TabPanelSummaryComponent from "../../Component/TabPanel/TabPanelSummaryComponent";
import { setEditSummaryModal } from "../../Store/DetailServiceTransactionAction";

const TabPanelSummaryContainer = (props) => {
  const { summary } = props;
  const [summaryArr, setSummaryArr] = React.useState([]);

  React.useEffect(() => {
    const summaryMapping = [];

    summary.map((item, index) => {
      const summaryText = item.summary ?? "";
      const checkBreakLine = summaryText.includes("\n");

      if (checkBreakLine) {
        const splitSummary = summaryText.split("\n");
        summaryMapping.push({
          id: item.id,
          unitName: item.unitName,
          summary: splitSummary,
        });
      } else {
        summaryMapping.push({
          id: item.id,
          unitName: item.unitName,
          summary: [summaryText],
        });
      }
    });
    setSummaryArr(summaryMapping);
  }, [summary]);

  return <TabPanelSummaryComponent summaryArr={summaryArr} {...props} />;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  handlePressEdit: async (unitId) => {
    dispatch(change("editSummaryForm", `unitId`, unitId));
    await dispatch(setEditSummaryModal(true));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelSummaryContainer);

export default EnhanceContainer;
