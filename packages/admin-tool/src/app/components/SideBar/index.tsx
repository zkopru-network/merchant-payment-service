import React from 'react';
import Sidebar from 'react-sidebar';
import { Contents } from './contents';

export function SideBar() {
  return (
    <Sidebar
      sidebar={<Contents />}
      open={true}
      onSetOpen={() => {
        return true;
      }}
      styles={{
        sidebar: {
          background: 'rgba(5, 20, 26, 1)',
          zIndex: 1,
          justifyContents: 'center',
          width: '10rem',
          height: '100vh',
        },
        overlay: {
          position: 'relative',
        },
      }}
    ></Sidebar>
  );
}
