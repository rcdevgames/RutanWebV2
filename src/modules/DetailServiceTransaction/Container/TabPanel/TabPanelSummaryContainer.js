import React from "react";
import TabPanelSummaryComponent from "../../Component/TabPanel/TabPanelSummaryComponent";

const TabPanelSummaryContainer = (props) => {
  const { summary } = props;
  const [summaryArr, setSummaryArr] = React.useState([]);

  React.useEffect(() => {
    if (summary.length > 0) {
      const summaryMapping = [];
      summary.map((item, index) => {
        const summaryText = item.summary.split("\n");
        console.log("=== summary : ", summaryText);
        summaryMapping.push({ unitName: item.unitName, summary: summaryText });
      });
      setSummaryArr(summaryMapping);
      console.log("=== summaryMapping : ", summaryMapping);
    } else {
      setSummaryArr([]);
    }
  }, [summary]);

  return <TabPanelSummaryComponent summaryArr={summaryArr} {...props} />;
};

export default TabPanelSummaryContainer;
