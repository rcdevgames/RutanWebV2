import React from "react";
import { Typography, Row, Empty, Col, Checkbox, Divider, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import Text from "antd/lib/typography/Text";
import { Themes } from "../../../../property/colors";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";

const TabPanelChecklistComponent = (props) => {
  const {
    isLoaded,
    isBlocked,
    checklistArr,
    handleChangeRadio,
    getDefaultValueCheckbox,
    handleSubmitUpdateChecklist,
  } = props;
  return (
    <div class="page-content">
      <Row
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Row style={{ alignItems: "center" }}>
          <EditOutlined />
          <Typography style={{ marginLeft: 5 }}>Checklist</Typography>
        </Row>
        {isBlocked && (
          <CButtonAntd
            onClick={handleSubmitUpdateChecklist}
            type="primary"
            icon={<EditOutlined />}
            size="middle"
          >
            Simpan
          </CButtonAntd>
        )}
      </Row>
      <hr />
      {!isLoaded ? (
        <div class="d-flex justify-content-center align-items-center">
          <Spin />
        </div>
      ) : (
        <div class="row d-flex flex-wrap col md-12">
          {checklistArr.length > 0 ? (
            checklistArr.map((itemUnit, indexUnit) => (
              <div key={`checklist-unit-${indexUnit}`}>
                <Divider
                  style={{
                    textTransform: "uppercase",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                  plain
                >{`Unit ${itemUnit.unitName}`}</Divider>
                <Row gutter={[16, 16]}>
                  {itemUnit.checklist.map((itemChecklist, indexChecklist) => (
                    <Col
                      key={`item-unit-checklist-${indexChecklist}`}
                      span={12}
                    >
                      <div style={{ width: "100%" }}>
                        <div>
                          <div class="mb-2 mt-2 pb-2">
                            <Row
                              gutter={16}
                              style={{
                                alignItems: "center",
                                // padding: "8px",
                                borderBottom: "1px solid #020202",
                                marginRight: "20px",
                                marginTop: "20px",
                              }}
                            >
                              <Col
                                style={style}
                                className="gutter-row"
                                span={6}
                              >
                                <Text
                                  strong
                                  style={{ fontSize: 10, textAlign: "left" }}
                                >
                                  {itemChecklist.category_form_name}
                                </Text>
                              </Col>
                              <Col
                                style={style}
                                className="gutter-row"
                                span={5}
                              >
                                <Text strong style={{ fontSize: 10 }}>
                                  ADJUST
                                </Text>
                              </Col>
                              <Col
                                style={style}
                                className="gutter-row"
                                span={4}
                              >
                                <Text strong style={{ fontSize: 10 }}>
                                  CHECK
                                </Text>
                              </Col>
                              <Col
                                style={style}
                                className="gutter-row"
                                span={4}
                              >
                                <Text strong style={{ fontSize: 10 }}>
                                  REPAIR
                                </Text>
                              </Col>
                              <Col
                                style={style}
                                className="gutter-row"
                                span={5}
                              >
                                <Text strong style={{ fontSize: 10 }}>
                                  REPLACE
                                </Text>
                              </Col>
                            </Row>
                          </div>

                          {itemChecklist.fields &&
                            itemChecklist.fields.map(
                              (itemFields, indexFields) => {
                                return (
                                  <Row
                                    key={`item-fields-${indexFields}`}
                                    gutter={16}
                                    style={{
                                      alignItems: "center",
                                      padding: "8px",
                                      borderBottom: "1px solid #020202",
                                      marginRight: "30px",
                                    }}
                                  >
                                    <Col
                                      style={style}
                                      className="gutter-row"
                                      span={7}
                                    >
                                      <div>
                                        <Typography
                                          style={{
                                            fontSize: 10,
                                            color: Themes.secondary,
                                            textAlign: "left",
                                          }}
                                        >
                                          {itemFields.field_name}
                                        </Typography>
                                      </div>
                                    </Col>
                                    <Col
                                      style={style}
                                      className="gutter-row"
                                      span={4}
                                    >
                                      <Radio.Group
                                        disabled={isBlocked ? false : true}
                                        onChange={(val) =>
                                          handleChangeRadio(
                                            val,
                                            indexChecklist,
                                            indexFields,
                                            indexUnit,
                                            itemFields
                                          )
                                        }
                                        value={getDefaultValueCheckbox(
                                          itemFields
                                        )}
                                        defaultValue={getDefaultValueCheckbox(
                                          itemFields
                                        )}
                                      >
                                        <Row
                                          key={`item-fields-${indexFields}`}
                                          gutter={16}
                                          style={{
                                            alignItems: "center",
                                            padding: "8px",
                                            marginRight: "30px",
                                          }}
                                        >
                                          <Col
                                            style={style}
                                            className="gutter-row"
                                            span={6}
                                          >
                                            <Radio
                                              value={`${
                                                itemFields.unit_field_id
                                              }-${Object.keys(itemFields)[3]}`}
                                            ></Radio>
                                          </Col>
                                          <Col
                                            style={style}
                                            className="gutter-row"
                                            span={6}
                                          >
                                            <Radio
                                              value={`${
                                                itemFields.unit_field_id
                                              }-${Object.keys(itemFields)[2]}`}
                                            />
                                          </Col>
                                          <Col
                                            style={style}
                                            className="gutter-row"
                                            span={6}
                                          >
                                            <Radio
                                              value={`${
                                                itemFields.unit_field_id
                                              }-${Object.keys(itemFields)[4]}`}
                                            />
                                          </Col>
                                          <Col
                                            style={style}
                                            className="gutter-row"
                                            span={6}
                                          >
                                            <Radio
                                              value={`${
                                                itemFields.unit_field_id
                                              }-${Object.keys(itemFields)[5]}`}
                                            />
                                          </Col>
                                        </Row>
                                      </Radio.Group>
                                    </Col>
                                  </Row>
                                );
                              }
                            )}
                        </div>
                        <div class="mr-3" />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))
          ) : (
            <div class="page-content">
              <Empty />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const style = {
  width: "200px",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
};

export default TabPanelChecklistComponent;
