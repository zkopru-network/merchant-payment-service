/**
 *
 * Balance
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { SideBar } from '../../components/SideBar';
import { Table } from '../../components/Table';
import { Button } from 'antd';
import balancesData from '../../demodata/balances.json';
// import { BasePage } from '../BasePage';
interface Props {}
const data = balancesData;
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'ticker',
    dataIndex: 'ticker',
    key: 'ticker',
  },
  {
    title: 'amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'usd',
    dataIndex: 'usd',
    key: 'usd',
  },
];
// const content = (
// <>
//   <Button type="primary" size="small">withdraw</Button>
//     <span>$0.00 Available Balance</span>
//     <Table columns={columns} data={data}></Table>
//     <p>{'balance'}</p>
// </>
// );
export function Balance(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <>
      <Div>
        <SideBar></SideBar>
        <>
          <Button type="primary" size="small">
            withdraw
          </Button>
          <span>$0.00 Available Balance</span>
          <Table columns={columns} data={data.coins}></Table>
          <p>{'balance'}</p>
        </>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
`;
