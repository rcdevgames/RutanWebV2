import React from "react";
import { Tabs } from "antd";
import { Typography } from "antd";
import CBadgeText from "../../../components/CBadgeText/CBadgeText";
import moment from "moment";
import AddEmployeeModalContainer from "../Container/AddEmployeeModalContainer";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  EditOutlined,
  StarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Themes } from "../../../property/colors";
import RejectedModalContainer from "../Container/RejectedModalContainer";
import EditModalTransactionContainer from "../Container/EditModalTransactionContainer";
import EditModalDailiesContainer from "../Container/EditModalDailiesContainer";
import InsertImageModalContainer from "../Container/InsertImageModalContainer";
import EditModalSummaryContainer from "../Container/EditModalSummaryContainer";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { TabPane } = Tabs;

const DetailServiceTransactionComponent = (props) => {
  const {
    data,
    isBlockedRole,
    TabPanel,
    onChangeTab,
    handlePressGeneratePdf,
    goBack,
    handlePressActions,
    handlePressEdit,
    handleSetOnProgress,
  } = props;

  const RenderButtonAction = ({ status, role }) => {
    let button;
    switch (status.toLowerCase()) {
      case "completed":
        button = (
          <>
            <div class="ml-3" />
            <CButtonAntd
              onClick={() => handlePressActions(data.id, "approved")}
              type="primary"
              icon={<CheckCircleOutlined />}
              size="middle"
              backgroundColor={Themes.success}
            >
              Approve
            </CButtonAntd>
            <div class="ml-3" />
            <CButtonAntd
              onClick={() => handlePressActions(data.id, "rejected")}
              type="primary"
              icon={<CloseCircleOutlined />}
              size="middle"
              backgroundColor={Themes.warning}
            >
              Reject
            </CButtonAntd>
          </>
        );
        break;
      case "progress":
        button = (
          <>
            <div class="ml-3" />
            <CButtonAntd
              onClick={() => handlePressActions(data.id, "finished")}
              type="primary"
              icon={<CheckCircleOutlined />}
              size="middle"
              backgroundColor={Themes.success}
            >
              Complete
            </CButtonAntd>
          </>
        );
        break;
      case "finished":
        button = (
          <>
            <div class="ml-3" />
            <CButtonAntd
              // onClick={handlePressAddNew}
              type="primary"
              icon={<CloseCircleOutlined />}
              size="middle"
              backgroundColor={Themes.warning}
            >
              Reject
            </CButtonAntd>
          </>
        );
        break;

      default:
        return <div />;
    }
    return button;
  };

  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center justify-content-between">
                <div>
                  <h6 class="card-title">Detail Transaksi</h6>
                </div>
                <div class="row mb-3 ml-2 mr-2">
                  <Link to={"/list_service"} onClick={goBack}>
                    <CButtonAntd
                      type="primary"
                      icon={<ArrowLeftOutlined />}
                      size="middle"
                      danger
                    >
                      Kembali
                    </CButtonAntd>
                  </Link>
                  <div class="ml-3" />
                  {data.status.toLowerCase() !== "approved" && !isBlockedRole && (
                    <CButtonAntd
                      onClick={handlePressEdit}
                      type="primary"
                      icon={<EditOutlined />}
                      size="middle"
                    >
                      Ubah
                    </CButtonAntd>
                  )}
                  {data.status.toLowerCase() === "rejected" && !isBlockedRole && (
                    <CButtonAntd
                      onClick={handleSetOnProgress}
                      type="primary"
                      icon={<StarOutlined />}
                      size="middle"
                    >
                      Set Job OnProgress
                    </CButtonAntd>
                  )}
                  <RenderButtonAction status={data.status} />
                  <div class="mr-3" />
                  {/* button to trigger printing of target component */}
                  {!isBlockedRole && (
                    <CButtonAntd
                      onClick={handlePressGeneratePdf}
                      type="primary"
                      icon={<FilePdfOutlined />}
                      size="middle"
                    >
                      Cetak Formulir
                    </CButtonAntd>
                  )}
                </div>
              </div>
              <div
                id="header-detail-transaction"
                class="d-flex justify-content-between align-items-baseline"
              >
                <div class="col-md-6">
                  <Text>Tipe : </Text>
                  <CBadgeText type={data.is_external ? "success" : "info"}>
                    {data.type ?? "-"}
                  </CBadgeText>
                  <br />
                  <Text>Unit : </Text>
                  <Text>{data.unit ?? "-"}</Text>
                  <br />
                  <Text>Model (SN) : </Text>
                  <Text>{data.model ?? "-"}</Text>
                  <br />
                  <Text>Job Forms : </Text>
                  <Text>{data.job_form_name ?? "-"}</Text>
                  <br />
                  <Text>Customer : </Text>
                  <Text strong>{data.customer_name}</Text>
                  <br />
                  <Text>Warranty : </Text>
                  <Text strong>
                    {data.warranty ? "Warranty" : "No Warranty"}
                  </Text>
                  <br />
                  <Text>PIC : </Text>
                  <Text strong>{data.customer_pic_name ?? "()"}</Text>
                </div>
                <div class="col-md-6">
                  <Text>Status Transaksi : </Text>
                  <CBadgeText
                    type={
                      data.status.toLowerCase() === "draft"
                        ? "warning"
                        : "success"
                    }
                  >
                    {data.status ?? "-"}
                  </CBadgeText>
                  <br />
                  <Text>Job Perform : </Text>
                  <Text strong>{data.job_perform}</Text>
                  <br />
                  <Text>Start - Due : </Text>
                  <Text strong>{`${moment(data.start).format(
                    "DD-MMM-YYYY"
                  )} - ${moment(data.due).format("DD-MMM-YYYY")}`}</Text>

                  <br />
                  <Text>Dibuat : </Text>
                  <Text strong>{data.created_date}</Text>
                  <br />
                  <Text>Lokasi : </Text>
                  <Text strong>{data.location ?? "-"}</Text>
                </div>
                <div class="col-md-4"></div>
              </div>

              <div class="ml-2 mt-3">
                <Tabs defaultActiveKey="1" onChange={onChangeTab}>
                  {TabPanel.map((item, index) => (
                    <TabPane
                      tab={
                        <span>
                          {item.icon}
                          {item.title}
                        </span>
                      }
                      key={item.key}
                    >
                      {item.component}
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddEmployeeModalContainer />
      <RejectedModalContainer />
      <EditModalTransactionContainer />
      <EditModalDailiesContainer />
      <InsertImageModalContainer />
      <EditModalSummaryContainer />
    </div>
  );
};

export default DetailServiceTransactionComponent;
