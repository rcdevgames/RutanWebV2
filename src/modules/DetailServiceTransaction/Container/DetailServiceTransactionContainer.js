import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import DetailServiceTransactionComponent from "../Component/DetailServiceTransactionComponent";
import {
  FileImageOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  CloseSquareOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import TabPanelEmployeeContainer from "./TabPanel/TabPanelEmployeeContainer";
import * as DetailServiceActions from "../Store/DetailServiceTransactionAction";
import * as EmployeesActions from "../../Employees/Store/EmployeesActions";
import TabPanelSummaryContainer from "./TabPanel/TabPanelSummaryContainer";
import TabPanelImagesContainer from "./TabPanel/TabPanelImagesContainer";
import TabPanelDailiesContainer from "./TabPanel/TabPanelDailiesContainer";
import TabPanelHistoriesContainer from "./TabPanel/TabPanelHistoriesContainer";
import { exportDetailServicePdf } from "../Store/DetailServiceTransactionReport";

const Panel1 = ({ title }) => {
  return (
    <div>
      <h6>{title}</h6>
    </div>
  );
};

const DetailServiceTransactionContainer = (props) => {
  const {
    services: { selectedJobService },
    detailService: {
      selectedServiceEmployeeList,
      selectedServiceSummary,
      selectedServiceMedia,
      selectedServiceDailies,
      selectedServiceHistories,
    },
  } = props;

  const printedData = {
    selectedJobService,
    selectedServiceEmployeeList,
    selectedServiceSummary,
    selectedServiceMedia,
    selectedServiceDailies,
    selectedServiceHistories,
  };

  const TabPanel = [
    {
      key: "panel-teknisi",
      title: "Teknisi",
      icon: <UsergroupAddOutlined />,
      component: (
        <TabPanelEmployeeContainer employees={selectedServiceEmployeeList} />
      ),
    },
    {
      key: "panel-gambar",
      title: "Gambar",
      icon: <FileImageOutlined />,
      component: <TabPanelImagesContainer medias={selectedServiceMedia} />,
    },
    {
      key: "panel-dailies",
      title: "Catatan Teknisi",
      icon: <EditOutlined />,
      component: <TabPanelDailiesContainer dailies={selectedServiceDailies} />,
    },
    {
      key: "panel-summary",
      title: "Summary",
      icon: <FileTextOutlined />,
      component: <TabPanelSummaryContainer summary={selectedServiceSummary} />,
    },
    {
      key: "panel-7",
      title: "Alasan Reject",
      icon: <CloseSquareOutlined />,
      component: <Panel1 title="Alasan Reject" />,
    },
    {
      key: "panel-histories",
      title: "History",
      icon: <HistoryOutlined />,
      component: (
        <TabPanelHistoriesContainer
          title="History"
          histories={selectedServiceHistories}
        />
      ),
    },
  ];

  if (selectedJobService.is_external) {
    TabPanel.push({
      key: "panel-1",
      title: "Checklist",
      icon: <CheckCircleOutlined />,
      component: <Panel1 title="Checklist" />,
    });
  }

  const onChangeTab = (activeTab) => {
    switch (activeTab.toLowerCase()) {
      case "panel-teknisi":
        DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
        break;

      case "panel-summary":
        DetailServiceActions.getJobServiceSummary(selectedJobService.id);
        break;

      case "panel-gambar":
        DetailServiceActions.getJobServiceMedia(selectedJobService.id);
        break;

      case "panel-dailies":
        DetailServiceActions.getJobServiceDailies(selectedJobService.id);
        break;

      case "panel-histories":
        DetailServiceActions.getJobServiceHistories(selectedJobService.id);
        break;

      default:
        console.log("no panel selected...");
        break;
    }
  };

  React.useEffect(() => {
    // EmployeesActions.loadEmployeeListData();
    DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
  }, []);

  const handlePressGeneratePdf = () => {
    exportDetailServicePdf(printedData);
  };

  return (
    <DetailServiceTransactionComponent
      data={selectedJobService}
      TabPanel={TabPanel}
      onChangeTab={onChangeTab}
      handlePressGeneratePdf={handlePressGeneratePdf}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  detailService: state.detailService,
});
const mapDispatchToProps = (dispatch) => ({});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailServiceTransactionContainer);

export default reduxForm({
  form: "detailJobServices",
})(EnhanceContainer);
