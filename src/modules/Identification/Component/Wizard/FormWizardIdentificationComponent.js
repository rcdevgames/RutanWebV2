import React from "react";

import { Steps, Button, message } from "antd";
import { Typography } from "antd";
import styled from "styled-components";
import CBadgeText from "../../../../components/CBadgeText/CBadgeText";

const { Text } = Typography;

const StepsContent = styled.div`
  min-height: 200px;
  margin-top: 16px;
  padding-top: 22px;
  text-align: center;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
`;

const StepsAction = styled.div`
  margin-top: 24px;
`;

const { Step } = Steps;

const FormWizardIdentificationComponent = (props) => {
  const { data, steps, saveFormChanges } = props;
  const [current, setCurrent] = React.useState(0);

  const onClickNext = () => {
    setCurrent(current + 1);
    saveFormChanges(false);
  };

  const onClickPrevious = () => {
    setCurrent(current - 1);
  };

  const onFinished = () => {
    message.success("Processing complete!");
    saveFormChanges(true);
  };

  return (
    <div class="page-content">
      <div class="mt-5">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Form Identification</h4>
            <h6 class="text-small">
              {data.milling ? "(Penggilingan)" : "(Non Penggilingan)"}
            </h6>
            <hr />
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="col-md-6 mb-3">
                <Text>Nama Customer : </Text>
                <Text strong>{data.customer_name ?? "-"}</Text>
                <br />
                <Text>Tipe : </Text>
                <Text strong>{data.type ?? "-"}</Text>
                <br />
                <Text>Cabang : </Text>
                <Text strong>{data.branch_name ?? "-"}</Text>
                <br />
                <Text>Status : </Text>
                <CBadgeText type="info">{data.status ?? "-"}</CBadgeText>
                <br />
                <Text>Dibuat : </Text>
                <Text strong>{data.created_date ?? "-"}</Text>
              </div>
            </div>
            <Steps current={current}>
              {steps.map((item) => (
                <Step
                  description={item.description}
                  key={item.title}
                  title={item.title}
                />
              ))}
            </Steps>
            <StepsContent>{steps[current].content}</StepsContent>
            <StepsAction>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={onClickNext}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={onFinished}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={onClickPrevious}>
                  Previous
                </Button>
              )}
            </StepsAction>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWizardIdentificationComponent;
