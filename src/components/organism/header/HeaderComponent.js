import React from "react";
import styled from "styled-components";
import { SeacrhMenu } from "../../moleculs";

const HeaderComponent = () => {
  return (
    <Wrapper>
      <Logo>WAblast</Logo>
      <SeacrhMenu />
      <div>Admin</div>
    </Wrapper>
  );
};

export default HeaderComponent;

const Wrapper = styled.div`
  width: 96%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-left: 2%;
  padding-right: 2%;
`;

const Logo = styled.h2`
  color: #101a32;
`;
