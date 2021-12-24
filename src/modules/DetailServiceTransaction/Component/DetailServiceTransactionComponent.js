import React from "react";
import { Tabs } from "antd";
import { Typography } from "antd";
import CBadgeText from "../../../components/CBadgeText/CBadgeText";
import moment from "moment";

const { Text } = Typography;
const { TabPane } = Tabs;

const DetailServiceTransactionComponent = (props) => {
  const { data, TabPanel, onChangeTab } = props;
  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Detail Transaksi</h6>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="col-md-6">
                  <Text>Tipe : </Text>
                  <CBadgeText
                    type={
                      data.type.toLowerCase() === "repair" ? "info" : "success"
                    }
                  >
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
                  <Text>{data.job_forms ?? "-"}</Text>
                  <br />
                  <Text>Customer : </Text>
                  <Text strong>{data.customer_name}</Text>
                  <br />
                  <Text>Warranty : </Text>
                  <Text strong>
                    {data.warranty ? "Warranty" : "No Warranty"}
                  </Text>
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
                  <Text strong>{data.location}</Text>
                </div>
                <div class="col-md-4"></div>
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
    </div>
  );
};

export default DetailServiceTransactionComponent;
