import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as InventoryIcon } from './assets/inventory.svg';
import { ReactComponent as PaymentIcon } from './assets/payment.svg';
import { ReactComponent as BalanceIcon } from './assets/balance.svg';

const sidebarNavItems = [
  {
    display: 'HomePage',
    icon: <i className="bx bx-home"></i>,
    to: '/',
    section: 'home',
  },
  {
    display: 'Inventory',
    icon: <InventoryIcon />,
    to: '/inventory',
    section: 'Inventory',
  },
  {
    display: 'Payments',
    icon: <PaymentIcon />,
    to: '/payments',
    section: 'Payments',
  },
  {
    display: 'Balance',
    icon: <BalanceIcon />,
    to: '/balance',
    section: 'balance',
  },
];

export function Contents() {
  return (
    <>
      <Wrapper>
        {sidebarNavItems.map((item, index) => (
          <LinkWrapper>
            {item.icon}
            <Link to={item.to} key={index}>
              <Text>{item.display}</Text>
            </Link>
          </LinkWrapper>
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Text = styled.div`
  color: ${p => p.theme.text} !;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
