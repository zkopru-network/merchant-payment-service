import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as SafeIcon } from './assets/asset-safe.svg';
export function Logo() {
  return (
    <Wrapper>
      <Title>ZKOPRU SHOP</Title>
      <Description>
        {' '}
        <SafeIcon />
        Your Balance Is Private
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
`;
