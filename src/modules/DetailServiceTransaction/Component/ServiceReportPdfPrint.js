import {
  Card,
  Checkbox,
  Col,
  Divider,
  Empty,
  Image,
  Radio,
  Row,
  Typography,
} from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React from "react";
import "../Style/PrintPdfStyle.css";
import Meta from "antd/lib/card/Meta";
import { Themes } from "../../../property/colors";

const RenderImage = ({ medias, unit }) => {
  return medias.map((item, index) => {
    return (
      <Col key={`item-image-${index}`} span={12}>
        <Card
          hoverable
          style={{ width: 300, height: 260 }}
          cover={<Image width={"100%"} height={260} src={item.path} />}
        >
          <Meta
            style={{ marginTop: -10 }}
            title={`Gambar Penting ${index + 1}`}
          />
        </Card>
      </Col>
    );
  });
};

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

class ServiceReportPdfPrint extends React.Component {
  render() {
    const { data, medias, checklist, employees, dailies, summary } = this.props;
    const startDate = moment(data.start).format("YYYY-MM-DD");
    const dueDate = moment(data.due).format("YYYY-MM-DD");
    const employeeList = [];
    const dailyList = [];

    const summaryMapping = [];
    summary.map((item, index) => {
      const summaryText = item.summary;
      const splitSummary = summaryText.split("\n");
      summaryMapping.push({ unitName: item.unitName, summary: splitSummary });
    });

    if (employees.length > 0) {
      employees.map((item, index) => {
        employeeList.push({
          no: index + 1,
          nik: item.nik,
          name: item.name,
          phone: item.phone,
          address: item.address,
          startDate: item.created_date,
        });
      });
    }

    if (dailies.length > 0) {
      dailies.map((item, index) => {
        dailyList.push({
          no: index + 1,
          name: item.employee_name,
          description: item.description,
          start: moment(item.daily_start).format("DD-MMM-YYYY"),
          end: moment(item.daily_end).format("DD-MMM-YYYY"),
          time: item.hours,
        });
      });
    } else {
      dailyList.push([]);
    }

    return (
      <div>
        {/* Header */}
        <div style={{ width: "100%" }}>
          <Divider
            style={{
              textTransform: "uppercase",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 16,
            }}
            plain
          >
            {`E-Report PT.Rutan`}
          </Divider>
        </div>
        <div class="d-flex justify-content-between mx-3">
          {/* Left Section */}
          <div class="col-md-6">
            {/* Section 1 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 105 }}>Tipe</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>{data.type ?? "-"}</Text>
              </div>
            </div>
            {/* Section 2 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 60 }}>Model (SN)</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>{data.model ?? "-"}</Text>
              </div>
            </div>
            {/* Section 3 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 65 }}>Job Forms</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>
                  {data.job_form_name ?? "-"}
                </Text>
              </div>
            </div>
            {/* Section 4 */}
            <div style={{ marginTop: 60 }} />
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 70 }}>Customer</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>
                  {data.customer_name ?? "-"}
                </Text>
              </div>
            </div>
            {/* Section 5 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 75 }}>Warranty</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>
                  {data.warranty ? "Warranty" : "No-Warranty"}
                </Text>
              </div>
            </div>
            {/* Section 6 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 110 }}>PIC</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>
                  {data.customer_pic_name ?? "-"}
                </Text>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div class="col-md-6">
            {/* Section 1 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 55 }}>Status Trans</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>{data.status ?? "-"}</Text>
              </div>
            </div>
            {/* Section 2 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 60 }}>job Perform</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>
                  {data.job_perform ?? "-"}
                </Text>
              </div>
            </div>
            {/* Section 3 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 65 }}>Start - Due</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>
                  {`${startDate} - ${dueDate}`}
                </Text>
              </div>
            </div>
            {/* Section 4 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 95 }}>Dibuat</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>
                  {data.created_date ?? "-"}
                </Text>
              </div>
            </div>
            {/* Section 5 */}
            <div class="row">
              <div class="col-md-12 p-1">
                <Text style={{ marginRight: 95 }}>Lokasi</Text>
                <Text>:</Text>
                <Text style={{ marginLeft: "5%" }}>{data.location ?? "-"}</Text>
              </div>
            </div>
          </div>
        </div>
        {/* Teknisi */}
        <div style={{ width: "100%" }}>
          <Divider
            orientation="left"
            style={{
              textTransform: "uppercase",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 16,
            }}
            plain
          >
            {`Teknisi`}
          </Divider>
        </div>
        <div class="m-4">
          <table>
            <tr>
              <th>#</th>
              <th>NIK</th>
              <th>Nama Karyawan</th>
              <th>No. Telpon</th>
              <th>Alamat</th>
              <th>Tanggal Mulai</th>
            </tr>
            {employeeList.map((itemEmployee, indexEmployee) => (
              <tr key={`employee-list-${indexEmployee}`}>
                <td>{itemEmployee.no}</td>
                <td>{itemEmployee.nik}</td>
                <td>{itemEmployee.name}</td>
                <td>{itemEmployee.phone}</td>
                <td>{itemEmployee.address}</td>
                <td>{itemEmployee.startDate}</td>
              </tr>
            ))}
          </table>
        </div>
        {/* Checklist */}
        <div style={{ width: "100%" }}>
          <Divider
            style={{
              textTransform: "uppercase",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 16,
              marginTop: 70,
            }}
            orientation="left"
            plain
          >
            {`Checklist`}
          </Divider>
        </div>
        <div class="row d-flex flex-wrap col md-12 ml-4">
          {checklist.length > 0 ? (
            checklist.map((itemUnit, indexUnit) => (
              <div key={`checklist-unit-${indexUnit}`}>
                <Divider
                  orientation="center"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 12,
                    fontWeight: "normal",
                  }}
                  plain
                >{`Unit ${itemUnit.unitName}`}</Divider>
                <Row gutter={[16, 16]}>
                  {itemUnit.checklist.map((itemChecklist, indexChecklist) => (
                    <Col key={`item-checklist-${indexChecklist}`} span={12}>
                      <div style={{ width: "100%" }}>
                        <div>
                          <div class="mb-2 mt-2 pb-2">
                            <Row
                              gutter={16}
                              style={{
                                alignItems: "center",
                                padding: "8px",
                                borderBottom: "1px solid #020202",
                                marginRight: "20px",
                                marginTop: "20px",
                              }}
                            >
                              <Col
                                style={style}
                                className="gutter-row"
                                span={7}
                              >
                                <Text strong style={{ fontSize: 10 }}>
                                  {itemChecklist.category_form_name}
                                </Text>
                              </Col>
                              <Col
                                style={style}
                                className="gutter-row"
                                span={4}
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

                          <Radio.Group disabled>
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
                                        span={8}
                                      >
                                        <div>
                                          <Typography
                                            style={{
                                              fontSize: 12,
                                              color: Themes.secondary,
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
                                        <div>
                                          <Checkbox
                                            checked={
                                              itemChecklist.fields[indexFields]
                                                .is_check
                                            }
                                            disabled={true}
                                          />
                                        </div>
                                      </Col>
                                      <Col
                                        style={style}
                                        className="gutter-row"
                                        span={4}
                                      >
                                        <div>
                                          <Checkbox
                                            checked={
                                              itemChecklist.fields[indexFields]
                                                .is_check
                                            }
                                            disabled={true}
                                          />
                                        </div>
                                      </Col>
                                      <Col
                                        style={style}
                                        className="gutter-row"
                                        span={4}
                                      >
                                        <div>
                                          <Checkbox
                                            checked={
                                              itemChecklist.fields[indexFields]
                                                .is_check
                                            }
                                            disabled={true}
                                          />
                                        </div>
                                      </Col>
                                      <Col
                                        style={style}
                                        className="gutter-row"
                                        span={4}
                                      >
                                        <div>
                                          <Checkbox
                                            checked={
                                              itemChecklist.fields[indexFields]
                                                .is_check
                                            }
                                            disabled={true}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  );
                                }
                              )}
                          </Radio.Group>
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
        {/* Media */}
        <div style={{ width: "100%", marginTop: 70 }}>
          <Divider
            orientation="left"
            style={{
              textTransform: "uppercase",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 16,
            }}
            plain
          >
            {`Gambar - Gambar`}
          </Divider>
        </div>
        {medias &&
          medias.length > 0 &&
          medias.map((item, index) => (
            <div key={`item-media-${index}`} class="ml-4">
              <Divider
                orientation="center"
                style={{
                  textTransform: "uppercase",
                  fontSize: 12,
                  fontWeight: "normal",
                }}
                plain
              >{`Unit ${item.unitName}`}</Divider>
              <Row gutter={[16, 16]}>
                <RenderImage medias={item.image} unit={item.unitName} />
              </Row>
            </div>
          ))}
        {/* Dailies */}
        <div style={{ width: "100%", marginTop: 70 }}>
          <Divider
            orientation="left"
            style={{
              textTransform: "uppercase",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 16,
            }}
            plain
          >
            {`Catatan Teknisi`}
          </Divider>
        </div>
        <div class="m-4">
          <table>
            <tr>
              <th>#</th>
              <th>Karyawan</th>
              <th>Deskripsi</th>
              <th>Mulai</th>
              <th>Selesai</th>
              <th>Jam</th>
            </tr>
            {dailyList.map((itemDily, indexDily) => (
              <tr key={`item-daily-${indexDily}`}>
                <td>{itemDily.no}</td>
                <td>{itemDily.name}</td>
                <td>{itemDily.description}</td>
                <td>{itemDily.start}</td>
                <td>{itemDily.end}</td>
                <td>{itemDily.time}</td>
              </tr>
            ))}
          </table>
        </div>
        {/* Dailies */}
        <div style={{ width: "100%", marginTop: 70 }}>
          <Divider
            orientation="left"
            style={{
              textTransform: "uppercase",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 16,
            }}
            plain
          >
            {`Laporan Akhir`}
          </Divider>
        </div>
        <div class="m-4">
          <Row gutter={[16, 16]}>
            {summaryMapping.length > 0 ? (
              summaryMapping.map((itemSummary, indexSummary) => (
                <Col key={`col-unit-${indexSummary}`} span={12}>
                  <div class="card p-2">
                    <Divider
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                      plain
                    >{`Unit ${itemSummary.unitName}`}</Divider>
                    <RenderItemSummary
                      index={indexSummary}
                      summary={itemSummary.summary}
                    />
                  </div>
                </Col>
              ))
            ) : (
              <div>
                <Typography>Tidak ada data</Typography>
              </div>
            )}
          </Row>
        </div>

        <div class="pagebreak"></div>
        <div class="m-4">
          <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
            <Col
              span={12}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                  Customer
                </Typography>
                <Divider style={{ marginTop: 0 }} />
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                  Teknisi
                </Typography>
                <Divider style={{ marginTop: 0 }} />
              </div>
            </Col>
          </Row>

          {/* Sign */}
          <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
            <Col
              span={12}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Typography style={{ fontSize: 16, fontWeight: "normal" }}>
                  {`( ${data.customer_name} )`}
                </Typography>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                {employeeList.length > 0 && (
                  <Typography style={{ fontSize: 16, fontWeight: "normal" }}>
                    {`( ${employeeList[0].name} )`}
                  </Typography>
                )}
              </div>
            </Col>
          </Row>

          <Row
            gutter={[16, 16]}
            style={{
              marginTop: 30,
              margin: "auto",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Col span={12}>
              <Typography style={{ textAlign: "center" }}>
                MENGETAHUI
              </Typography>
            </Col>
          </Row>

          {/* Section 2 sign */}
          <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
            <Col
              span={12}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                  Coordinator/Supervisor
                </Typography>
                <Divider style={{ marginTop: 0 }} />
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                  Branch Manager/Service Manager
                </Typography>
                <Divider style={{ marginTop: 0 }} />
              </div>
            </Col>
          </Row>

          {/* Sign */}
          <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
            <Col
              span={12}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    borderStyle: "dotted",
                    borderWidth: 1,
                    borderRadius: 1,
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    borderStyle: "dotted",
                    borderWidth: 1,
                    borderRadius: 1,
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const style = {
  width: "200px",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
};

export default ServiceReportPdfPrint;
