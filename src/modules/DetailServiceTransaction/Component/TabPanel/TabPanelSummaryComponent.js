import React, { Fragment } from "react";
import { Typography, Row, Empty, Divider, Col, Spin } from "antd";
import {
  FileOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";

const RenderItemSummary = ({ summary, index }) => {
  return summary.length > 0 ? (
    summary.map((item, indexText) => (
      <Typography key={`item-summary${index}-text-${indexText}`}>
        {item}
      </Typography>
    ))
  ) : (
    <Typography>Summary belum ada</Typography>
  );
};

const TabPanelSummaryComponent = (props) => {
  const { summaryArr, isLoaded, handlePressEdit, isBlockedRole, isExternal } =
    props;

  return (
    <div class="page-content">
      {!isLoaded ? (
        <div class="d-flex justify-content-center align-items-center">
          <Spin />
        </div>
      ) : (
        <Fragment>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Row
              style={{
                alignItems: "center",
              }}
            >
              <FileOutlined />
              <Typography style={{ marginLeft: 5 }}>Laporan Akhir</Typography>
            </Row>
            <div>
              {isExternal === false && summaryArr.length < 0 && (
                <CButtonAntd
                  onClick={() => handlePressEdit("NEW_SUMMARY")}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  size="middle"
                >
                  Tambah Summary
                </CButtonAntd>
              )}
            </div>
          </Row>
          <hr />
          <Row gutter={[16, 16]}>
            {summaryArr.length > 0 ? (
              summaryArr.map((item, index) => (
                <Col key={`col-unit-${index}`} span={12}>
                  <div class="card p-2">
                    {isBlockedRole && (
                      <CButtonAntd
                        onClick={() => handlePressEdit(item.id)}
                        type="primary"
                        icon={<EditOutlined />}
                        size="middle"
                      >
                        Ubah Summary
                      </CButtonAntd>
                    )}
                    <Divider
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                      plain
                    >
                      {isExternal ? `Unit ${item.unitName}` : "Job Summary"}
                    </Divider>
                    {<RenderItemSummary index={index} summary={item.summary} />}
                  </div>
                </Col>
              ))
            ) : (
              <div class="col-md-12 px-auto">
                <Empty />
              </div>
            )}
          </Row>
        </Fragment>
      )}
    </div>
  );
};

export default TabPanelSummaryComponent;
