/**
 *
 * Payments
 *
 */
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { SideBar } from '../../components/SideBar';
import { Collapse } from 'antd';
import { Menu } from 'antd';
import paymentsData from '../../demodata/payments.json';

interface Props {}

export function Payments(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState('all');
  const [data, setData] = useState(paymentsData);
  const { Panel } = Collapse;
  function handleSelectMenu(event) {
    setSelectedMenu(event.key);
    console.log(event.key);
    switch (event.key) {
      case '1w':
        setData(
          paymentsData.filter(item => {
            return new Date().getTime() - item.timestamp < 604800;
          }),
        );
        return null;
      case '4w':
        setData(
          paymentsData.filter(item => {
            return new Date().getTime() - item.timestamp < 604800 * 4;
          }),
        );
        return null;
      case '1y':
        setData(
          paymentsData.filter(item => {
            return new Date().getTime() - item.timestamp < 86400 * 365;
          }),
        );
        return null;
      default:
        setData(paymentsData);
        return null;
    }
  }

  return (
    <Div>
      <SideBar></SideBar>
      {t('')}
      {/*  {t(...messages.someThing())}  */}
      {/* time window */}
      {/* search bar */}
      {/* table */}
      <Menu
        onClick={handleSelectMenu}
        selectedKeys={[selectedMenu]}
        mode="horizontal"
        style={{ width: '60rem', alignSelf: 'center' }}
      >
        <Menu.Item key="all">all day</Menu.Item>
        <Menu.Item key="1w">1w</Menu.Item>
        <Menu.Item key="4w">4w</Menu.Item>
        <Menu.Item key="1y">1y</Menu.Item>
      </Menu>
      <Collapse accordion style={{ width: '60rem', alignSelf: 'center' }}>
        {data.map((item, index) => (
          <Panel key={index} header={item.status}>
            <p>
              Completed: {item.timestamp} fee: {item.fee}
            </p>
            <p>Block Number: {item.blockNumber}</p>
            <p>block Hash: {item.blockHash}</p>
            <p>Transaction Index {item.transactionIndex}</p>
            <p>Transaction Hash {item.transactionHash}</p>
            <p>swap with:</p>
            <p>Transaction Index {item.swapTransactionIndex}</p>
            <p>TransactionHash {item.swapTransactionHash}</p>
            <p></p>
            {item.price}
          </Panel>
        ))}
      </Collapse>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-item: center;
`;
