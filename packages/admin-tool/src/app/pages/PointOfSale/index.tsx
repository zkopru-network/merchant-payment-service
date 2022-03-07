/**
 *
 * PointOfSale
 *
 */
import { Button, Card, Col, Input, Row, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import * as React from 'react';
import styled from 'styled-components/macro';
import Title from 'antd/lib/typography/Title';
import { SideBar } from 'app/components/SideBar';

interface Props {}

export function PointOfSale(props: Props) {
  return (
    <Div>
      <SideBar></SideBar>
      <Row>
        <Col span={5}></Col>
        <Col span={12}>
          <Card>
            <Title>Point Of Sales</Title>
            <Input.Group compact>
              <Input
                style={{ width: 'calc(100% - 200px)' }}
                defaultValue="yourwebsite.com/123123"
              />
              <Tooltip title="copy git url">
                <Button icon={<CopyOutlined />} />
              </Tooltip>
            </Input.Group>
          </Card>
        </Col>
      </Row>
    </Div>
  );
}

const Div = styled.div``;
