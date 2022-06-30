import React from "react";
import TabPanelSummaryComponent from "../../Component/TabPanel/TabPanelSummaryComponent";

const TabPanelSummaryContainer = (props) => {
  const { summary } = props;
  const [summaryArr, setSummaryArr] = React.useState([]);

  React.useEffect(() => {
    const summaryMapping = [];

    summary.map((item, index) => {
      const summaryText = item.summary;
      const splitSummary = summaryText.split("\n");
      summaryMapping.push({ unitName: item.unitName, summary: splitSummary });
    });
    setSummaryArr(summaryMapping);
  }, [summary]);

  return <TabPanelSummaryComponent summaryArr={summaryArr} {...props} />;
};

export default TabPanelSummaryContainer;
