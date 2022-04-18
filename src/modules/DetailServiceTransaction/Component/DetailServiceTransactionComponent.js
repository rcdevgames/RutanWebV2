import React from "react";
import { Divider, Tabs } from "antd";
import { Typography } from "antd";
import CBadgeText from "../../../components/CBadgeText/CBadgeText";
import moment from "moment";
import AddEmployeeModalContainer from "../Container/AddEmployeeModalContainer";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { navigate } from "../../../app/Helpers";
import CSelect from "../../../components/CSelect/CSelect";
import { Themes } from "../../../property/colors";

const { Text } = Typography;
const { TabPane } = Tabs;

const DetailServiceTransactionComponent = (props) => {
  const {
    data,
    TabPanel,
    onChangeTab,
    handlePressGeneratePdf,
    enumUnits,
    onchangeUnit,
    handlePressActions,
  } = props;

  const RenderButtonAction = ({ status }) => {
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
      case "approved":
        button = (
          <>
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
            <div class="ml-3" />
            <CButtonAntd
              onClick={() => handlePressActions(data.id, "finished")}
              type="primary"
              icon={<CheckCircleOutlined />}
              size="middle"
              backgroundColor={Themes.success}
            >
              Finished
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
                <div class="row mb-3">
                  <CButtonAntd
                    onClick={() => navigate("list_service")}
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    size="middle"
                    danger
                  >
                    Kembali
                  </CButtonAntd>
                  <div class="ml-3" />
                  <CButtonAntd
                    // onClick={handlePressAddNew}
                    type="primary"
                    icon={<EditOutlined />}
                    size="middle"
                  >
                    Ubah
                  </CButtonAntd>
                  <RenderButtonAction status={data.status} />
                  <div class="ml-3" />
                  <CButtonAntd
                    onClick={handlePressGeneratePdf}
                    type="primary"
                    icon={<FilePdfOutlined />}
                    size="middle"
                  >
                    Cetak Formulir
                  </CButtonAntd>
                  <div class="mr-3" />
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

              {/* This for filter unit */}
              <Divider orientation="left">Filter Data</Divider>
              <div class="row d-flex mb-2">
                <div class="col-md-3">
                  <CSelect
                    data={enumUnits ?? []}
                    name="unit"
                    label="Filter Unit"
                    placeholder="-Pilih Semua-"
                    onChange={onchangeUnit}
                  />
                </div>
              </div>

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
      <AddEmployeeModalContainer />
    </div>
  );
};

export default DetailServiceTransactionComponent;
