import React from "react";
import { Header, Footer } from "..";

const LayoutMain = ({ children }) => {
  return (
    <>
      <PrimarySearchAppBar />
      {children}
      <Footer />
    </>
  );
};

export default LayoutMain;
