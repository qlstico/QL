import React from "react";
import { PrimarySearchAppBar, Footer } from "..";

const LayoutMain = ({ children }) => {
  return (
    <>
      <PrimarySearchAppBar />
      {children}
    </>
  );
};

export default LayoutMain;
