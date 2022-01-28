import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const SeacrhMenu = () => {
  return (
    <Wrapper>
      <Input />
      <SearchIcon style={{ color: "#ccc" }} />
    </Wrapper>
  );
};

export default SeacrhMenu;

const Wrapper = styled.div`
  display: flex;
  border: solid 1px #e5e7ef;
  align-items: center;
  width: 350px;
  height: 37px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 3px;
`;

const Input = styled.input`
  height: 30px;
  flex: 1;
  border: none;
  outline: none;
`;
