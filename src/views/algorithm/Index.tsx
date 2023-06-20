import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { useState } from "react";
import styled from "styled-components";
// import Caculation from '../../service/algorithsm/caculatation'
import Caculation from "~/service/algorithsm/caculatation";
import Chart from "./cordinate";

const Index = () => {
  const [fcmResults, setFcmResults] = useState(null);
  const [ssfcmResults, setSSFcmResults] = useState(null);
  const [dataUpload, setDataUpload] = useState(null);
  const handleSubmit = (res: any) => {
    if (res.type == "FCM") {
      const result: any = Caculation(
        res.type,
        dataUpload,
        +res.fuzzyness,
        +res.clusters,
        +res.maxIteration,
        +res.epsilon
      );
      setFcmResults(result);
      console.log(fcmResults);
    } else {
      const result: any = Caculation(
        res.type,
        dataUpload,
        res.labels,
        //+res.maxIteration,
        +res.epsilon,
        +res.k,
        +res.pointNumber
      );
      setSSFcmResults(result);
    }
  };

  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Form className="form" onFinish={handleSubmit} defaultChecked>
            <Form.Item
              label="CSV"
              name="data"
              id="fileInput"
              colon
              labelCol={{}}
            >
              <Upload
                accept=".txt, .csv"
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader();

                  reader.onload = (e) => {
                    // console.log(e.target.result);
                    setDataUpload(e.target.result);
                  };
                  reader.readAsText(file);

                  // Prevent upload
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              ;
            </Form.Item>
            <Form.Item
              label="m(fuzzyness)"
              name="fuzzyness"
              colon
              labelCol={{}}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Fuzzyness"
              />
            </Form.Item>
            <Form.Item label="k(clusters)" name="clusters" colon labelCol={{}}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Số lượng cụm"
              />
            </Form.Item>
            <Form.Item
              label="Max Iteration"
              name="maxIteration"
              colon
              labelCol={{}}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="MaxInteration"
              />
            </Form.Item>
            <Form.Item label="epsilon" name="epsilon" colon labelCol={{}}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="epsilon"
              />
            </Form.Item>
            <Form.Item name="type" label="Type" colon labelCol={{}}>
              <Select
                // style={{ width: 120 }}
                placeholder="Select type"
                options={[
                  {
                    value: "FCM",
                    label: "FCM",
                  },
                  {
                    value: "SSFCM",
                    label: "SSFCM",
                  },
                ]}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col span={18}>
          <RightWrapper>
            <h2 className="">Result</h2>
            <ResultWrapper>
            {fcmResults && Object.values(fcmResults.clusters[0].center).length == 2 && <Chart dataInput={fcmResults.datapoints}/> }                              

              {fcmResults && Object.values(fcmResults.clusters[0].center).length != 2&& (
                <ul>
                  {fcmResults.datapoints.map((datap: any, i: number) => (
                    <li key={i}>
                      Point {i + 1}:
                      <ul>
                        {Object.entries(datap).map(([k, v], index) => (
                          <li key={index}>
                            {k}: {v}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </ResultWrapper>

            <RightBottomWrapper>
              <Row gutter={[16, 16]}>
                <Col span={4}>
                  <InfoWrapper>
                    <div className="info">
                      <p className="title">FPC:</p>
                      <p className="title"> {fcmResults && fcmResults.fpc.toFixed(5)}</p>
                    </div>
                  </InfoWrapper>
                </Col>
                <Col span={4}>
                  <InfoWrapper>
                    <div className="info">
                      <p className="title">Vòng lặp:</p>
                      <p className="title">
                        {fcmResults && fcmResults.iterCount} vòng
                      </p>
                    </div>
                    <div className="info">
                      <p className="title">Thời gian:</p>
                      <p className="title">
                        {fcmResults && fcmResults.timeRun} ms
                      </p>
                    </div>
                  </InfoWrapper>
                </Col>
                <Col span={16}>
                  <InfoWrapper>
                    <h2 className="">Result</h2>
                    <div className="content">
                      {fcmResults && (
                        <ul>
                          {fcmResults.clusters.map(
                            (cluster: any, i: number) => (
                              <li key={i}>
                                Centroid {i + 1}:
                                <ul>
                                  {Object.entries(cluster.center).map(
                                    ([k, v], index) => (
                                      <li key={index}>
                                        {k}: {v}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </InfoWrapper>
                </Col>
              </Row>
            </RightBottomWrapper>
          </RightWrapper>
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid;
  border-radius: 10px;

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .ant-row.ant-form-item-row {
    display: flex;
    flex-direction: column;

    .ant-form-item-label {
      text-align: start;
    }
  }
`;

const RightWrapper = styled.div`
  h2 {
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 8px;
  }
`;
const RightBottomWrapper = styled.div`
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
`;
const ResultWrapper = styled.div`
  height: 300px;
  border: 1px solid;
  border-radius: 12px;
  padding: 8px;
  overflow-y: auto;
  margin-bottom: 12px;
`;

const InfoWrapper = styled.div`
  padding: 8px;
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .content {
    height: 180px;
    border: 1px solid;
    padding: 8px;
    border-radius: 10px;
    overflow-y: auto;
  }
`;

export default Index;
