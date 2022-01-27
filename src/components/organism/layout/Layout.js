import React from "react";
import { FooterComponent, HeaderComponent } from "../";
import styled from "styled-components";

const Layout = ({ Component }) => {
  return (
    <Wrapper>
      <HeaderComponent />
      <Component />
      <FooterComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Layout;
