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
interface Props {
  children: any;
}

export function BasePage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      <SideBar></SideBar>
      {props.children}
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  position: relative;
`;
