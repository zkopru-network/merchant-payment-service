import { NavBar } from 'app/components/NavBar';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { SideBar } from 'app/components/SideBar';
export function HomePage() {
  return (
    <>
      <Wrapper>
        <Helmet>
          <title>HomePage</title>
          <meta
            name="description"
            content="A Boilerplate application homepage"
          />
        </Helmet>
        <SideBar></SideBar>
        <span>My HomePage</span>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${p => p.theme.backgroundVariant};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;
