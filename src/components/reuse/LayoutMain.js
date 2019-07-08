import React from "react";
import { PrimarySearchAppBar, Footer } from "..";

const LayoutMain = ({ children }) => {
  return (
    <>
      <PrimarySearchAppBar style={{ background: "#753689" }} />
      {children}
    </>
  );
};

export default LayoutMain;
