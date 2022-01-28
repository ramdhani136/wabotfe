import React from "react";
import styled from "styled-components";
import { SeacrhMenu } from "../../moleculs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const HeaderComponent = () => {
  return (
    <Wrapper>
      <Logo>WAblast</Logo>
      <SeacrhMenu />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "gray",
        }}
      >
        <a style={{ fontSize: "0.9em" }}>Administrator</a>
        <ArrowDropDownIcon style={{ fontSize: "20px", marginTop: "5px" }} />
      </div>
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
  border-bottom: 2px solid whitesmoke;
  padding-left: 2%;
  padding-right: 2%;
`;

const Logo = styled.h2`
  color: #101a32;
`;
