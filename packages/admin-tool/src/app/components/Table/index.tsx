/**
 *
 * Table
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Table as AntdTable } from 'antd';

interface Column {
  title: string;
  dataIndex: string;
  key: string;
}
interface Props {
  columns: Column[];
  data: any[];
}
const customStyle = {
  width: '80vw',
  // display: "flex",
  // flexDirection: "row",
  // alignItems: "center",
  // padding: "8px 8px 8px 0px",
  // position: "static",
  // height: "57px",
  // left: "0px",
  // top: "0px",
  // background: "#081B24",
  // boxShadow: "0px 1px 0px #2A3D46",
  // flex: "none",
  // order: 0,
  // alignSelf: "stretch",
  // flexGrow: 0,
  // margin: "10px 0px"
} as any;

export function Table(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { columns, data } = props;
  return (
    <Div>
      <AntdTable
        columns={columns}
        dataSource={data}
        style={customStyle}
      ></AntdTable>
    </Div>
  );
}

const Div = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;
