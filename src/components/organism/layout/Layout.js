import React from "react";
import styled from "styled-components";
import HeaderComponent from "../header/HeaderComponent";
import FooterComponent from "../footer/FooterComponent";
import ContentComponent from "../content/ContentComponent";

const Layout = ({ Component }) => {
  return (
    <Wrapper>
      <HeaderComponent />
      <ContentComponent Page={Component} />
      {/* <FooterComponent /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default Layout;
