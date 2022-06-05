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
import TabPanelSummaryContainer from "./TabPanel/TabPanelSummaryContainer";
import TabPanelImagesContainer from "./TabPanel/TabPanelImagesContainer";
import TabPanelDailiesContainer from "./TabPanel/TabPanelDailiesContainer";
import TabPanelHistoriesContainer from "./TabPanel/TabPanelHistoriesContainer";
import { exportDetailServicePdf } from "../Store/DetailServiceTransactionReport";
import * as ListServiceActions from "../../ListServices/Store/ListServicesActions";
import { enumSelectGenerator } from "../../../app/Helpers";
import TabPanelRejectionsContainer from "./TabPanel/TabPanelRejectionsContainer";
import TabPanelChecklistContainer from "./TabPanel/TabPanelChecklistContainer";
import { store } from "../../../app/ConfigureStore";

const DetailServiceTransactionContainer = (props) => {
  const {
    services: { selectedJobService },
    detailService: {
      selectedServiceEmployeeList,
      selectedServiceSummary,
      selectedServiceMedia,
      selectedServiceDailies,
      selectedServiceHistories,
      selectedServiceChecklist,
      selectedServiceRejected,
      selectedUnit,
    },
  } = props;

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
      key: "panel-rejected",
      title: "Alasan Reject",
      icon: <CloseSquareOutlined />,
      component: (
        <TabPanelRejectionsContainer rejections={selectedServiceRejected} />
      ),
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
        <TabPanelChecklistContainer checklist={selectedServiceChecklist} />
      ),
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

  React.useEffect(() => {
    // EmployeesActions.loadEmployeeListData();
    DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
    DetailServiceActions.getJobServiceDailies(selectedJobService.id);
    DetailServiceActions.getJobServiceHistories(selectedJobService.id);
    DetailServiceActions.getJobServiceSummary(selectedJobService.id);
    DetailServiceActions.getJobServiceRejections(selectedJobService.id);
    DetailServiceActions.getJobServiceMedia(selectedJobService.id);
    return () => {
      store.dispatch(
        DetailServiceActions.setSelectedServicesChecklisttData([])
      );
      store.dispatch(DetailServiceActions.setSelectedServiceDailiesData([]));
      store.dispatch(DetailServiceActions.setSelectedServiceRejectedData([]));
      store.dispatch(DetailServiceActions.setSelectedServiceHistoriesData([]));
      store.dispatch(DetailServiceActions.setSelectedServiceMediaData([]));
      store.dispatch(
        DetailServiceActions.setSelectedServicesEmployeeListData([])
      );
    };
  }, []);

  const handlePressGeneratePdf = () => {
    exportDetailServicePdf(printedData);
  };

  // Mapping units from list_service
  const listUnitsFromService = [];
  if (selectedJobService.units) {
    selectedJobService.units.map((item, index) => {
      listUnitsFromService.push({ id: item.unit_id, name: item.unit_name });
    });
  }

  const SelectUnits = enumSelectGenerator(listUnitsFromService, "unit");

  const onchangeUnit = (val) => {
    const { dispatch } = store;
    const unitId = val.split("|");
    const [unitModelsId] = selectedJobService.units.filter(
      (x) => x.unit_id === unitId[0]
    );
    console.log("=== unit Name : ", unitId[1]);
    if (unitId[1] === undefined) {
      dispatch(DetailServiceActions.setSelectedUnit("Seluruh Unit"));
    } else {
      dispatch(DetailServiceActions.setSelectedUnit(unitId[1]));
    }

    DetailServiceActions.getJobServiceMedia(selectedJobService.id, unitId[0]);
    // DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
    DetailServiceActions.getJobServiceSummary(selectedJobService.id, unitId[0]);
    DetailServiceActions.getJobServiceDailies(selectedJobService.id, unitId[0]);
    // DetailServiceActions.getJobServiceHistories(selectedJobService.id);
    if (unitModelsId !== undefined) {
      DetailServiceActions.getChecklistData(unitModelsId.id);
    } else {
      dispatch(DetailServiceActions.setSelectedServicesChecklisttData([]));
    }
  };

  return (
    <DetailServiceTransactionComponent
      data={selectedJobService}
      TabPanel={TabPanel}
      onChangeTab={onChangeTab}
      handlePressGeneratePdf={handlePressGeneratePdf}
      enumUnits={SelectUnits}
      onchangeUnit={onchangeUnit}
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
