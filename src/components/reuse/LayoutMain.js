import React from 'react';
import { Header, Footer } from '..';

const LayoutMain = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayoutMain;
