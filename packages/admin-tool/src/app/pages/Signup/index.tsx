/**
 *
 * Signin
 *
 */
import { Button, Checkbox, Col, Form, Input, Layout, Row } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import * as React from 'react';
import { ReactReduxContext } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useLoginSlice } from '../Login/slice';

interface Props {}

export function Signup(props: Props) {
  const { actions } = useLoginSlice();
  const { store } = React.useContext(ReactReduxContext);
  const { getState, dispatch, subscribe } = store;

  const [storeState, setStoreState] = React.useState(getState());
  const history = useHistory();

  React.useEffect(() =>
    subscribe(() => {
      setStoreState(getState());
    }),
  );

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Header></Header>
      <Content>
        <Row>
          <Col span={6}> </Col>
          <Col span={8}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="L1Address"
                name="L1Address"
                rules={[
                  { required: true, message: 'Please input your L1Address!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="L2PrivateKey"
                name="L2PrivateKey"
                rules={[
                  {
                    required: true,
                    message: 'Please input your L2PrivateKey!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(actions.login());
                    history.push('/');
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={3}> </Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}
