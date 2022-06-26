import React from "react";
import TabPanelSummaryComponent from "../../Component/TabPanel/TabPanelSummaryComponent";

const TabPanelSummaryContainer = (props) => {
  const { summary} = props;
  const [summaryArr, setSummaryArr] = React.useState([]);

  React.useEffect(() => {
    if (summary.summary) {
      const summaryText = summary.summary.split("\n");
      setSummaryArr(summaryText);
    } else {
      setSummaryArr([]);
    }
  }, [summary]);

  return <TabPanelSummaryComponent summaryArr={summaryArr} {...props} />;
};

export default TabPanelSummaryContainer;
