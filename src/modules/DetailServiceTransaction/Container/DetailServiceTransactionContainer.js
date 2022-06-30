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
import * as ListServiceActions from "../../ListServices/Store/ListServicesActions";
import TabPanelRejectionsContainer from "./TabPanel/TabPanelRejectionsContainer";
import TabPanelChecklistContainer from "./TabPanel/TabPanelChecklistContainer";
import { store } from "../../../app/ConfigureStore";
import Invoke from "../../../app/axios/Invoke";
import { navigate } from "../../../app/Helpers";

const DetailServiceTransactionContainer = (props) => {
  const {
    services: { selectedJobService },
    detailService: {
      selectedServiceEmployeeList,
      selectedServiceSummary,
      selectedServiceMedia,
      groupingSelectedServiceMedia,
      groupingSelectedServiceSummary,
      groupingSelectedServiceChecklist,
      selectedServiceDailies,
      selectedServiceHistories,
      selectedServiceChecklist,
      selectedServiceRejected,
      selectedUnit,
    },
  } = props;
  const { dispatch } = store;

  const printedData = {
    selectedJobService,
    selectedServiceEmployeeList,
    selectedServiceSummary,
    selectedServiceMedia,
    selectedServiceDailies,
    selectedServiceHistories,
    selectedServiceChecklist,
    selectedServiceRejected,
    selectedUnit,
    groupingSelectedServiceMedia,
    groupingSelectedServiceSummary,
    groupingSelectedServiceChecklist,
  };

  const TabPanel = [
    {
      key: "panel-gambar",
      title: "Gambar",
      icon: <FileImageOutlined />,
      component: (
        <TabPanelImagesContainer medias={groupingSelectedServiceMedia} />
      ),
    },
    {
      key: "panel-summary",
      title: "Summary",
      icon: <FileTextOutlined />,
      component: (
        <TabPanelSummaryContainer summary={groupingSelectedServiceSummary} />
      ),
    },
    {
      key: "panel-teknisi",
      title: "Teknisi",
      icon: <UsergroupAddOutlined />,
      component: (
        <TabPanelEmployeeContainer employees={selectedServiceEmployeeList} />
      ),
    },
    {
      key: "panel-rejected",
      title: "Alasan Reject",
      icon: <CloseSquareOutlined />,
      component: (
        <TabPanelRejectionsContainer rejections={selectedServiceRejected} />
      ),
    },
    {
      key: "panel-dailies",
      title: "Catatan Teknisi",
      icon: <EditOutlined />,
      component: <TabPanelDailiesContainer dailies={selectedServiceDailies} />,
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
      key: "panel-checklist",
      title: "Checklist",
      icon: <CheckCircleOutlined />,
      component: (
        <TabPanelChecklistContainer
          checklist={groupingSelectedServiceChecklist}
        />
      ),
    });

    // Move content of checklist to index 0
    const fromIndex = TabPanel.indexOf("panel-checklist"); // 👉️ 0
    const toIndex = 0;

    const element = TabPanel.splice(fromIndex, 1)[0];
    console.log(element); // ['panel-checklist']

    TabPanel.splice(toIndex, 0, element);
  }

  const onChangeTab = (activeTab) => {
    switch (activeTab.toLowerCase()) {
      case "panel-teknisi":
        DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
        break;

      case "panel-summary":
        // DetailServiceActions.getJobServiceSummary(selectedJobService.id);
        break;

      case "panel-gambar":
        // DetailServiceActions.getJobServiceMedia(selectedJobService.id);
        break;

      case "panel-dailies":
        DetailServiceActions.getJobServiceDailies(selectedJobService.id);
        break;

      case "panel-histories":
        DetailServiceActions.getJobServiceHistories(selectedJobService.id);
        break;

      case "panel-checklist":
        // DetailServiceActions.getChecklistData(selectedJobService.id);
        break;

      case "panel-rejected":
        DetailServiceActions.getJobServiceRejections(selectedJobService.id);
        break;

      default:
        console.log("no panel selected...");
        break;
    }
  };

  const callInitialize = async () => {
    await EmployeesActions.loadEmployeeListData(1, 99999);
    await DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
    await DetailServiceActions.getJobServiceDailies(selectedJobService.id);
    await DetailServiceActions.getJobServiceHistories(selectedJobService.id);
    await DetailServiceActions.getJobServiceRejections(selectedJobService.id);
    await getGroupingUnitData();
  };

  const getGroupingUnitData = async () => {
    // Hit media api and grouping by units :
    let groupingMediaList = [];
    let groupingSummaryList = [];
    let groupingChecklist = [];
    if (selectedJobService.units) {
      await selectedJobService.units.map(async (item, index) => {
        const { data: dataMedia } = await Invoke.getJobServiceMedia(
          selectedJobService.id,
          item.id
        );
        const { data: dataSummary } = await Invoke.getJobServiceSummary(
          selectedJobService.id,
          item.id
        );
        const { data: dataChecklist } = await Invoke.getChecklistData(item.id);

        // Push to tempporary array
        groupingMediaList.push({
          unitName: item.unit_name,
          image: dataMedia.callback.data,
        });
        groupingSummaryList.push({
          unitName: item.unit_name,
          summary: dataSummary.callback.summary,
        });
        groupingChecklist.push({
          unitName: item.unit_name,
          checklist: dataChecklist.callback,
        });
      });

      // Save to reducer
      await dispatch(
        DetailServiceActions.setGroupingSelectedServicesMediaData(
          groupingMediaList
        )
      );
      await dispatch(
        DetailServiceActions.setGroupingSummaryData(groupingSummaryList)
      );
      await dispatch(
        DetailServiceActions.setGroupingChecklistData(groupingChecklist)
      );
    }
  };

  React.useEffect(() => {
    callInitialize();
  }, []);

  const handlePressGeneratePdf = () => {
    exportDetailServicePdf(printedData);
  };

  const handleBackToListService = () => {
    store.dispatch(DetailServiceActions.resetDetailService());
    setTimeout(() => {
      navigate("list_service");
    }, 500);
  };

  return (
    <DetailServiceTransactionComponent
      data={selectedJobService}
      TabPanel={TabPanel}
      onChangeTab={onChangeTab}
      handlePressGeneratePdf={handlePressGeneratePdf}
      goBack={handleBackToListService}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  detailService: state.detailService,
  units: state.units,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressDelete: (jobId) => {
    ListServiceActions.deleteJobServiceRequested(jobId);
  },
  handlePressActions: (jobId, type) => {
    ListServiceActions.handlePressActionsRequested(jobId, type);
  },
  handlePressEdit: async () => {
    await dispatch(DetailServiceActions.setEditTransactionModal(true));
    await DetailServiceActions.mapDetailTransactionToForm();
    dispatch(DetailServiceActions.setEditTransactionModal(true));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailServiceTransactionContainer);

export default reduxForm({
  form: "detailJobServices",
})(EnhanceContainer);
