import React from "react";
import styled from "styled-components";

const Modal = () => {
  return (
    <>
      <Wrapper></Wrapper>
      <Content></Content>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: black;
  opacity: 0.5;
  z-index: 2000;
`;

const Content = styled.div`
  width: 60%;
  height: 90%;
  border: solid 1px gray;
  z-index: 2001;
  background-color: white;
  position: absolute;
  animation: animate 0.3s;
  left: 20%;
  top: 15px;
`;

export default Modal;
