/**
 *
 * Login
 *
 */
import { Button, Col, Form, Input, Layout, Row } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import * as React from 'react';
import { ReactReduxContext } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useLoginSlice } from './slice';

interface Props {}

export function Login(props: Props) {
  const { store } = React.useContext(ReactReduxContext);
  const { getState, dispatch, subscribe } = store;

  const [storeState, setStoreState] = React.useState(getState());

  React.useEffect(() =>
    subscribe(() => {
      setStoreState(getState());
    }),
  );
  const state = store.getState();
  const history = useHistory();
  const { actions } = useLoginSlice();
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
              onFinish={() => {}}
              onFinishFailed={() => {}}
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
                <Button
                  onClick={() => {
                    history.push('/signup');
                  }}
                >
                  signup
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

const Div = styled.div``;
