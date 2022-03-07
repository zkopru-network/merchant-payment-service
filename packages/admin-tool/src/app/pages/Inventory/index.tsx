/**
 *
 * Inventory
 *
 */
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Table } from '../../components/Table';
import { Space } from 'antd';
import 'antd/dist/antd.css';
import { SideBar } from '../../components/SideBar';
import inventoriesData from '../../demodata/inventories.json';
import Modal from 'react-modal';
import { Form, Input } from 'antd';
import { useInventorySlice } from './slice';
import { ReactReduxContext } from 'react-redux';
import { STATUS_CODES } from 'http';
import { Redirect, useHistory } from 'react-router-dom';
import { useLoginSlice } from '../Login/slice';
import { isConstructorDeclaration } from 'typescript';

interface Props {}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function Inventory(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { store } = useContext(ReactReduxContext);
  const { getState, dispatch, subscribe } = store;

  const [storeState, setStoreState] = useState(getState());
  const { actions } = useInventorySlice();
  useEffect(() =>
    subscribe(() => {
      setStoreState(getState());
    }),
  );
  const state = store.getState();
  const history = useHistory();

  console.log('islogin', window.localStorage.getItem('isLogin'));
  if (!window.localStorage.getItem('isLogin')) {
    history.push('/login');
  }

  const [productName, setProductName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [ticker, setTicker] = React.useState('ETH');
  const [price, setPrice] = React.useState(0);

  console.log('state from inventory', state.inventories);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    { title: 'title', dataIndex: 'title', key: 'title' },
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: 'description', dataIndex: 'description', key: 'description' },
    { title: 'price', dataIndex: 'price', key: 'price' },
    { title: 'ticker', dataIndex: 'ticker', key: 'ticker' },
    {
      title: 'deleteButton',
      dataIndex: 'deleteButton',
      key: 'deleteButton',
      render: (text, record) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                dispatch(actions.removeInventory(record.id));
              }}
            >
              delete{' '}
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <Div>
      <SideBar></SideBar>

      <ButtonWrapper>
        <Header style={{ alignSelf: 'start' }}>NFTs </Header>
        <Button onClick={() => dispatch(actions.openFirstModal())}>
          Register
        </Button>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ alignSelf: 'start' }}
        >
          <Form.Item
            label="search"
            name="search"
            rules={[{ required: true, message: 'search' }]}
          >
            <Input style={{ width: '40rem' }} />
          </Form.Item>
        </Form>
      </ButtonWrapper>
      <Modal
        isOpen={state.inventories.firstModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => dispatch(actions.closeFirstModal())}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={event => setProductName(event.target.value)}
            // ref={node => (this.inputNode = node)}
          />
          <Input
            type="text"
            name="description"
            placeholder="Brief Description"
            onChange={event => setDescription(event.target.value)}
            // ref={node => (this.inputNode = node)}
          />
          <Input
            type="number"
            name="price"
            placeholder="0.1"
            onChange={event => setPrice(Number(event.target.value))}
            // ref={node => (this.inputNode = node)}
          />
          <PriceDiv>
            <MySelect>
              <option>ETH</option>
              <option>DAI</option>
            </MySelect>
            <NextButton
              onClick={() => {
                dispatch(actions.openSecondModal());
                dispatch(actions.closeFirstModal());
              }}
            >
              next
            </NextButton>
          </PriceDiv>
        </form>
      </Modal>

      <Modal
        isOpen={state.inventories.secondModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={state.inventories.secondModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
          <select>
            <option value="1">demo NFT 1</option>
            <option value="2">demo NFT 2</option>
          </select>
          <button
            onClick={event => {
              event.preventDefault();
              console.log({
                key: state.inventories.data.length + 1,
                title: productName,
                description: description,
                id: Math.floor(Math.random() * 60000) + 1,
                ticker: ticker,
                price: price,
                amount: 1,
                total: 1,
                type: 'ERC721',
                imageUrl:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png',
              });
              dispatch(
                actions.addInventory({
                  key: state.inventories.data.length + 1,
                  title: productName,
                  description: description,
                  id: Math.floor(Math.random() * 60000) + 1,
                  ticker: ticker,
                  price: price,
                  amount: 1,
                  total: 1,
                  type: 'ERC721',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png',
                }),
              );
              dispatch(actions.closeSecondModal());
            }}
          >
            registger
          </button>
        </form>
      </Modal>

      <Table columns={columns} data={state.inventories.data}></Table>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: ${p => p.theme.backgroundVariant};
  height: 100vh;
  color: white;
`;
const Header = styled.h1`
  color: white;
  text-align: center;
`;
const MyModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 6px 8px;

  position: static;
  width: 452px;
  height: 229px;
  left: 379.5px;
  top: 70px;

  /* Base/1 */

  background: #081b24;
  /* Stroke/3 */

  border: 1px solid #2a3d46;
  box-sizing: border-box;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 16px 0px;
`;
const Button = styled.button`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;

  position: relative;
  width: 145px;
  height: 30px;
  left: 2px;
  top: 0px;

  /* Primary/Mint 1 */

  background: #a2efe1;
  border-radius: 20px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 10px;
`;
const ButtonWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15rem;
  margin-right: 3rem;
`;
const MyInput = styled.input`
  /* Input Field */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;

  position: static;
  width: 20rem;
  height: 2rem;
  left: 0px;
  top: 0px;

  /* Base/0 */

  background: #05141a;
  /* Text / Mint Bright */

  border: 1px solid #9effee;
  box-sizing: border-box;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 0px;
`;
const NextButton = styled.button`
  /* BUTTON */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;

  position: static;
  width: 80px;
  height: 32px;
  left: 23px;
  top: 0px;

  /* Primary/Mint 1 */

  background: #a2efe1;
  border-radius: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 10px 0px;
`;

const MySelect = styled.select`
  /* L */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;

  position: static;
  width: 96px;
  height: 40px;
  left: 0px;
  top: 0px;

  /* Base/2 */

  background: #192c35;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 24px 0px;
`;
const PriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
